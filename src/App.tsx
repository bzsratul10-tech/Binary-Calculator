import React, { useState, useEffect, useCallback } from 'react';
import { NumberSystem, ConversionResult, SolutionDetails, HistoryItem, ThemeMode } from './types';
import { validateInput, convertNumber, generateSolution } from './utils/converter';
import { Header } from './components/Header';
import { ConverterCard } from './components/ConverterCard';
import { ResultSection } from './components/ResultSection';
import { StepByStepSection } from './components/StepByStepSection';
import { QuickExamples } from './components/QuickExamples';
import { CalculationHistory } from './components/CalculationHistory';
import { NumberSystemInfo } from './components/NumberSystemInfo';
import { Footer } from './components/Footer';

const THEME_STORAGE_KEY = 'nsc_theme_preference';
const HISTORY_STORAGE_KEY = 'nsc_calculation_history';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'web') {
      return saved;
    }
    return 'light';
  });

  const [input, setInput] = useState<string>('');
  const [system, setSystem] = useState<NumberSystem>('decimal');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [solution, setSolution] = useState<SolutionDetails | null>(null);
  const [isSolutionOpen, setIsSolutionOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Apply theme classes to document body and html root
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    body.classList.remove('theme-light', 'theme-dark', 'theme-web', 'theme-web-bg', 'dark');
    html.classList.remove('theme-light', 'theme-dark', 'theme-web', 'dark');

    if (theme === 'web') {
      body.classList.add('theme-web', 'theme-web-bg', 'dark');
      html.classList.add('theme-web', 'dark');
    } else if (theme === 'dark') {
      body.classList.add('theme-dark', 'dark');
      html.classList.add('theme-dark', 'dark');
    } else {
      body.classList.add('theme-light');
      html.classList.add('theme-light');
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Persist history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Ignore quota errors
    }
  }, [history]);

  // Real conversion routine
  const executeConversion = useCallback(
    (inputValue: string, inputSystem: NumberSystem) => {
      const validation = validateInput(inputValue, inputSystem);

      if (!validation.isValid) {
        setErrorMessage(validation.errorMessage);
        setIsValid(false);
        setResult(null);
        setSolution(null);
        return false;
      }

      try {
        setErrorMessage(null);
        setIsValid(true);
        const conversionResult = convertNumber(validation.sanitized, inputSystem);
        setResult(conversionResult);

        const solutionDetails = generateSolution(
          validation.sanitized,
          inputSystem,
          conversionResult
        );
        setSolution(solutionDetails);

        // Save to History (prepend, avoid exact duplicate at top, limit to 40 items)
        setHistory((prev) => {
          const isDuplicate =
            prev.length > 0 &&
            prev[0].input === validation.sanitized &&
            prev[0].fromSystem === inputSystem;

          if (isDuplicate) return prev;

          const newItem: HistoryItem = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
            timestamp: Date.now(),
            input: validation.sanitized,
            fromSystem: inputSystem,
            binary: conversionResult.binary,
            octal: conversionResult.octal,
            decimal: conversionResult.decimal,
            hexadecimal: conversionResult.hexadecimal,
          };

          return [newItem, ...prev.slice(0, 39)];
        });

        return true;
      } catch (err) {
        setErrorMessage(
          'Calculation error. Please ensure the number is within supported range.'
        );
        setIsValid(false);
        setResult(null);
        setSolution(null);
        return false;
      }
    },
    []
  );

  const handleInputChange = (val: string) => {
    setInput(val);
    if (result) {
      setResult(null);
      setSolution(null);
    }
    if (!val.trim()) {
      setErrorMessage(null);
      setIsValid(null);
      return;
    }
    const v = validateInput(val, system);
    if (!v.isValid) {
      setErrorMessage(v.errorMessage);
      setIsValid(false);
    } else {
      setErrorMessage(null);
      setIsValid(true);
    }
  };

  const handleSystemChange = (sys: NumberSystem) => {
    setSystem(sys);
    if (result) {
      setResult(null);
      setSolution(null);
    }
    if (!input.trim()) {
      setErrorMessage(null);
      setIsValid(null);
      return;
    }
    const v = validateInput(input, sys);
    if (!v.isValid) {
      setErrorMessage(v.errorMessage);
      setIsValid(false);
    } else {
      setErrorMessage(null);
      setIsValid(true);
    }
  };

  const handleConvert = () => {
    executeConversion(input, system);
  };

  const handleClear = () => {
    setInput('');
    setSystem('decimal');
    setResult(null);
    setSolution(null);
    setErrorMessage(null);
    setIsValid(null);
    setIsSolutionOpen(false);
  };

  const handleSelectExample = (val: string, sys: NumberSystem) => {
    setInput(val);
    setSystem(sys);
    executeConversion(val, sys);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestoreItem = (inp: string, sys: NumberSystem) => {
    setInput(inp);
    setSystem(sys);
    executeConversion(inp, sys);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-blue-500 selection:text-white [body.theme-web_&]:selection:bg-red-600">
      <div className="flex-1 flex flex-col items-center">
        {/* Header with Title, Subtitle, Branding, and Theme Toggle */}
        <Header theme={theme} onThemeChange={setTheme} />

        {/* Main Content Area */}
        <main className="w-full max-w-4xl px-4 sm:px-6 py-6 space-y-8 flex flex-col items-center">
          {/* Main Converter Card */}
          <ConverterCard
            input={input}
            setInput={handleInputChange}
            system={system}
            setSystem={handleSystemChange}
            onConvert={handleConvert}
            onClear={handleClear}
            errorMessage={errorMessage}
            isValid={isValid}
          />

          {/* Result Section (4 Result Cards with Copy buttons) */}
          <ResultSection
            result={result}
            activeSystem={system}
            onShowSolution={() => setIsSolutionOpen((prev) => !prev)}
            isSolutionOpen={isSolutionOpen}
          />

          {/* Educational Step-by-Step Solution Breakdown */}
          <StepByStepSection solution={solution} isOpen={isSolutionOpen} />

          {/* Quick Clickable Examples */}
          <QuickExamples onSelectExample={handleSelectExample} />

          {/* Calculation History with LocalStorage Persistence */}
          <CalculationHistory
            history={history}
            onClearHistory={handleClearHistory}
            onRestoreItem={handleRestoreItem}
          />

          {/* Number System Information (Educational Section) */}
          <NumberSystemInfo />
        </main>
      </div>

      {/* Footer with exact required branding: "Made by Ratul" */}
      <Footer />
    </div>
  );
}
