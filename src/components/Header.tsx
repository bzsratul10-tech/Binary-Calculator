import React from 'react';
import { ThemeMode } from '../types';
import { Sun, Moon, Shield } from 'lucide-react';

interface HeaderProps {
  theme: ThemeMode;
  onThemeChange: (newTheme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onThemeChange }) => {
  return (
    <header id="main-header" className="w-full pt-8 pb-6 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80 [body.theme-web_&]:border-red-900/40">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 id="app-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight [body.theme-light_&]:text-slate-900 [body.theme-dark_&]:text-white [body.theme-web_&]:text-white">
                Number System Converter
              </h1>
              <span
                id="header-branding"
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full [body.theme-light_&]:bg-blue-100 [body.theme-light_&]:text-blue-700 [body.theme-dark_&]:bg-blue-950 [body.theme-dark_&]:text-blue-300 [body.theme-web_&]:bg-red-950 [body.theme-web_&]:text-red-300 [body.theme-web_&]:border [body.theme-web_&]:border-red-700/50"
              >
                Made by Ratul
              </span>
            </div>
            <p id="app-subtitle" className="text-sm font-medium mt-1 [body.theme-light_&]:text-slate-500 [body.theme-dark_&]:text-slate-400 [body.theme-web_&]:text-red-200/80 tracking-wide">
              Binary • Octal • Decimal • Hexadecimal
            </p>
          </div>
        </div>

        {/* Theme Switcher */}
        <div id="theme-selector-container" className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 [body.theme-web_&]:bg-zinc-900 [body.theme-web_&]:border [body.theme-web_&]:border-red-900/40 self-start sm:self-auto">
          <button
            id="theme-btn-light"
            type="button"
            onClick={() => onThemeChange('light')}
            aria-label="Switch to Light theme"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              theme === 'light'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </button>

          <button
            id="theme-btn-dark"
            type="button"
            onClick={() => onThemeChange('dark')}
            aria-label="Switch to Dark theme"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              theme === 'dark'
                ? 'bg-zinc-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>

          <button
            id="theme-btn-web"
            type="button"
            onClick={() => onThemeChange('web')}
            aria-label="Switch to Web Mode superhero theme"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              theme === 'web'
                ? 'bg-red-600 text-white shadow-md shadow-red-950'
                : 'text-slate-600 dark:text-slate-400 hover:text-red-400'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Web Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};
