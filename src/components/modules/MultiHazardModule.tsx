import React from 'react';
import { Flame, CloudRain, AlertTriangle, Layers, Waves, Droplet } from 'lucide-react';
import { MULTI_HAZARD_LAYERS_CONFIG } from '../../data/delhiData';

export const MultiHazardModule: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Module Title Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
          <Waves className="w-4 h-4 text-blue-700" />
          <span>Multi-Hazard Flood & Inundation Risk Framework</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          Hydrological Hazard Drivers in the East Delhi Yamuna Basin
        </h2>
        <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
          The Yamuna River corridor through East Delhi presents complex multi-hazard dynamics. When Hathnikund Barrage releases exceed 3.5 lakh cusecs, the water level surpasses the danger mark of 205.33m MSL (reaching 208.66m in July 2023), causing deep backwater ponding, embankment drainage siphon failures, and severe silt liquefaction.
        </p>
      </div>

      {/* Hazard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Waves className="w-4 h-4 text-blue-700" />
            <span>1. Extreme Flood Level (&gt;208.66m MSL)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            In July 2023, the Yamuna reached an all-time record 208.66m, overtopping the Old Railway Bridge (Loha Pul) and submerging Yamuna Khadar lowlands under 3.5m to 4.5m of direct velocity floodwaters.
          </p>
          <div className="text-[11px] font-mono text-blue-900 bg-blue-50 p-2.5 rounded-lg border border-blue-200">
            Critical Threshold: CWC Danger Level 205.33m / Evacuation at 206.00m
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-orange-900 font-bold text-sm">
            <CloudRain className="w-4 h-4 text-orange-700" />
            <span>2. Hathnikund Barrage Monsoonal Discharge</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Heavy catchment rains in Himachal and Uttarakhand funnel into Yamunanagar, forcing emergency releases exceeding 3.5 lakh cusecs. Flood surge travel time to East Delhi is approximately 36 to 48 hours.
          </p>
          <div className="text-[11px] font-mono text-orange-900 bg-orange-50 p-2.5 rounded-lg border border-orange-200">
            Peak Trigger: Discharge &gt; 3,00,000 cusecs triggers immediate red alert
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>3. Embankment Siphon Backflow & Scour</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            During peak river stages, river levels exceed the outfall levels of city drainage canals (Drain No. 12, Shastri Park culvert), causing reverse flooding behind embankments and foundation subsidence in sandy alluvial silt.
          </p>
          <div className="text-[11px] font-mono text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
            Vulnerability: Soil liquefaction and bearing loss in all riverbed silt
          </div>
        </div>
      </div>

      {/* Layer Catalog Table */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <div className="flex items-center justify-between font-bold text-sm text-slate-900">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700" />
            Configured Multi-Hazard Spatial Layers
          </span>
          <span className="text-xs text-slate-500 font-normal">Integrated from CWC, DDMA & Irrigation Dept</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Hazard Layer Name</th>
                <th className="py-2.5 px-3">Source Agency</th>
                <th className="py-2.5 px-3">Spatial Resolution</th>
                <th className="py-2.5 px-3">Threat Category</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {MULTI_HAZARD_LAYERS_CONFIG.map(layer => (
                <tr key={layer.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-900 flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded shrink-0 border border-black/10" 
                      style={{ backgroundColor: layer.color }}
                    />
                    {layer.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-mono">CWC / DDMA / I&FC</td>
                  <td className="py-2.5 px-3 font-mono">1:5,000 Cadastral</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      Inundation & Structural
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono font-bold">
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
