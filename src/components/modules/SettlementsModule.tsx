import React, { useState } from 'react';
import { Home, AlertTriangle, Users, Mountain, ShieldAlert, ArrowRight, X } from 'lucide-react';
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
      <div className="p-4 rounded-xl bg-gov-card border border-gov-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
            <Home className="w-4 h-4" />
            <span>Vulnerable Habitations Registry</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1">
            Settlement Risk Exposure & Unsuitability Assessment
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl mt-1">
            Detailed profile of habitations located within active debris flow runout corridors and steep slope scarps in Wayanad.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 text-xs bg-gov-surface p-1 rounded-lg border border-gov-border">
          {['ALL', 'Immediate', 'Short-Term', 'Medium-Term'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                filterPriority === p 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white'
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
        <div className="lg:col-span-7 bg-gov-dark rounded-xl border border-gov-border overflow-hidden">
          <div className="p-3 border-b border-gov-border font-bold text-xs text-slate-300 flex justify-between items-center">
            <span>Settlement Registry ({filtered.length} Habitations)</span>
            <span className="text-[11px] text-slate-400">Click a row to inspect</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gov-surface text-slate-400 uppercase text-[10px] tracking-wider border-b border-gov-border">
                <tr>
                  <th className="py-2.5 px-3">Settlement</th>
                  <th className="py-2.5 px-3">Pop (HH)</th>
                  <th className="py-2.5 px-3">Red Zone %</th>
                  <th className="py-2.5 px-3">Risk Score</th>
                  <th className="py-2.5 px-3">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-border/60">
                {filtered.map(st => {
                  const isSelected = st.id === selected?.id;
                  return (
                    <tr
                      key={st.id}
                      onClick={() => onSelectSettlement(st.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-blue-950/40 border-l-4 border-l-blue-500' 
                          : 'hover:bg-gov-surface/60'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="font-bold text-white text-xs">{st.name}</div>
                        <div className="text-[10px] text-slate-400">{st.localPanchayat}</div>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <div className="text-white font-semibold">{st.population.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-400">{st.households} HH</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`font-mono font-bold text-xs ${st.redZoneOverlapPct >= 90 ? 'text-red-400' : 'text-orange-400'}`}>
                          {st.redZoneOverlapPct}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-800 text-white border border-slate-700">
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
          <div className="lg:col-span-5 bg-gov-card rounded-xl border border-gov-border p-4 space-y-3">
            <div className="flex items-start justify-between pb-2 border-b border-gov-border">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white">{selected.name}</h3>
                  <StatusBadge value={selected.priority} size="sm" />
                </div>
                <div className="text-xs text-slate-400">{selected.localPanchayat} • Lat: {selected.lat.toFixed(4)}, Lng: {selected.lng.toFixed(4)}</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 uppercase block">Risk Score</span>
                <span className="text-xl font-mono font-black text-red-400">{selected.riskScore}/100</span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-gov-surface border border-gov-border">
                <span className="text-[10px] text-slate-400 block uppercase">Population</span>
                <span className="font-mono font-bold text-white text-sm">{selected.population}</span>
                <span className="text-[10px] text-slate-400 block">({selected.households} HH)</span>
              </div>
              <div className="p-2 rounded-lg bg-gov-surface border border-gov-border">
                <span className="text-[10px] text-slate-400 block uppercase">Red Zone Overlap</span>
                <span className="font-mono font-bold text-red-400 text-sm">{selected.redZoneOverlapPct}%</span>
                <span className="text-[10px] text-red-300 block">Statutory</span>
              </div>
              <div className="p-2 rounded-lg bg-gov-surface border border-gov-border">
                <span className="text-[10px] text-slate-400 block uppercase">Slope Gradient</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{selected.slopeDegrees}°</span>
                <span className="text-[10px] text-slate-400 block">{selected.soilErosionClass}</span>
              </div>
            </div>

            {/* Why Is Relocation Required? */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                Why Permanent Relocation? (Explainable Drivers)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                {selected.explanation.summary}
              </p>
              <div className="space-y-1 pt-1">
                {selected.explanation.keyPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                    <span className="text-red-400 font-bold">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Disaster Events Log */}
            <div className="pt-2 border-t border-gov-border space-y-1.5">
              <span className="text-xs font-bold text-slate-300">Historical Catastrophic Events ({selected.historicalDisasters.length})</span>
              <div className="space-y-1.5">
                {selected.historicalDisasters.map((evt, idx) => (
                  <div key={idx} className="p-2 rounded bg-gov-surface border border-gov-border text-[11px] flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white">{evt.year} — {evt.eventType}</div>
                      <div className="text-slate-400 text-[10px]">{evt.damageDesc}</div>
                    </div>
                    {evt.fatalities > 0 && (
                      <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800 font-mono font-bold text-[10px] shrink-0">
                        {evt.fatalities} Fatalities
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Recommendation */}
            <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/60 text-xs">
              <span className="font-bold text-red-300 block uppercase text-[10px]">Statutory Action</span>
              <span className="text-white font-semibold">{selected.recommendedAction}</span>
              <div className="text-[10px] text-slate-400 mt-1">{selected.explanation.statutoryJustification}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
