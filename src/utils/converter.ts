import {
  NumberSystem,
  SystemMeta,
  ConversionResult,
  DivisionStep,
  SolutionDetails,
} from '../types';

export const NUMBER_SYSTEMS: SystemMeta[] = [
  {
    id: 'binary',
    name: 'Binary (Base 2)',
    base: 2,
    radixPrefix: '0b',
    allowedChars: '0, 1',
    example: '1010',
  },
  {
    id: 'octal',
    name: 'Octal (Base 8)',
    base: 8,
    radixPrefix: '0o',
    allowedChars: '0–7',
    example: '12',
  },
  {
    id: 'decimal',
    name: 'Decimal (Base 10)',
    base: 10,
    radixPrefix: '',
    allowedChars: '0–9',
    example: '10',
  },
  {
    id: 'hexadecimal',
    name: 'Hexadecimal (Base 16)',
    base: 16,
    radixPrefix: '0x',
    allowedChars: '0–9, A–F',
    example: 'A',
  },
];

export interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
  sanitized: string;
}

export function validateInput(rawInput: string, system: NumberSystem): ValidationResult {
  const sanitized = rawInput.trim();

  if (!sanitized) {
    return {
      isValid: false,
      errorMessage: 'Please enter a number to begin conversion.',
      sanitized: '',
    };
  }

  // Check for negative numbers if entered
  if (sanitized.startsWith('-')) {
    return {
      isValid: false,
      errorMessage: 'Please enter an unsigned positive integer or 0.',
      sanitized,
    };
  }

  switch (system) {
    case 'binary': {
      const binaryRegex = /^[01]+$/;
      if (!binaryRegex.test(sanitized)) {
        return {
          isValid: false,
          errorMessage: 'Invalid Binary number. Binary numbers can contain only 0 and 1.',
          sanitized,
        };
      }
      break;
    }
    case 'octal': {
      const octalRegex = /^[0-7]+$/;
      if (!octalRegex.test(sanitized)) {
        return {
          isValid: false,
          errorMessage: 'Invalid Octal number. Octal numbers can contain only digits 0–7.',
          sanitized,
        };
      }
      break;
    }
    case 'decimal': {
      const decimalRegex = /^[0-9]+$/;
      if (!decimalRegex.test(sanitized)) {
        return {
          isValid: false,
          errorMessage: 'Invalid Decimal number. Please enter a valid decimal integer.',
          sanitized,
        };
      }
      break;
    }
    case 'hexadecimal': {
      const hexRegex = /^[0-9a-fA-F]+$/;
      if (!hexRegex.test(sanitized)) {
        return {
          isValid: false,
          errorMessage: 'Invalid Hexadecimal number. Use digits 0–9 and letters A–F.',
          sanitized,
        };
      }
      break;
    }
  }

  return {
    isValid: true,
    errorMessage: null,
    sanitized,
  };
}

export function parseToBigInt(cleanInput: string, system: NumberSystem): bigint {
  switch (system) {
    case 'binary':
      return BigInt('0b' + cleanInput);
    case 'octal':
      return BigInt('0o' + cleanInput);
    case 'decimal':
      return BigInt(cleanInput);
    case 'hexadecimal':
      return BigInt('0x' + cleanInput);
  }
}

export function convertNumber(cleanInput: string, system: NumberSystem): ConversionResult {
  const bigIntValue = parseToBigInt(cleanInput, system);

  return {
    binary: bigIntValue.toString(2),
    octal: bigIntValue.toString(8),
    decimal: bigIntValue.toString(10),
    hexadecimal: bigIntValue.toString(16).toUpperCase(),
    bigIntValue,
  };
}

function calculateDivisionSteps(value: bigint, radix: number): DivisionStep[] {
  if (value === 0n) {
    return [
      {
        dividend: '0',
        divisor: radix,
        quotient: '0',
        remainder: '0',
        hexChar: radix === 16 ? '0' : undefined,
      },
    ];
  }

  const steps: DivisionStep[] = [];
  let current = value;
  const radixBig = BigInt(radix);
  const maxSteps = 40; // cap to prevent visual freeze on astronomical numbers

  while (current > 0n && steps.length < maxSteps) {
    const quotient = current / radixBig;
    const remainderBig = current % radixBig;
    const remainderNum = Number(remainderBig);
    const hexChar = radix === 16 ? remainderNum.toString(16).toUpperCase() : undefined;

    steps.push({
      dividend: current.toString(10),
      divisor: radix,
      quotient: quotient.toString(10),
      remainder: remainderNum.toString(10),
      hexChar,
    });

    current = quotient;
  }

  return steps;
}

export function generateSolution(
  cleanInput: string,
  fromSystem: NumberSystem,
  result: ConversionResult
): SolutionDetails {
  const decimalVal = result.bigIntValue;

  // Step 1: Polynomial expansion to Decimal (if not already decimal)
  const toDecimalSteps: string[] = [];

  if (fromSystem === 'decimal') {
    toDecimalSteps.push(`The input is already in Decimal (Base 10): ${cleanInput}`);
  } else {
    const base = fromSystem === 'binary' ? 2 : fromSystem === 'octal' ? 8 : 16;
    const digits = cleanInput.toUpperCase().split('');
    const len = digits.length;

    // Polynomial formula representation
    const expansionParts: string[] = [];
    const evaluatedParts: string[] = [];

    digits.forEach((char, index) => {
      const power = len - 1 - index;
      const digitValue = parseInt(char, base);
      expansionParts.push(`(${char} × ${base}^${power})`);
      const termValue = BigInt(digitValue) * (BigInt(base) ** BigInt(power));
      evaluatedParts.push(termValue.toString(10));
    });

    if (len <= 8) {
      toDecimalSteps.push(
        `Expand using positional notation (powers of ${base}):`
      );
      toDecimalSteps.push(expansionParts.join(' + '));
      toDecimalSteps.push(
        `= ${evaluatedParts.join(' + ')}`
      );
    } else {
      toDecimalSteps.push(
        `Expand using positional notation (powers of ${base}): (${digits[0]} × ${base}^${len - 1}) + ... + (${digits[len - 1]} × ${base}^0)`
      );
    }
    toDecimalSteps.push(`= ${decimalVal.toString(10)} (Decimal)`);
  }

  // Step 2: Division steps for Decimal -> Binary, Octal, Hexadecimal
  const binarySteps = calculateDivisionSteps(decimalVal, 2);
  const octalSteps = calculateDivisionSteps(decimalVal, 8);
  const hexSteps = calculateDivisionSteps(decimalVal, 16);

  // Grouping representations
  // Binary to Hex: 4-bit nibbles
  const binStr = result.binary;
  const paddedHexBin = binStr.padStart(Math.ceil(binStr.length / 4) * 4 || 4, '0');
  const hexGroups = paddedHexBin.match(/.{1,4}/g) || [];
  const binaryGroupingHex = hexGroups.join(' ');

  // Binary to Octal: 3-bit triplets
  const paddedOctBin = binStr.padStart(Math.ceil(binStr.length / 3) * 3 || 3, '0');
  const octGroups = paddedOctBin.match(/.{1,3}/g) || [];
  const binaryGroupingOctal = octGroups.join(' ');

  return {
    fromSystem,
    input: cleanInput,
    decimalValue: result.decimal,
    toDecimalSteps,
    binarySteps,
    octalSteps,
    hexSteps,
    binaryGroupingHex,
    binaryGroupingOctal,
  };
}

export function formatNumberWithSpaces(str: string, groupSize: number): string {
  if (str.length <= groupSize) return str;
  const reversed = str.split('').reverse();
  const chunks: string[] = [];
  for (let i = 0; i < reversed.length; i += groupSize) {
    chunks.push(reversed.slice(i, i + groupSize).reverse().join(''));
  }
  return chunks.reverse().join(' ');
}
