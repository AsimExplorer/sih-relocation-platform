import React, { useState } from 'react';
import { Home, AlertTriangle, Users, ShieldAlert, ArrowRight } from 'lucide-react';
import { Settlement } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface SettlementsModuleProps {
  settlements: Settlement[];
  selectedSettlementId: string | null;
  onSelectSettlement: (id: string) => void;
}

export const SettlementsModule: React.FC<SettlementsModuleProps> = ({
  settlements,
  selectedSettlementId,
  onSelectSettlement,
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const filtered = settlements.filter(s => {
    if (filterPriority === 'ALL') return true;
    return s.priority === filterPriority;
  });

  const selected = settlements.find(s => s.id === selectedSettlementId) || settlements[0];

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
            <Home className="w-4 h-4 text-blue-700" />
            <span>Vulnerable Floodplain Habitations Registry</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Settlement Exposure & Permanent Relocation Assessment
          </h2>
          <p className="text-xs text-slate-600 max-w-3xl mt-1">
            Detailed register of unbunded riverbed clusters located within the active Yamuna floodway across East Delhi and North East Delhi districts.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 text-xs bg-slate-100 p-1 rounded-lg border border-slate-200">
          {['ALL', 'Immediate', 'Short-Term', 'Medium-Term'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                filterPriority === p 
                  ? 'bg-blue-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: Table + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Settlement Table */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-3 border-b border-slate-200 font-bold text-xs text-slate-800 flex justify-between items-center bg-slate-50">
            <span>Settlement Registry ({filtered.length} Habitations)</span>
            <span className="text-[11px] text-slate-500 font-normal">Click a row to inspect</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Habitation</th>
                  <th className="py-2.5 px-3">Pop (HH)</th>
                  <th className="py-2.5 px-3">Red Zone %</th>
                  <th className="py-2.5 px-3">Risk Score</th>
                  <th className="py-2.5 px-3">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map(st => {
                  const isSelected = st.id === selected?.id;
                  return (
                    <tr
                      key={st.id}
                      onClick={() => onSelectSettlement(st.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-blue-50 border-l-4 border-l-blue-700' 
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 text-xs">{st.name}</div>
                        <div className="text-[10px] text-slate-500">{st.localPanchayat}</div>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <div className="text-slate-900 font-semibold">{st.population.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500">{st.households} HH</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`font-mono font-bold text-xs ${st.redZoneOverlapPct >= 90 ? 'text-red-700' : 'text-orange-700'}`}>
                          {st.redZoneOverlapPct}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                          {st.riskScore}/100
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge value={st.priority} size="sm" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Settlement Inspector Side Panel */}
        {selected && (
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-sm">
            <div className="flex items-start justify-between pb-2 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">{selected.name}</h3>
                  <StatusBadge value={selected.priority} size="sm" />
                </div>
                <div className="text-xs text-slate-500">{selected.localPanchayat} • Lat: {selected.lat.toFixed(4)}, Lng: {selected.lng.toFixed(4)}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Risk Score</span>
                <span className="text-xl font-mono font-black text-red-700">{selected.riskScore}/100</span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Population</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{selected.population.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block">({selected.households} HH)</span>
              </div>
              <div className="p-2 rounded-lg bg-red-50 border border-red-200">
                <span className="text-[10px] text-red-800 block uppercase font-semibold">Red Zone %</span>
                <span className="font-mono font-bold text-red-700 text-sm">{selected.redZoneOverlapPct}%</span>
                <span className="text-[10px] text-red-600 block font-medium">NGT O-Zone</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Soil Class</span>
                <span className="font-mono font-bold text-slate-800 text-sm">{selected.soilErosionClass}</span>
                <span className="text-[10px] text-slate-500 block">Alluvial Silt</span>
              </div>
            </div>

            {/* Explainable Drivers */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
                Why Permanent Relocation? (Explainable Drivers)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                {selected.explanation.summary}
              </p>
              <div className="space-y-1 pt-1">
                {selected.explanation.keyPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                    <span className="text-red-600 font-bold">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Flood Events Log */}
            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-800">Historical Inundation Log ({selected.historicalDisasters.length} Events)</span>
              <div className="space-y-1.5">
                {selected.historicalDisasters.map((evt, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-900">{evt.year} — {evt.eventType}</div>
                      <div className="text-slate-500 text-[10px]">{evt.damageDesc}</div>
                    </div>
                    {evt.fatalities > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 font-mono font-bold text-[10px] shrink-0">
                        {evt.fatalities} Fatalities
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Plan */}
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs">
              <span className="font-bold text-red-900 block uppercase text-[10px]">Action Plan</span>
              <span className="text-slate-900 font-semibold">{selected.recommendedAction}</span>
              <div className="text-[10px] text-slate-600 mt-1">{selected.explanation.statutoryJustification}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
