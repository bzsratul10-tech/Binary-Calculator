import React from 'react';
import { NumberSystem } from '../types';
import { NUMBER_SYSTEMS } from '../utils/converter';
import { ArrowRight, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ConverterCardProps {
  input: string;
  setInput: (value: string) => void;
  system: NumberSystem;
  setSystem: (system: NumberSystem) => void;
  onConvert: () => void;
  onClear: () => void;
  errorMessage: string | null;
  isValid: boolean | null;
}

export const ConverterCard: React.FC<ConverterCardProps> = ({
  input,
  setInput,
  system,
  setSystem,
  onConvert,
  onClear,
  errorMessage,
  isValid,
}) => {
  const currentSystemMeta = NUMBER_SYSTEMS.find((s) => s.id === system) || NUMBER_SYSTEMS[2];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onConvert();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClear();
    }
  };

  return (
    <div
      id="main-converter-card"
      className="w-full max-w-4xl rounded-2xl p-6 sm:p-8 transition-all duration-300 [body.theme-light_&]:bg-white [body.theme-light_&]:border [body.theme-light_&]:border-slate-200 [body.theme-light_&]:shadow-lg [body.theme-dark_&]:bg-zinc-900 [body.theme-dark_&]:border [body.theme-dark_&]:border-zinc-800 [body.theme-dark_&]:shadow-xl [body.theme-web_&]:bg-zinc-950 [body.theme-web_&]:border-2 [body.theme-web_&]:border-red-600/40 [body.theme-web_&]:shadow-[0_8px_30px_rgb(220,38,38,0.12)]"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConvert();
        }}
        className="space-y-6"
      >
        {/* Input Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="number-input"
              className="block text-sm font-semibold tracking-wide [body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-zinc-100"
            >
              Enter Number
            </label>
            <span
              id="allowed-chars-hint"
              className="text-xs [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-red-400/90 font-medium"
            >
              Allowed: <span className="font-mono">{currentSystemMeta.allowedChars}</span>
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              id="number-input"
              type="text"
              autoComplete="off"
              spellCheck="false"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a number..."
              className={`w-full px-4 py-3.5 sm:py-4 rounded-xl font-mono text-lg sm:text-xl transition-all duration-200 outline-none ${
                errorMessage
                  ? 'border-2 border-red-500 [body.theme-light_&]:bg-red-50/50 [body.theme-dark_&]:bg-red-950/20 [body.theme-web_&]:bg-red-950/30 text-red-600 dark:text-red-300'
                  : isValid
                  ? 'border-2 border-emerald-500/80 [body.theme-light_&]:bg-emerald-50/20 [body.theme-dark_&]:bg-zinc-800/80 [body.theme-web_&]:bg-zinc-900 text-slate-900 dark:text-white'
                  : '[body.theme-light_&]:bg-slate-50 [body.theme-light_&]:border-slate-300 [body.theme-light_&]:text-slate-900 [body.theme-light_&]:focus:border-blue-600 [body.theme-light_&]:focus:bg-white [body.theme-dark_&]:bg-zinc-800/60 [body.theme-dark_&]:border-zinc-700 [body.theme-dark_&]:text-white [body.theme-dark_&]:focus:border-blue-500 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:border-zinc-800 [body.theme-web_&]:text-white [body.theme-web_&]:focus:border-red-500 border'
              }`}
            />
            {input && (
              <button
                type="button"
                onClick={() => setInput('')}
                className="absolute right-3.5 text-xs px-2 py-1 rounded font-medium [body.theme-light_&]:text-slate-400 [body.theme-light_&]:hover:text-slate-700 [body.theme-dark_&]:text-zinc-500 [body.theme-dark_&]:hover:text-zinc-300 [body.theme-web_&]:text-red-400 [body.theme-web_&]:hover:text-white cursor-pointer"
                title="Clear input text"
              >
                Clear text
              </button>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              id="validation-error"
              role="alert"
              className="flex items-start gap-2 p-3 rounded-lg text-xs sm:text-sm font-medium [body.theme-light_&]:bg-red-50 [body.theme-light_&]:text-red-700 [body.theme-light_&]:border [body.theme-light_&]:border-red-200 [body.theme-dark_&]:bg-red-950/40 [body.theme-dark_&]:text-red-300 [body.theme-dark_&]:border [body.theme-dark_&]:border-red-800/60 [body.theme-web_&]:bg-red-950/60 [body.theme-web_&]:text-red-200 [body.theme-web_&]:border [body.theme-web_&]:border-red-600"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!errorMessage && isValid && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 [body.theme-web_&]:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Valid {currentSystemMeta.name.split(' ')[0]} number</span>
            </div>
          )}
        </div>

        {/* Dropdown Selector Section */}
        <div className="space-y-2">
          <label
            htmlFor="system-select"
            className="block text-sm font-semibold tracking-wide [body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-zinc-100"
          >
            Select Number System
          </label>
          <div className="relative">
            <select
              id="system-select"
              value={system}
              onChange={(e) => setSystem(e.target.value as NumberSystem)}
              className="w-full px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 outline-none cursor-pointer [body.theme-light_&]:bg-slate-50 [body.theme-light_&]:border-slate-300 [body.theme-light_&]:text-slate-900 [body.theme-light_&]:focus:border-blue-600 [body.theme-dark_&]:bg-zinc-800/60 [body.theme-dark_&]:border-zinc-700 [body.theme-dark_&]:text-white [body.theme-dark_&]:focus:border-blue-500 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:border-zinc-800 [body.theme-web_&]:text-white [body.theme-web_&]:focus:border-red-500 border appearance-none"
            >
              {NUMBER_SYSTEMS.map((sys) => (
                <option
                  key={sys.id}
                  value={sys.id}
                  className="[body.theme-dark_&]:bg-zinc-900 [body.theme-web_&]:bg-zinc-900 py-2"
                >
                  {sys.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-red-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button
            id="btn-convert"
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 cursor-pointer shadow-md [body.theme-light_&]:bg-blue-600 [body.theme-light_&]:hover:bg-blue-700 [body.theme-dark_&]:bg-blue-600 [body.theme-dark_&]:hover:bg-blue-500 [body.theme-web_&]:bg-red-600 [body.theme-web_&]:hover:bg-red-500 [body.theme-web_&]:shadow-red-950 active:scale-[0.99]"
          >
            <span>Convert</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-clear"
            type="button"
            onClick={onClear}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer [body.theme-light_&]:bg-slate-100 [body.theme-light_&]:hover:bg-slate-200 [body.theme-light_&]:text-slate-700 [body.theme-dark_&]:bg-zinc-800 [body.theme-dark_&]:hover:bg-zinc-700 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:hover:bg-zinc-800 [body.theme-web_&]:text-white [body.theme-web_&]:border [body.theme-web_&]:border-zinc-800 active:scale-[0.99]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </form>
    </div>
  );
};
