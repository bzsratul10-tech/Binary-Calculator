import React from 'react';
import { HistoryItem, NumberSystem } from '../types';
import { Trash2, History, RotateCcw } from 'lucide-react';

interface CalculationHistoryProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onRestoreItem: (input: string, system: NumberSystem) => void;
}

export const CalculationHistory: React.FC<CalculationHistoryProps> = ({
  history,
  onClearHistory,
  onRestoreItem,
}) => {
  return (
    <div
      id="calculation-history-section"
      className="w-full max-w-4xl rounded-2xl p-6 sm:p-8 transition-all duration-300 [body.theme-light_&]:bg-white [body.theme-light_&]:border [body.theme-light_&]:border-slate-200 [body.theme-light_&]:shadow-sm [body.theme-dark_&]:bg-zinc-900 [body.theme-dark_&]:border [body.theme-dark_&]:border-zinc-800 [body.theme-dark_&]:shadow-md [body.theme-web_&]:bg-zinc-950 [body.theme-web_&]:border [body.theme-web_&]:border-zinc-800"
    >
      <div className="flex items-center justify-between pb-4 border-b [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:border-zinc-800 [body.theme-web_&]:border-zinc-800">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 [body.theme-light_&]:text-slate-700 [body.theme-dark_&]:text-zinc-300 [body.theme-web_&]:text-red-400" />
          <h3 className="text-base sm:text-lg font-bold [body.theme-light_&]:text-slate-900 [body.theme-dark_&]:text-white [body.theme-web_&]:text-white">
            Calculation History
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full font-mono [body.theme-light_&]:bg-slate-100 [body.theme-light_&]:text-slate-600 [body.theme-dark_&]:bg-zinc-800 [body.theme-dark_&]:text-zinc-300 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:text-zinc-400">
            {history.length}
          </span>
        </div>

        <button
          id="btn-clear-history"
          type="button"
          onClick={onClearHistory}
          disabled={history.length === 0}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            history.length === 0
              ? 'opacity-40 cursor-not-allowed text-slate-400 dark:text-zinc-600 [body.theme-web_&]:text-zinc-600'
              : 'cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 [body.theme-web_&]:text-red-400 [body.theme-web_&]:hover:bg-red-950/60'
          }`}
          title={history.length === 0 ? 'No history to clear' : 'Clear all calculation history'}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      {history.length === 0 ? (
        <div className="py-8 text-center [body.theme-light_&]:text-slate-400 [body.theme-dark_&]:text-zinc-500 [body.theme-web_&]:text-zinc-500 text-sm">
          No calculations saved yet. Completed conversions will be saved here automatically.
        </div>
      ) : (
        <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-1">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl transition-all duration-200 [body.theme-light_&]:bg-slate-50 [body.theme-light_&]:border [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:bg-zinc-800/50 [body.theme-dark_&]:border [body.theme-dark_&]:border-zinc-700/60 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:border [body.theme-web_&]:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                {/* Input & From System */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-zinc-400">
                    Input:
                  </span>
                  <span className="font-mono text-sm font-bold px-2 py-0.5 rounded [body.theme-light_&]:bg-white [body.theme-light_&]:text-slate-900 [body.theme-dark_&]:bg-zinc-900 [body.theme-dark_&]:text-white [body.theme-web_&]:bg-zinc-950 [body.theme-web_&]:text-white border [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:border-zinc-700 [body.theme-web_&]:border-zinc-800">
                    "{item.input}"
                  </span>
                  <span className="text-xs font-semibold [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-zinc-400">
                    From:
                  </span>
                  <span className="text-xs font-semibold capitalize px-2 py-0.5 rounded [body.theme-light_&]:bg-blue-50 [body.theme-light_&]:text-blue-700 [body.theme-dark_&]:bg-blue-950/60 [body.theme-dark_&]:text-blue-300 [body.theme-web_&]:bg-red-950/60 [body.theme-web_&]:text-red-300">
                    {item.fromSystem}
                  </span>
                </div>

                {/* Values in 4 systems */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-1.5 rounded [body.theme-light_&]:bg-white [body.theme-dark_&]:bg-zinc-900 [body.theme-web_&]:bg-zinc-950 truncate">
                    <span className="text-[10px] block font-sans font-semibold text-blue-600 dark:text-blue-400 [body.theme-web_&]:text-red-400">
                      Binary:
                    </span>
                    <span className="font-bold [body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-white">
                      {item.binary}
                    </span>
                  </div>
                  <div className="p-1.5 rounded [body.theme-light_&]:bg-white [body.theme-dark_&]:bg-zinc-900 [body.theme-web_&]:bg-zinc-950 truncate">
                    <span className="text-[10px] block font-sans font-semibold text-emerald-600 dark:text-emerald-400 [body.theme-web_&]:text-red-400">
                      Octal:
                    </span>
                    <span className="font-bold [body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-white">
                      {item.octal}
                    </span>
                  </div>
                  <div className="p-1.5 rounded [body.theme-light_&]:bg-white [body.theme-dark_&]:bg-zinc-900 [body.theme-web_&]:bg-zinc-950 truncate">
                    <span className="text-[10px] block font-sans font-semibold text-amber-600 dark:text-amber-400 [body.theme-web_&]:text-red-400">
                      Decimal:
                    </span>
                    <span className="font-bold [body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-white">
                      {item.decimal}
                    </span>
                  </div>
                  <div className="p-1.5 rounded [body.theme-light_&]:bg-white [body.theme-dark_&]:bg-zinc-900 [body.theme-web_&]:bg-zinc-950 truncate">
                    <span className="text-[10px] block font-sans font-semibold text-purple-600 dark:text-purple-400 [body.theme-web_&]:text-red-400">
                      Hexadecimal:
                    </span>
                    <span className="font-bold [body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-white">
                      {item.hexadecimal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Load back button */}
              <button
                type="button"
                onClick={() => onRestoreItem(item.input, item.fromSystem)}
                className="self-end sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer [body.theme-light_&]:bg-white [body.theme-light_&]:border [body.theme-light_&]:border-slate-300 [body.theme-light_&]:hover:bg-slate-100 [body.theme-dark_&]:bg-zinc-700 [body.theme-dark_&]:hover:bg-zinc-600 [body.theme-dark_&]:text-white [body.theme-web_&]:bg-zinc-800 [body.theme-web_&]:hover:bg-zinc-700 [body.theme-web_&]:text-white shrink-0"
                title="Reload this calculation into the converter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
