import React, { useState } from 'react';
import { SolutionDetails } from '../types';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

interface StepByStepSectionProps {
  solution: SolutionDetails | null;
  isOpen: boolean;
}

export const StepByStepSection: React.FC<StepByStepSectionProps> = ({ solution, isOpen }) => {
  const [activeTab, setActiveTab] = useState<'binary' | 'octal' | 'hex' | 'decimal'>('binary');

  if (!isOpen || !solution) {
    return null;
  }

  return (
    <div
      id="step-by-step-solution"
      className="w-full max-w-4xl rounded-2xl p-6 sm:p-8 transition-all duration-300 [body.theme-light_&]:bg-white [body.theme-light_&]:border [body.theme-light_&]:border-slate-200 [body.theme-light_&]:shadow-md [body.theme-dark_&]:bg-zinc-900 [body.theme-dark_&]:border [body.theme-dark_&]:border-zinc-800 [body.theme-dark_&]:shadow-xl [body.theme-web_&]:bg-zinc-950 [body.theme-web_&]:border-2 [body.theme-web_&]:border-red-600/40 [body.theme-web_&]:shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b [body.theme-light_&]:border-slate-150 [body.theme-dark_&]:border-zinc-800 [body.theme-web_&]:border-red-900/40">
        <div>
          <h3 className="text-lg font-bold [body.theme-light_&]:text-slate-900 [body.theme-dark_&]:text-white [body.theme-web_&]:text-white">
            Step-by-Step Mathematical Solution
          </h3>
          <p className="text-xs sm:text-sm font-medium mt-0.5 [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-red-300/80">
            Educational breakdown using standard radix conversion and division algorithms.
          </p>
        </div>
      </div>

      {/* Part 1: Conversion to Decimal (if source is not Decimal) */}
      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-bold uppercase tracking-wider [body.theme-light_&]:text-blue-700 [body.theme-dark_&]:text-blue-400 [body.theme-web_&]:text-red-400 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4" />
          <span>Step 1: Input to Decimal (Base 10)</span>
        </h4>
        <div className="p-4 rounded-xl font-mono text-sm [body.theme-light_&]:bg-slate-50 [body.theme-dark_&]:bg-zinc-800/60 [body.theme-web_&]:bg-zinc-900 space-y-1.5 border [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:border-zinc-700/60 [body.theme-web_&]:border-zinc-800 [body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-white">
          {solution.toDecimalSteps.map((step, idx) => (
            <p key={idx} className="break-all">
              {step}
            </p>
          ))}
        </div>
      </div>

      {/* Part 2: Radix Division Tabs */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold uppercase tracking-wider [body.theme-light_&]:text-blue-700 [body.theme-dark_&]:text-blue-400 [body.theme-web_&]:text-red-400 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>Step 2: Decimal (Base 10) to Target Systems</span>
          </h4>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('binary')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'binary'
                ? '[body.theme-light_&]:bg-blue-600 text-white [body.theme-dark_&]:bg-blue-600 [body.theme-web_&]:bg-red-600'
                : '[body.theme-light_&]:bg-slate-100 [body.theme-light_&]:text-slate-700 [body.theme-dark_&]:bg-zinc-800 [body.theme-dark_&]:text-zinc-300 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:text-zinc-300'
            }`}
          >
            Decimal → Binary (÷ 2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('octal')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'octal'
                ? '[body.theme-light_&]:bg-blue-600 text-white [body.theme-dark_&]:bg-blue-600 [body.theme-web_&]:bg-red-600'
                : '[body.theme-light_&]:bg-slate-100 [body.theme-light_&]:text-slate-700 [body.theme-dark_&]:bg-zinc-800 [body.theme-dark_&]:text-zinc-300 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:text-zinc-300'
            }`}
          >
            Decimal → Octal (÷ 8)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hex')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'hex'
                ? '[body.theme-light_&]:bg-blue-600 text-white [body.theme-dark_&]:bg-blue-600 [body.theme-web_&]:bg-red-600'
                : '[body.theme-light_&]:bg-slate-100 [body.theme-light_&]:text-slate-700 [body.theme-dark_&]:bg-zinc-800 [body.theme-dark_&]:text-zinc-300 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:text-zinc-300'
            }`}
          >
            Decimal → Hexadecimal (÷ 16)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-5 rounded-xl [body.theme-light_&]:bg-slate-50 [body.theme-dark_&]:bg-zinc-800/60 [body.theme-web_&]:bg-zinc-900 border [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:border-zinc-700/60 [body.theme-web_&]:border-zinc-800">
          {activeTab === 'binary' && (
            <div className="space-y-3">
              <div className="text-xs font-semibold [body.theme-light_&]:text-slate-600 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-red-300">
                Method: Repeated division by 2. Record the remainders (0 or 1), then read remainders from bottom to top (LSB to MSB).
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:border-zinc-700 [body.theme-web_&]:border-zinc-800 [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-zinc-400">
                      <th className="py-2 pr-4 font-semibold">Division</th>
                      <th className="py-2 px-4 font-semibold">Quotient</th>
                      <th className="py-2 px-4 font-semibold">Remainder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y [body.theme-light_&]:divide-slate-200/60 [body.theme-dark_&]:divide-zinc-700/50 [body.theme-web_&]:divide-zinc-800">
                    {solution.binarySteps.map((step, idx) => (
                      <tr key={idx} className="[body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-white">
                        <td className="py-2 pr-4">{step.dividend} ÷ 2</td>
                        <td className="py-2 px-4">{step.quotient}</td>
                        <td className="py-2 px-4 font-bold text-blue-600 dark:text-blue-400 [body.theme-web_&]:text-red-400">
                          {step.remainder}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Equation breakdown */}
              <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-zinc-900/80 [body.theme-web_&]:bg-zinc-950 font-mono text-xs space-y-1 text-slate-700 dark:text-zinc-300 [body.theme-web_&]:text-zinc-200">
                {solution.binarySteps.map((step, idx) => (
                  <div key={idx}>
                    "{step.dividend} ÷ 2 = {step.quotient} remainder {step.remainder}"
                  </div>
                ))}
                <div className="pt-2 font-bold text-blue-700 dark:text-blue-300 [body.theme-web_&]:text-red-300">
                  Therefore: "{solution.decimalValue}₁₀ = {solution.targetValues.binary}₂"
                </div>
              </div>
            </div>
          )}

          {activeTab === 'octal' && (
            <div className="space-y-3">
              <div className="text-xs font-semibold [body.theme-light_&]:text-slate-600 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-red-300">
                Method: Repeated division by 8. Record the remainders (0 to 7), then read remainders from bottom to top.
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:border-zinc-700 [body.theme-web_&]:border-zinc-800 [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-zinc-400">
                      <th className="py-2 pr-4 font-semibold">Division</th>
                      <th className="py-2 px-4 font-semibold">Quotient</th>
                      <th className="py-2 px-4 font-semibold">Remainder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y [body.theme-light_&]:divide-slate-200/60 [body.theme-dark_&]:divide-zinc-700/50 [body.theme-web_&]:divide-zinc-800">
                    {solution.octalSteps.map((step, idx) => (
                      <tr key={idx} className="[body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-white">
                        <td className="py-2 pr-4">{step.dividend} ÷ 8</td>
                        <td className="py-2 px-4">{step.quotient}</td>
                        <td className="py-2 px-4 font-bold text-emerald-600 dark:text-emerald-400 [body.theme-web_&]:text-red-400">
                          {step.remainder}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Equation breakdown */}
              <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-zinc-900/80 [body.theme-web_&]:bg-zinc-950 font-mono text-xs space-y-1 text-slate-700 dark:text-zinc-300 [body.theme-web_&]:text-zinc-200">
                {solution.octalSteps.map((step, idx) => (
                  <div key={idx}>
                    "{step.dividend} ÷ 8 = {step.quotient} remainder {step.remainder}"
                  </div>
                ))}
                <div className="pt-2 font-bold text-emerald-700 dark:text-emerald-300 [body.theme-web_&]:text-red-300">
                  Therefore: "{solution.decimalValue}₁₀ = {solution.targetValues.octal}₈"
                </div>
              </div>
              {solution.binaryGroupingOctal && (
                <div className="mt-3 p-3 rounded-lg [body.theme-light_&]:bg-emerald-50/50 [body.theme-dark_&]:bg-zinc-900 [body.theme-web_&]:bg-zinc-950 text-xs font-mono">
                  <span className="font-semibold block mb-1 [body.theme-light_&]:text-emerald-800 [body.theme-dark_&]:text-emerald-400 [body.theme-web_&]:text-red-300">
                    Alternative Fast Method (3-Bit Grouping):
                  </span>
                  Group binary bits into triplets from right to left: {solution.binaryGroupingOctal}
                </div>
              )}
            </div>
          )}

          {activeTab === 'hex' && (
            <div className="space-y-3">
              <div className="text-xs font-semibold [body.theme-light_&]:text-slate-600 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-red-300">
                Method: Repeated division by 16. Remainders 10–15 are mapped to letters A–F (10=A, 11=B, 12=C, 13=D, 14=E, 15=F).
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b [body.theme-light_&]:border-slate-200 [body.theme-dark_&]:border-zinc-700 [body.theme-web_&]:border-zinc-800 [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-zinc-400">
                      <th className="py-2 pr-4 font-semibold">Division</th>
                      <th className="py-2 px-4 font-semibold">Quotient</th>
                      <th className="py-2 px-4 font-semibold">Remainder</th>
                      <th className="py-2 px-4 font-semibold">Hex Digit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y [body.theme-light_&]:divide-slate-200/60 [body.theme-dark_&]:divide-zinc-700/50 [body.theme-web_&]:divide-zinc-800">
                    {solution.hexSteps.map((step, idx) => (
                      <tr key={idx} className="[body.theme-light_&]:text-slate-800 [body.theme-dark_&]:text-zinc-200 [body.theme-web_&]:text-white">
                        <td className="py-2 pr-4">{step.dividend} ÷ 16</td>
                        <td className="py-2 px-4">{step.quotient}</td>
                        <td className="py-2 px-4">{step.remainder}</td>
                        <td className="py-2 px-4 font-bold text-purple-600 dark:text-purple-400 [body.theme-web_&]:text-red-400">
                          {step.hexChar}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Equation breakdown */}
              <div className="p-3 rounded-lg bg-purple-50/50 dark:bg-zinc-900/80 [body.theme-web_&]:bg-zinc-950 font-mono text-xs space-y-1 text-slate-700 dark:text-zinc-300 [body.theme-web_&]:text-zinc-200">
                {solution.hexSteps.map((step, idx) => (
                  <div key={idx}>
                    "{step.dividend} ÷ 16 = {step.quotient} remainder {step.remainder}{step.remainder !== step.hexChar ? ` (${step.hexChar})` : ''}"
                  </div>
                ))}
                <div className="pt-2 font-bold text-purple-700 dark:text-purple-300 [body.theme-web_&]:text-red-300">
                  Therefore: "{solution.decimalValue}₁₀ = {solution.targetValues.hexadecimal}₁₆"
                </div>
              </div>
              {solution.binaryGroupingHex && (
                <div className="mt-3 p-3 rounded-lg [body.theme-light_&]:bg-purple-50/50 [body.theme-dark_&]:bg-zinc-900 [body.theme-web_&]:bg-zinc-950 text-xs font-mono">
                  <span className="font-semibold block mb-1 [body.theme-light_&]:text-purple-800 [body.theme-dark_&]:text-purple-400 [body.theme-web_&]:text-red-300">
                    Alternative Fast Method (4-Bit Nibble Grouping):
                  </span>
                  Group binary bits into nibbles (4 bits) from right to left: {solution.binaryGroupingHex}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
