import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950 px-8 py-4 flex items-center justify-between sticky top-0 z-40 font-mono">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xs">
          API
        </div>
        <div>
          <h1 className="text-xs font-bold text-slate-100 tracking-wider uppercase">
            MOCKER // REST Endpoint Builder
          </h1>
          <p className="text-[10px] text-slate-400">
            REACT + TYPESCRIPT + VITE
          </p>
        </div>
      </div>
      <div className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl">
        Server: <strong>Simulated Mock Engine</strong>
      </div>
    </header>
  );
};
