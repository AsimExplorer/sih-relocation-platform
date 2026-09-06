import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

interface MapLegendProps {
  layers: Record<string, boolean>;
  onToggleLayer: (id: string) => void;
}

export const MapLegend: React.FC<MapLegendProps> = ({ layers, onToggleLayer }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-[400] bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-xs shadow-2xl max-w-xs transition-all">
      <div 
        className="flex items-center justify-between font-bold text-slate-200 cursor-pointer select-none pb-2 border-b border-slate-800"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-1.5 text-blue-400">
          <Layers className="w-4 h-4" />
          <span>GIS Layers & Legend</span>
        </div>
        <button className="text-slate-400 hover:text-white">
          {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="space-y-2 mt-2">
          {/* Layer toggles */}
          <div className="space-y-1.5 pb-2 border-b border-slate-800/80">
            <label className="flex items-center justify-between text-slate-300 hover:text-white cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-red-950 border border-red-600 inline-block shrink-0" />
                Permanent Red Zone
              </span>
              <input 
                type="checkbox" 
                checked={layers['redZone']} 
                onChange={() => onToggleLayer('redZone')} 
                className="rounded accent-red-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-300 hover:text-white cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-950 border border-emerald-500 inline-block shrink-0" />
                Candidate Relocation Sites
              </span>
              <input 
                type="checkbox" 
                checked={layers['candidateSites']} 
                onChange={() => onToggleLayer('candidateSites')} 
                className="rounded accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-300 hover:text-white cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block shrink-0" />
                Vulnerable Settlements
              </span>
              <input 
                type="checkbox" 
                checked={layers['settlements']} 
                onChange={() => onToggleLayer('settlements')} 
                className="rounded accent-blue-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-300 hover:text-white cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-blue-400 border-t border-dashed border-blue-400 inline-block shrink-0" />
                Relocation Corridors
              </span>
              <input 
                type="checkbox" 
                checked={layers['allocations']} 
                onChange={() => onToggleLayer('allocations')} 
                className="rounded accent-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-300 hover:text-white cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-950/60 border border-amber-600 inline-block shrink-0" />
                Debris Flow Runout Zone
              </span>
              <input 
                type="checkbox" 
                checked={layers['hazardZones']} 
                onChange={() => onToggleLayer('hazardZones')} 
                className="rounded accent-amber-500 cursor-pointer"
              />
            </label>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-0.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>Red Zone = Statutory Unsuitability under DM Act 2005.</span>
          </div>
        </div>
      )}
    </div>
  );
};
