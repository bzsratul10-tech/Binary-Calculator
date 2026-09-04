import React from 'react';
import { BookOpen } from 'lucide-react';

interface SystemInfoItem {
  id: string;
  name: string;
  base: string;
  digits: string;
  description: string;
  useCase: string;
}

const SYSTEMS_INFO: SystemInfoItem[] = [
  {
    id: 'info-binary',
    name: 'Binary',
    base: 'Base 2',
    digits: '0, 1',
    description: 'The fundamental language of computers, representing logic levels (high/low or on/off).',
    useCase: 'Transistors, CPU machine code, and digital logic circuits.',
  },
  {
    id: 'info-octal',
    name: 'Octal',
    base: 'Base 8',
    digits: '0–7',
    description: 'Groups 3 binary bits into a single digit (2³ = 8), offering a compact shorthand.',
    useCase: 'Unix file permissions (e.g. chmod 755) and legacy computing displays.',
  },
  {
    id: 'info-decimal',
    name: 'Decimal',
    base: 'Base 10',
    digits: '0–9',
    description: 'The standard positional numeral system used universally in human everyday arithmetic.',
    useCase: 'Everyday counting, scientific measurement, commerce, and human calculation.',
  },
  {
    id: 'info-hexadecimal',
    name: 'Hexadecimal',
    base: 'Base 16',
    digits: '0–9, A–F',
    description: 'Groups 4 binary bits into a single character (2⁴ = 16), where A=10, B=11, C=12, D=13, E=14, F=15.',
    useCase: 'Memory addresses, RGB color codes (#FFFFFF), MAC addresses, and byte inspection.',
  },
];

export const NumberSystemInfo: React.FC = () => {
  return (
    <div
      id="number-systems-info-section"
      className="w-full max-w-4xl rounded-2xl p-6 sm:p-8 transition-all duration-300 [body.theme-light_&]:bg-white [body.theme-light_&]:border [body.theme-light_&]:border-slate-200 [body.theme-light_&]:shadow-sm [body.theme-dark_&]:bg-zinc-900 [body.theme-dark_&]:border [body.theme-dark_&]:border-zinc-800 [body.theme-dark_&]:shadow-md [body.theme-web_&]:bg-zinc-950 [body.theme-web_&]:border [body.theme-web_&]:border-zinc-800"
    >
      <div className="flex items-center gap-2 pb-4 border-b [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:border-zinc-800 [body.theme-web_&]:border-zinc-800">
        <BookOpen className="w-5 h-5 [body.theme-light_&]:text-blue-600 [body.theme-dark_&]:text-blue-400 [body.theme-web_&]:text-red-400" />
        <h3 className="text-base sm:text-lg font-bold [body.theme-light_&]:text-slate-900 [body.theme-dark_&]:text-white [body.theme-web_&]:text-white">
          Number Systems Overview
        </h3>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SYSTEMS_INFO.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="p-4 sm:p-5 rounded-xl transition-all duration-200 [body.theme-light_&]:bg-slate-50 [body.theme-light_&]:border [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:bg-zinc-850 [body.theme-dark_&]:border [body.theme-dark_&]:border-zinc-750 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:border [body.theme-web_&]:border-zinc-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-base font-bold [body.theme-light_&]:text-slate-900 [body.theme-dark_&]:text-white [body.theme-web_&]:text-white">
                  {item.name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold [body.theme-light_&]:bg-blue-100 [body.theme-light_&]:text-blue-700 [body.theme-dark_&]:bg-blue-950 [body.theme-dark_&]:text-blue-300 [body.theme-web_&]:bg-red-950/80 [body.theme-web_&]:text-red-300">
                  {item.base}
                </span>
              </div>

              <div className="text-xs font-mono mb-2.5 [body.theme-light_&]:text-slate-600 [body.theme-dark_&]:text-zinc-300 [body.theme-web_&]:text-zinc-300 font-semibold">
                Digits: <span className="text-blue-600 dark:text-blue-400 [body.theme-web_&]:text-red-400">{item.digits}</span>
              </div>

              <p className="text-xs sm:text-sm [body.theme-light_&]:text-slate-600 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-zinc-400 leading-relaxed mb-3">
                {item.description}
              </p>
            </div>

            <div className="pt-2 border-t [body.theme-light_&]:border-slate-200/60 [body.theme-dark_&]:border-zinc-700/60 [body.theme-web_&]:border-zinc-800 text-[11px] [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-500 [body.theme-web_&]:text-zinc-400">
              <span className="font-semibold">Used in:</span> {item.useCase}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
