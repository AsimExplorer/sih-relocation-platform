import React from 'react';
import { Flame, Mountain, CloudRain, ShieldAlert, AlertTriangle, Layers } from 'lucide-react';
import { MULTI_HAZARD_LAYERS_CONFIG } from '../../data/wayanadData';

export const MultiHazardModule: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Module Title Banner */}
      <div className="p-4 rounded-xl bg-gov-card border border-gov-border">
        <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
          <Flame className="w-4 h-4" />
          <span>Multi-Hazard Risk Intelligence Framework</span>
        </div>
        <h2 className="text-xl font-black text-white tracking-tight mt-1">
          Geomorphic Hazard Drivers in the Meppadi & Vythiri Corridors
        </h2>
        <p className="text-xs text-slate-300 max-w-4xl mt-1 leading-relaxed">
          Permanent relocation decisions cannot rely solely on historical flood lines. In Western Ghats hill terrain, catastrophic failure is driven by the confluence of slope gradient, debris runout velocity, saprolite saturation, and precipitation spikes.
        </p>
      </div>

      {/* Hazard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-gov-surface border border-gov-border space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
            <Mountain className="w-4 h-4" />
            <span>1. Slope & Crown Detachment (&gt;30°)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Upper catchments in Punchirimattom and Mundakkai feature slopes exceeding 34°. Weathered saprolite overlaying impermeable charnockite bedrock creates an inescapable planar slip plane under hydrostatic pressure.
          </p>
          <div className="text-[11px] font-mono text-red-300 bg-red-950/60 p-2 rounded border border-red-900/60">
            Critical Threshold: Slope &gt;28° with saprolite depth &gt;3.5m
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gov-surface border border-gov-border space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
            <CloudRain className="w-4 h-4" />
            <span>2. 48-Hour Rainfall Spikes (&gt;120mm/24h)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Monsoonal orographic bursts funneling through the Chembra-Vellarimala gap saturate soil to 100% field moisture capacity, drastically lowering shear strength before initial slide initiation.
          </p>
          <div className="text-[11px] font-mono text-orange-300 bg-orange-950/60 p-2 rounded border border-orange-900/60">
            Trigger Norm: 24h cumulative rainfall exceeding 140mm
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gov-surface border border-gov-border space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>3. High-Velocity Debris Runout (&gt;25 m/s)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            When crown scarps collapse into steep river chutes, the slurry transforms into an unconfined debris flow with boulder payloads exceeding 10 tons. No civil engineering retaining wall can arrest this momentum.
          </p>
          <div className="text-[11px] font-mono text-amber-300 bg-amber-950/60 p-2 rounded border border-amber-900/60">
            Kinetic Energy: &gt;4.2 MJ/m² in lower valley bottlenecks
          </div>
        </div>
      </div>

      {/* Layer Catalog Table */}
      <div className="p-4 rounded-xl bg-gov-dark border border-gov-border space-y-3">
        <div className="flex items-center justify-between font-bold text-sm text-white">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            Configured Multi-Hazard Spatial Layers
          </span>
          <span className="text-xs text-slate-400">Integrated from GSI, NRSC & CWRDM</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gov-surface text-slate-400 uppercase text-[10px] tracking-wider border-b border-gov-border">
              <tr>
                <th className="py-2.5 px-3">Hazard Layer Name</th>
                <th className="py-2.5 px-3">Source Agency</th>
                <th className="py-2.5 px-3">Spatial Resolution</th>
                <th className="py-2.5 px-3">Threat Type</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-border/60 text-slate-300">
              {MULTI_HAZARD_LAYERS_CONFIG.map(layer => (
                <tr key={layer.id} className="hover:bg-gov-surface/50">
                  <td className="py-2.5 px-3 font-semibold text-white flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded shrink-0" 
                      style={{ backgroundColor: layer.color }}
                    />
                    {layer.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 font-mono">GSI / KSDMA / NRSC</td>
                  <td className="py-2.5 px-3 font-mono">1:10,000 Cadastral</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Structural & Inundation
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
