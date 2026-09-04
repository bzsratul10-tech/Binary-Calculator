import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="main-footer"
      className="w-full py-8 mt-12 text-center border-t border-zinc-200/80 dark:border-zinc-800/80 [body.theme-web_&]:border-red-950/40"
    >
      <p className="text-sm font-semibold tracking-wide [body.theme-light_&]:text-slate-600 [body.theme-dark_&]:text-zinc-400 [body.theme-web_&]:text-red-400">
        Made by Ratul
      </p>
    </footer>
  );
};
