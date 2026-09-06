import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

interface MapLegendProps {
  layers: Record<string, boolean>;
  onToggleLayer: (id: string) => void;
}

export const MapLegend: React.FC<MapLegendProps> = ({ layers, onToggleLayer }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-sm border border-slate-300 rounded-xl p-3 text-xs shadow-lg max-w-xs transition-all">
      <div 
        className="flex items-center justify-between font-bold text-slate-800 cursor-pointer select-none pb-2 border-b border-slate-200"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-1.5 text-blue-800">
          <Layers className="w-4 h-4 text-blue-700" />
          <span>GIS Layers & Symbology</span>
        </div>
        <button className="text-slate-500 hover:text-slate-800">
          {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="space-y-2 mt-2">
          {/* Layer toggles */}
          <div className="space-y-1.5 pb-2 border-b border-slate-200">
            <label className="flex items-center justify-between text-slate-700 hover:text-slate-950 cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-red-100 border-2 border-red-600 inline-block shrink-0" />
                Permanent Red Zone (NGT O-Zone)
              </span>
              <input 
                type="checkbox" 
                checked={layers['redZone']} 
                onChange={() => onToggleLayer('redZone')} 
                className="rounded accent-red-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-700 hover:text-slate-950 cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-100 border-2 border-emerald-600 inline-block shrink-0" />
                Candidate Parcels (Feasible vs Rej)
              </span>
              <input 
                type="checkbox" 
                checked={layers['candidateSites']} 
                onChange={() => onToggleLayer('candidateSites')} 
                className="rounded accent-emerald-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-700 hover:text-slate-950 cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block shrink-0" />
                Vulnerable Flood Habitations
              </span>
              <input 
                type="checkbox" 
                checked={layers['settlements']} 
                onChange={() => onToggleLayer('settlements')} 
                className="rounded accent-blue-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-700 hover:text-slate-950 cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-4 h-1 bg-blue-600 inline-block shrink-0" />
                Relocation Corridors
              </span>
              <input 
                type="checkbox" 
                checked={layers['allocations']} 
                onChange={() => onToggleLayer('allocations')} 
                className="rounded accent-blue-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-slate-700 hover:text-slate-950 cursor-pointer select-none">
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-blue-100 border-2 border-blue-500 inline-block shrink-0" />
                Yamuna 100-Yr Flood Envelope
              </span>
              <input 
                type="checkbox" 
                checked={layers['hazardZones']} 
                onChange={() => onToggleLayer('hazardZones')} 
                className="rounded accent-blue-600 cursor-pointer"
              />
            </label>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>Red Zone = Permanent Non-Habitation Zone (NGT 'O' Zone).</span>
          </div>
        </div>
      )}
    </div>
  );
};
