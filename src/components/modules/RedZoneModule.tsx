import React from 'react';
import { Ban, AlertOctagon, History, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { RedZoneVersionData } from '../../types';
import { RED_ZONE_VERSIONS } from '../../data/delhiData';

interface RedZoneModuleProps {
  currentVersion: RedZoneVersionData;
  onSelectVersion: (version: 'v1.0-2024' | 'v2.0-2025') => void;
}

export const RedZoneModule: React.FC<RedZoneModuleProps> = ({
  currentVersion,
  onSelectVersion,
}) => {
  const v1 = RED_ZONE_VERSIONS['v1.0-2024'];
  const v2 = RED_ZONE_VERSIONS['v2.0-2025'];
  const isV2 = currentVersion.version === ('v2.0-2025' as any);

  return (
    <div className="space-y-4">
      {/* Executive Banner */}
      <div className="p-5 rounded-xl bg-white border border-red-200 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                <Ban className="w-4 h-4" />
                Permanent Unsuitability Red Zone — Demarcation Analysis
              </span>
              <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono font-semibold border border-red-200">
                Evaluation Framework & NGT 'O' Zone
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              "Area Declared Permanently Unsuitable for Human Habitation"
            </h2>
            <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
              This is fundamentally different from a temporary monsoonal flood evacuation order. A Permanent Red Zone is a definitive spatial designation establishing that permanent habitation within the active Yamuna riverbed ('O' Zone) is ecologically and structurally unviable.
            </p>
          </div>

          {/* Version Selector */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-300 shrink-0">
            <button
              onClick={() => onSelectVersion('v1.0-2024')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isV2 
                  ? 'bg-red-700 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Version 1.0 (Jan 2024)
            </button>
            <button
              onClick={() => onSelectVersion('v2.0-2025')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                isV2 
                  ? 'bg-red-700 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Version 2.0 (Jan 2025)</span>
              <span className="text-[9px] bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-black">
                AMENDED
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Version Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* v1 Card */}
        <div className={`p-4 rounded-xl border transition-all ${
          !isV2 
            ? 'bg-white border-red-400 shadow-sm ring-2 ring-red-100' 
            : 'bg-slate-50 border-slate-200 opacity-60'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{v1.label}</span>
              <div className="text-xs text-slate-500 font-mono mt-0.5">{v1.gazetteNotification}</div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700">{v1.date}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-3 text-center">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Prohibited Area</span>
              <span className="text-base font-black font-mono text-slate-900">{v1.totalAreaSqKm} km²</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Habitations</span>
              <span className="text-base font-black font-mono text-amber-700">{v1.habitationsCondemned}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Population</span>
              <span className="text-base font-black font-mono text-slate-900">{v1.populationExposed.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{v1.reassessmentSummary}</p>
        </div>

        {/* v2 Card */}
        <div className={`p-4 rounded-xl border transition-all ${
          isV2 
            ? 'bg-white border-red-500 shadow-md ring-2 ring-red-100' 
            : 'bg-slate-50 border-slate-200 opacity-60'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-red-100">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-red-900 uppercase tracking-wider">{v2.label}</span>
                <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded border border-red-200">AMENDED DELINEATION</span>
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">{v2.gazetteNotification}</div>
            </div>
            <span className="text-xs font-mono font-bold text-red-800">{v2.date}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-3 text-center">
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
              <span className="text-[10px] text-red-800 block uppercase font-semibold">Expanded Area</span>
              <span className="text-base font-black font-mono text-red-950">{v2.totalAreaSqKm} km²</span>
              <span className="text-[10px] text-red-700 font-bold block">+12.7 km² (+68%)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
              <span className="text-[10px] text-red-800 block uppercase font-semibold">Habitations</span>
              <span className="text-base font-black font-mono text-red-950">{v2.habitationsCondemned}</span>
              <span className="text-[10px] text-red-700 font-bold block">+2 New Sites</span>
            </div>
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
              <span className="text-[10px] text-red-800 block uppercase font-semibold">Population</span>
              <span className="text-base font-black font-mono text-red-950">{v2.populationExposed.toLocaleString()}</span>
              <span className="text-[10px] text-red-700 font-bold block">+7,040 Exposed</span>
            </div>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{v2.reassessmentSummary}</p>
        </div>
      </div>

      {/* Technical Criteria List */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
          <FileText className="w-4 h-4 text-red-700" />
          <span>Technical Criteria for Permanent Red Zone Demarcation</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {currentVersion.criteria.map((c, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <CheckCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
              <span className="text-slate-700 leading-relaxed">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
