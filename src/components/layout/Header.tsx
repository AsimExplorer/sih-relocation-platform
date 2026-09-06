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
    <header className="bg-white border-b border-slate-200 px-4 py-2.5 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Authority branding */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-sm shrink-0">
            <Shield className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
                Delhi Disaster Management Authority (DDMA)
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 font-mono font-semibold">
                SIH 26191
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                Prototype Demonstration Data
              </span>
            </div>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Disaster Relocation Decision-Support Platform
              <span className="text-xs font-normal text-slate-500 hidden lg:inline">
                • Government of NCT of Delhi (East Delhi & USAR Sector)
              </span>
            </h1>
          </div>
        </div>

        {/* District & Reassessment context */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 flex items-center gap-1.5 text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold text-slate-900">East Delhi District</span>
            <span className="text-[11px] text-slate-500">(Surajmal Vihar / USAR Hub)</span>
          </div>

          <div className="bg-red-50 px-3 py-1.5 rounded-md border border-red-200 flex items-center gap-1.5 text-red-900">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span className="font-bold">{currentRedZoneVersion.label.split(' ')[0]} {currentRedZoneVersion.label.split(' ')[1]}</span>
            <span className="text-[11px] text-red-700 font-medium">({currentRedZoneVersion.date})</span>
          </div>

          {/* Action CTAs */}
          <button
            onClick={onToggleDemoMode}
            className={`px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1.5 transition-all border shadow-sm ${
              isDemoMode
                ? 'bg-amber-500 text-slate-950 border-amber-600 hover:bg-amber-400'
                : 'bg-blue-700 text-white border-blue-800 hover:bg-blue-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isDemoMode ? 'Exit 9-Step Tour' : 'Launch 9-Step Presentation Mode'}
          </button>

          <button
            onClick={onOpenReportModal}
            className="px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            Export DDMA Brief
          </button>
        </div>
      </div>
    </header>
  );
};
