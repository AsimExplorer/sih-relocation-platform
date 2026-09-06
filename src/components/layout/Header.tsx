import React from 'react';
import { Shield, Sparkles, FileText, MapPin, AlertTriangle } from 'lucide-react';
import { RedZoneVersionData } from '../../types';

interface HeaderProps {
  currentRedZoneVersion: RedZoneVersionData;
  onToggleDemoMode: () => void;
  isDemoMode: boolean;
  onOpenReportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRedZoneVersion,
  onToggleDemoMode,
  isDemoMode,
  onOpenReportModal,
}) => {
  return (
    <header className="bg-gov-darkest border-b border-gov-border px-4 py-2.5 sticky top-0 z-50 shadow-lg">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-red-950/80 border border-red-700/80 flex items-center justify-center text-red-400 shadow-md">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">Government of Kerala | KSDMA</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-900/60 text-red-300 border border-red-700 font-mono">
                SIH 26191
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                Prototype / Demonstration Data
              </span>
            </div>
            <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Disaster Relocation Decision-Support Platform
              <span className="text-xs font-normal text-slate-400 hidden lg:inline">
                • Permanent Unsuitability & Sustainable Resettlement
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="bg-gov-surface px-3 py-1 rounded-md border border-gov-border flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-white">Wayanad District</span>
            <span className="text-[11px] text-slate-400">(Meppadi / Vythiri)</span>
          </div>

          <div className="bg-red-950/40 px-3 py-1 rounded-md border border-red-800/40 flex items-center gap-1.5 text-red-200">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="font-semibold">{currentRedZoneVersion.label.split(' ')[0]} {currentRedZoneVersion.label.split(' ')[1]}</span>
            <span className="text-[10px] text-slate-400">({currentRedZoneVersion.date})</span>
          </div>

          <button
            onClick={onToggleDemoMode}
            className={`px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm border ${
              isDemoMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400'
                : 'bg-blue-600/90 text-white border-blue-500 hover:bg-blue-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isDemoMode ? 'Exit 9-Step Tour' : 'Launch 9-Step Presentation Mode'}
          </button>

          <button
            onClick={onOpenReportModal}
            className="px-3 py-1.5 rounded-md bg-gov-card hover:bg-slate-700 text-slate-200 border border-slate-600 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            Export Relocation Brief
          </button>
        </div>
      </div>
    </header>
  );
};
