export type NumberSystem = 'binary' | 'octal' | 'decimal' | 'hexadecimal';

export interface SystemMeta {
  id: NumberSystem;
  name: string;
  base: number;
  radixPrefix: string;
  allowedChars: string;
  example: string;
}

export interface ConversionResult {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
  bigIntValue: bigint;
}

export interface DivisionStep {
  dividend: string;
  divisor: number;
  quotient: string;
  remainder: string;
  hexChar?: string;
}

export interface SolutionDetails {
  fromSystem: NumberSystem;
  input: string;
  decimalValue: string;
  toDecimalSteps: string[];
  binarySteps: DivisionStep[];
  octalSteps: DivisionStep[];
  hexSteps: DivisionStep[];
  binaryGroupingHex?: string;
  binaryGroupingOctal?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  input: string;
  fromSystem: NumberSystem;
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
}

export type ThemeMode = 'light' | 'dark' | 'web';
