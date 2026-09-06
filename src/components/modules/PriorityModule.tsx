import React, { useState } from 'react';
import { TrendingUp, HelpCircle } from 'lucide-react';
import { Settlement } from '../../types';
import { evaluateRelocationPriority, compareSettlements } from '../../engine/priorityEngine';
import { StatusBadge } from '../common/StatusBadge';

interface PriorityModuleProps {
  settlements: Settlement[];
}

export const PriorityModule: React.FC<PriorityModuleProps> = ({ settlements }) => {
  const [selectedForComparison, setSelectedForComparison] = useState<[string, string]>(['SET-01', 'SET-02']);

  const evaluated = settlements.map(s => ({
    settlement: s,
    breakdown: evaluateRelocationPriority(s)
  })).sort((a, b) => b.breakdown.calculatedScore - a.breakdown.calculatedScore);

  const setA = settlements.find(s => s.id === selectedForComparison[0]) || settlements[0];
  const setB = settlements.find(s => s.id === selectedForComparison[1]) || settlements[1];
  const comparison = compareSettlements(setA, setB);

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-blue-700" />
          <span>Relocation Priority Engine</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          Deterministic Multi-Criteria Priority Ranking
        </h2>
        <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
          Why is Yamuna Khadar East prioritized before Usmanpur Dhall? The priority engine evaluates 5 transparent, auditable factors rather than unexplainable AI weights. Every ranking is backed by measurable flood recurrence, riverbed overlap, and life-safety exposure indicators.
        </p>
      </div>

      {/* Priority Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-3 border-b border-slate-200 flex items-center justify-between font-bold text-xs text-slate-800 bg-slate-50">
          <span>Settlement Relocation Priority Ledger</span>
          <span className="text-slate-500 text-[11px] font-normal">Ranked by Composite Life-Safety Threat</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Rank & Settlement</th>
                <th className="py-2.5 px-3">Priority Level</th>
                <th className="py-2.5 px-3">Pop (HH)</th>
                <th className="py-2.5 px-3">Flood Recurrence (35%)</th>
                <th className="py-2.5 px-3">Red Zone (25%)</th>
                <th className="py-2.5 px-3">Backflow Risk (15%)</th>
                <th className="py-2.5 px-3">Scour (10%)</th>
                <th className="py-2.5 px-3">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {evaluated.map((item, idx) => {
                const s = item.settlement;
                const b = item.breakdown;
                return (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-mono font-bold flex items-center justify-center text-[10px]">
                          #{idx + 1}
                        </span>
                        <div>
                          <span className="font-bold text-slate-900 block">{s.name}</span>
                          <span className="text-[10px] text-slate-500">{s.localPanchayat}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge value={b.priorityLevel} size="sm" />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700">
                      {s.population.toLocaleString()} ({s.households} HH)
                    </td>
                    <td className="py-3 px-3">
                      <div className="space-y-1">
                        <div className="font-mono text-slate-800 font-semibold">{s.factors.hazardRecurrence}/100</div>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div className="h-full bg-red-600" style={{ width: s.factors.hazardRecurrence + '%' }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-rose-700">
                      {s.redZoneOverlapPct}%
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-800">
                      {s.factors.accessibilityRisk}/100
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700">
                      {s.factors.slopeInstability}/100
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-base font-black font-mono text-red-700 px-2 py-0.5 rounded bg-red-50 border border-red-200">
                        {b.calculatedScore}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* "Why is Settlement A ranked above Settlement B?" Explainable Comparator */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-700" />
            <h3 className="font-bold text-sm text-slate-900">
              Pairwise Ranking Comparator ("Why is X prioritized above Y?")
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <select
              value={selectedForComparison[0]}
              onChange={e => setSelectedForComparison([e.target.value, selectedForComparison[1]])}
              className="bg-slate-50 text-slate-900 border border-slate-300 rounded px-2.5 py-1"
            >
              {settlements.map(s => (
                <option key={s.id} value={s.id}>{s.name} (#{evaluateRelocationPriority(s).calculatedScore})</option>
              ))}
            </select>
            <span className="text-slate-500 font-bold">vs</span>
            <select
              value={selectedForComparison[1]}
              onChange={e => setSelectedForComparison([selectedForComparison[0], e.target.value])}
              className="bg-slate-50 text-slate-900 border border-slate-300 rounded px-2.5 py-1"
            >
              {settlements.map(s => (
                <option key={s.id} value={s.id}>{s.name} (#{evaluateRelocationPriority(s).calculatedScore})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">Decision Conclusion:</span>
            <span className="text-emerald-800 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              {comparison.winner.name} takes precedence over {comparison.loser.name} (+{comparison.margin} pts margin)
            </span>
          </div>
          <div className="space-y-1 pt-1">
            <span className="text-slate-500 text-[11px] uppercase tracking-wider font-bold">Key Contributing Factor Differentials:</span>
            {comparison.differentialFactors.length > 0 ? (
              comparison.differentialFactors.map((diff, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-800 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
                  <span>{diff}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-xs">Equal threat index across comparative dimensions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
