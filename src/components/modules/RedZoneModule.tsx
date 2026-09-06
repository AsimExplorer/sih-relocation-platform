import React from 'react';
import { Ban, AlertOctagon, History, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { RedZoneVersionData } from '../../types';
import { RED_ZONE_VERSIONS } from '../../data/wayanadData';

interface RedZoneModuleProps {
  currentVersion: RedZoneVersionData;
  onSelectVersion: (version: 'v1.0-2025' | 'v2.0-2026') => void;
}

export const RedZoneModule: React.FC<RedZoneModuleProps> = ({
  currentVersion,
  onSelectVersion,
}) => {
  const v1 = RED_ZONE_VERSIONS['v1.0-2025'];
  const v2 = RED_ZONE_VERSIONS['v2.0-2026'];
  const isV2 = currentVersion.version === 'v2.0-2026';

  return (
    <div className="space-y-4">
      {/* Executive Statutory Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/60 via-slate-900 to-red-950/60 border border-red-800/80 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-1">
                <Ban className="w-4 h-4" />
                Statutory Red Zone — Permanent Habitation Prohibition
              </span>
              <span className="text-[10px] bg-red-900/80 text-red-200 px-2 py-0.5 rounded font-mono border border-red-700">
                DM Act 2005 Sec 30(2)
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight mt-1">
              "Area Declared Unsuitable for Permanent Habitation"
            </h2>
            <p className="text-xs text-slate-300 max-w-4xl mt-1 leading-relaxed">
              This is fundamentally different from a temporary flood warning. A Permanent Red Zone is an irrevocable planning designation establishing that long-term human habitation is structurally unviable due to irreversible geomorphic instability.
            </p>
          </div>

          {/* Version Selector Slider / Pill Buttons */}
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700 shrink-0">
            <button
              onClick={() => onSelectVersion('v1.0-2025')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isV2 
                  ? 'bg-red-700 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Version 1.0 (Jan 2025)
            </button>
            <button
              onClick={() => onSelectVersion('v2.0-2026')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                isV2 
                  ? 'bg-red-600 text-white shadow-md ring-2 ring-red-400/50' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Version 2.0 (Jan 2026)</span>
              <span className="text-[9px] bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-black">
                AMENDED
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Version Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* v1 Card */}
        <div className={`p-4 rounded-xl border transition-all ${
          !isV2 
            ? 'bg-slate-900/90 border-red-700 ring-2 ring-red-500/30' 
            : 'bg-slate-950/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{v1.label}</span>
              <div className="text-xs text-slate-500 font-mono mt-0.5">{v1.gazetteNotification}</div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-300">{v1.date}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-3 text-center">
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block uppercase">Condemned Area</span>
              <span className="text-base font-black font-mono text-white">{v1.totalAreaSqKm} km²</span>
            </div>
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block uppercase">Habitations</span>
              <span className="text-base font-black font-mono text-amber-400">{v1.habitationsCondemned}</span>
            </div>
            <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block uppercase">Population</span>
              <span className="text-base font-black font-mono text-slate-300">{v1.populationExposed.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{v1.reassessmentSummary}</p>
        </div>

        {/* v2 Card */}
        <div className={`p-4 rounded-xl border transition-all ${
          isV2 
            ? 'bg-red-950/30 border-red-600 ring-2 ring-red-500/50 shadow-xl' 
            : 'bg-slate-950/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-red-900/60">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-red-300 uppercase tracking-wider">{v2.label}</span>
                <span className="text-[10px] bg-red-800 text-white font-bold px-1.5 py-0.2 rounded">LATEST GAZETTE</span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{v2.gazetteNotification}</div>
            </div>
            <span className="text-xs font-mono font-bold text-red-300">{v2.date}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-3 text-center">
            <div className="p-2 rounded bg-red-900/30 border border-red-700/50">
              <span className="text-[10px] text-slate-300 block uppercase">Expanded Area</span>
              <span className="text-base font-black font-mono text-red-200">{v2.totalAreaSqKm} km²</span>
              <span className="text-[10px] text-red-400 font-bold block">+9.6 km² (+67%)</span>
            </div>
            <div className="p-2 rounded bg-red-900/30 border border-red-700/50">
              <span className="text-[10px] text-slate-300 block uppercase">Habitations</span>
              <span className="text-base font-black font-mono text-red-200">{v2.habitationsCondemned}</span>
              <span className="text-[10px] text-red-400 font-bold block">+2 New Sites</span>
            </div>
            <div className="p-2 rounded bg-red-900/30 border border-red-700/50">
              <span className="text-[10px] text-slate-300 block uppercase">Population</span>
              <span className="text-base font-black font-mono text-red-200">{v2.populationExposed.toLocaleString()}</span>
              <span className="text-[10px] text-red-400 font-bold block">+3,360 Exposed</span>
            </div>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">{v2.reassessmentSummary}</p>
        </div>
      </div>

      {/* Statutory Criteria List */}
      <div className="p-4 rounded-xl bg-gov-dark border border-gov-border space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-white">
          <FileText className="w-4 h-4 text-red-400" />
          <span>Statutory Criteria for Permanent Red Zone Demarcation</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {currentVersion.criteria.map((c, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-gov-surface border border-gov-border">
              <CheckCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="text-slate-300 leading-relaxed">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
