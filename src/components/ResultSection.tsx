import React, { useState } from 'react';
import { ConversionResult, NumberSystem } from '../types';
import { Copy, Check, BookOpen } from 'lucide-react';

interface ResultSectionProps {
  result: ConversionResult | null;
  activeSystem: NumberSystem;
  onShowSolution: () => void;
  isSolutionOpen: boolean;
}

interface CardConfig {
  id: string;
  systemKey: 'binary' | 'octal' | 'decimal' | 'hexadecimal';
  title: string;
  baseText: string;
  badge: string;
  accentClass: string;
}

const CARDS: CardConfig[] = [
  {
    id: 'card-binary',
    systemKey: 'binary',
    title: 'Binary',
    baseText: 'Base 2',
    badge: '2',
    accentClass: 'blue',
  },
  {
    id: 'card-octal',
    systemKey: 'octal',
    title: 'Octal',
    baseText: 'Base 8',
    badge: '8',
    accentClass: 'emerald',
  },
  {
    id: 'card-decimal',
    systemKey: 'decimal',
    title: 'Decimal',
    baseText: 'Base 10',
    badge: '10',
    accentClass: 'amber',
  },
  {
    id: 'card-hexadecimal',
    systemKey: 'hexadecimal',
    title: 'Hexadecimal',
    baseText: 'Base 16',
    badge: '16',
    accentClass: 'purple',
  },
];

export const ResultSection: React.FC<ResultSectionProps> = ({
  result,
  activeSystem,
  onShowSolution,
  isSolutionOpen,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!result) {
    return (
      <div
        id="result-placeholder"
        className="w-full max-w-4xl py-12 px-6 rounded-2xl text-center [body.theme-light_&]:bg-slate-50/70 [body.theme-light_&]:border-2 [body.theme-light_&]:border-dashed [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:bg-zinc-900/40 [body.theme-dark_&]:border-2 [body.theme-dark_&]:border-dashed [body.theme-dark_&]:border-zinc-800 [body.theme-web_&]:bg-zinc-950/50 [body.theme-web_&]:border-2 [body.theme-web_&]:border-dashed [body.theme-web_&]:border-red-900/30 transition-all duration-300"
      >
        <p className="text-base font-medium [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-red-300/80">
          Enter a number to begin
        </p>
      </div>
    );
  }

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    } catch {
      // Fallback for iframe clipboard restrictions
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedKey(key);
        setTimeout(() => {
          setCopiedKey(null);
        }, 2000);
      } catch {
        // failed silently
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div id="results-container" className="w-full max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold [body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-100 [body.theme-web_&]:text-white">
          Converted Results
        </h2>
        <button
          id="btn-show-solution"
          type="button"
          onClick={onShowSolution}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer [body.theme-light_&]:bg-blue-50 [body.theme-light_&]:text-blue-700 [body.theme-light_&]:hover:bg-blue-100 [body.theme-dark_&]:bg-blue-950/60 [body.theme-dark_&]:text-blue-300 [body.theme-dark_&]:hover:bg-blue-900/60 [body.theme-web_&]:bg-red-950/80 [body.theme-web_&]:text-red-300 [body.theme-web_&]:hover:bg-red-900/80 [body.theme-web_&]:border [body.theme-web_&]:border-red-600/50"
        >
          <BookOpen className="w-4 h-4" />
          <span>{isSolutionOpen ? 'Hide Solution' : 'Show Solution'}</span>
        </button>
      </div>

      {/* Four Result Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CARDS.map((card) => {
          const value = result[card.systemKey];
          const isSource = activeSystem === card.systemKey;
          const isCopied = copiedKey === card.systemKey;

          return (
            <div
              key={card.id}
              id={card.id}
              className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                isSource
                  ? '[body.theme-light_&]:bg-blue-50/40 [body.theme-light_&]:border-2 [body.theme-light_&]:border-blue-400 [body.theme-dark_&]:bg-zinc-800/80 [body.theme-dark_&]:border-2 [body.theme-dark_&]:border-blue-500/60 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:border-2 [body.theme-web_&]:border-red-500 [body.theme-web_&]:shadow-[0_4px_20px_rgba(220,38,38,0.2)]'
                  : '[body.theme-light_&]:bg-white [body.theme-light_&]:border [body.theme-light_&]:border-slate-200 [body.theme-light_&]:shadow-sm [body.theme-dark_&]:bg-zinc-900 [body.theme-dark_&]:border [body.theme-dark_&]:border-zinc-800 [body.theme-web_&]:bg-zinc-950 [body.theme-web_&]:border [body.theme-web_&]:border-zinc-800'
              }`}
            >
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold [body.theme-light_&]:text-slate-900 [body.theme-dark_&]:text-white [body.theme-web_&]:text-white">
                      {card.title}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold [body.theme-light_&]:bg-slate-100 [body.theme-light_&]:text-slate-600 [body.theme-dark_&]:bg-zinc-800 [body.theme-dark_&]:text-zinc-300 [body.theme-web_&]:bg-zinc-800 [body.theme-web_&]:text-red-300">
                      {card.baseText}
                    </span>
                  </div>
                  {isSource && (
                    <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider [body.theme-light_&]:text-blue-600 [body.theme-dark_&]:text-blue-400 [body.theme-web_&]:text-red-400">
                      Input System
                    </span>
                  )}
                </div>

                {/* Length badge */}
                <span className="text-[11px] font-mono [body.theme-light_&]:text-slate-400 [body.theme-dark_&]:text-zinc-500 [body.theme-web_&]:text-zinc-500">
                  {value.length} {card.systemKey === 'binary' ? 'bits' : 'chars'}
                </span>
              </div>

              {/* Value display */}
              <div className="my-3 p-3.5 rounded-xl [body.theme-light_&]:bg-slate-50 [body.theme-dark_&]:bg-zinc-800/60 [body.theme-web_&]:bg-zinc-900/90 border [body.theme-light_&]:border-slate-150 [body.theme-dark_&]:border-zinc-700/60 [body.theme-web_&]:border-zinc-800">
                <div
                  id={`result-val-${card.systemKey}`}
                  className="font-mono text-lg sm:text-xl font-bold break-all select-all [body.theme-light_&]:text-slate-900 [body.theme-dark_&]:text-white [body.theme-web_&]:text-red-100 tracking-wide"
                >
                  {value}
                </div>
              </div>

              {/* Card Footer: Copy button */}
              <div className="flex items-center justify-end mt-2 pt-1">
                <button
                  id={`btn-copy-${card.systemKey}`}
                  type="button"
                  onClick={() => handleCopy(card.systemKey, value)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : '[body.theme-light_&]:bg-slate-100 [body.theme-light_&]:hover:bg-slate-200 [body.theme-light_&]:text-slate-700 [body.theme-dark_&]:bg-zinc-800 [body.theme-dark_&]:hover:bg-zinc-700 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:hover:bg-zinc-800 [body.theme-web_&]:text-white [body.theme-web_&]:border [body.theme-web_&]:border-red-900/40'
                  }`}
                  aria-label={`Copy ${card.title} value`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
