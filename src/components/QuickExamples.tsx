import React from 'react';
import { NumberSystem } from '../types';

interface ExampleItem {
  id: string;
  label: string;
  system: NumberSystem;
  systemLabel: string;
  value: string;
}

interface QuickExamplesProps {
  onSelectExample: (value: string, system: NumberSystem) => void;
}

const EXAMPLES: ExampleItem[] = [
  {
    id: 'example-1',
    label: 'Example 1',
    system: 'decimal',
    systemLabel: 'Decimal',
    value: '10',
  },
  {
    id: 'example-2',
    label: 'Example 2',
    system: 'decimal',
    systemLabel: 'Decimal',
    value: '25',
  },
  {
    id: 'example-3',
    label: 'Example 3',
    system: 'binary',
    systemLabel: 'Binary',
    value: '1010',
  },
  {
    id: 'example-4',
    label: 'Example 4',
    system: 'octal',
    systemLabel: 'Octal',
    value: '17',
  },
  {
    id: 'example-5',
    label: 'Example 5',
    system: 'hexadecimal',
    systemLabel: 'Hexadecimal',
    value: 'FF',
  },
];

export const QuickExamples: React.FC<QuickExamplesProps> = ({ onSelectExample }) => {
  return (
    <div id="quick-examples-section" className="w-full max-w-4xl space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold [body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-100 [body.theme-web_&]:text-white">
          Quick Examples
        </h3>
        <span className="text-xs [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-zinc-400">
          Click any example to load & convert instantly
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {EXAMPLES.map((item) => (
          <button
            key={item.id}
            id={item.id}
            type="button"
            onClick={() => onSelectExample(item.value, item.system)}
            className="flex flex-col items-start p-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer [body.theme-light_&]:bg-white [body.theme-light_&]:border [body.theme-light_&]:border-slate-200 [body.theme-light_&]:hover:border-blue-500 [body.theme-light_&]:hover:shadow-sm [body.theme-dark_&]:bg-zinc-900 [body.theme-dark_&]:border [body.theme-dark_&]:border-zinc-800 [body.theme-dark_&]:hover:border-blue-500/80 [body.theme-web_&]:bg-zinc-950 [body.theme-web_&]:border [body.theme-web_&]:border-zinc-800 [body.theme-web_&]:hover:border-red-500 group"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-semibold [body.theme-light_&]:text-slate-400 [body.theme-dark_&]:text-zinc-500 [body.theme-web_&]:text-zinc-500">
                {item.label}
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded [body.theme-light_&]:bg-slate-100 [body.theme-light_&]:text-slate-600 [body.theme-dark_&]:bg-zinc-800 [body.theme-dark_&]:text-zinc-300 [body.theme-web_&]:bg-red-950/80 [body.theme-web_&]:text-red-300">
                {item.systemLabel}
              </span>
            </div>
            <div className="mt-2 font-mono text-base font-bold [body.theme-light_&]:text-slate-900 [body.theme-dark_&]:text-white [body.theme-web_&]:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 [body.theme-web_&]:group-hover:text-red-400 transition-colors">
              "{item.value}"
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
