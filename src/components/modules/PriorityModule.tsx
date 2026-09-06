import React, { useState } from 'react';
import { TrendingUp, HelpCircle, RefreshCw, AlertCircle, CheckCircle2, Cpu, ShieldAlert, ChevronRight } from 'lucide-react';
import { Settlement, AiAssessmentBatchResponse } from '../../types';
import { evaluateRelocationPriority, compareSettlements } from '../../engine/priorityEngine';
import { StatusBadge } from '../common/StatusBadge';

interface PriorityModuleProps {
  settlements: Settlement[];
  aiAssessment?: AiAssessmentBatchResponse | null;
  isLoadingAi?: boolean;
  onReassess?: () => void;
}

export const PriorityModule: React.FC<PriorityModuleProps> = ({ 
  settlements,
  aiAssessment,
  isLoadingAi = false,
  onReassess
}) => {
  const [selectedSettlementId, setSelectedSettlementId] = useState<string>(settlements[0]?.id || 'SET-01');
  const [selectedForComparison, setSelectedForComparison] = useState<[string, string]>(['SET-01', 'SET-02']);

  const evaluated = settlements.map(s => ({
    settlement: s,
    breakdown: evaluateRelocationPriority(s)
  })).sort((a, b) => b.breakdown.calculatedScore - a.breakdown.calculatedScore);

  const selectedSettlement = settlements.find(s => s.id === selectedSettlementId) || settlements[0];
  const selectedAiData = aiAssessment?.assessments?.[selectedSettlementId];

  const setA = settlements.find(s => s.id === selectedForComparison[0]) || settlements[0];
  const setB = settlements.find(s => s.id === selectedForComparison[1]) || settlements[1];
  const comparison = compareSettlements(setA, setB);

  // Fallback values if AI data is still loading
  const currentRiskScore = selectedAiData?.riskScore ?? evaluateRelocationPriority(selectedSettlement).calculatedScore;
  const currentPriority = selectedAiData?.priority ?? selectedSettlement.priority;
  const currentTopDrivers = selectedAiData?.topDrivers ?? (
    selectedSettlement.keyRiskDrivers?.slice(0, 3) || [
      selectedSettlement.redZoneOverlapPct + '% permanent Red Zone overlap within active floodplain',
      'Historical flood recurrence in 2013, 2019, 2023 surpassing 208.66m CWC danger mark',
      'High population vulnerability (' + selectedSettlement.vulnerabilityScore + '/100) with unbunded housing'
    ]
  );
  const currentRecommendation = selectedAiData?.recommendation ?? selectedSettlement.recommendedAction;
  const currentSummary = selectedAiData?.assessmentSummary ?? (
    selectedSettlement.explanation?.summary ||
    (selectedSettlement.name + ' exhibits high multi-hazard exposure and critical floodplain vulnerability, requiring prioritized planned relocation.')
  );

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-blue-700" />
          <span>Relocation Priority Engine</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          AI-Assisted Risk Interpretation & Relocation Urgency
        </h2>
        <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
          How does SURAKSHA prioritize habitations for permanent relocation? The AI interprets multi-factor settlement risk, flood recurrence frequency, and exposed vulnerable density to produce explainable priority classifications. Physical land safety, exclusion zones, and carrying capacities remain strictly calculated by deterministic engineering engines.
        </p>
      </div>

      {/* 1. Dedicated AI-Assisted Risk Assessment Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Panel Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800">
              <Cpu className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  AI-Assisted Relocation Risk Assessment
                </h3>
                {aiAssessment?.isFallback ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                    AI unavailable — showing rule-based assessment
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Live AI Assessment ({aiAssessment?.source || 'gemini-2.5-flash'})
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-500">
                Advisory life-safety interpretation • Last assessed: {aiAssessment?.timestamp || 'Cached'}
              </span>
            </div>
          </div>

          <button
            onClick={onReassess}
            disabled={isLoadingAi}
            className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs border border-blue-800 cursor-pointer self-start sm:self-auto"
            title="Request fresh AI batch evaluation across all settlements"
          >
            <RefreshCw className={'w-3.5 h-3.5 ' + (isLoadingAi ? 'animate-spin' : '')} />
            <span>{isLoadingAi ? 'Evaluating with AI...' : 'Reassess with AI'}</span>
          </button>
        </div>

        {/* Interactive Settlement Selector Tabs */}
        <div className="px-4 pt-3 pb-2 border-b border-slate-200 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1 shrink-0">
            Select Settlement:
          </span>
          {settlements.map(s => {
            const isSelected = s.id === selectedSettlementId;
            const sAi = aiAssessment?.assessments?.[s.id];
            const p = sAi?.priority ?? s.priority;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSettlementId(s.id)}
                className={'px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ' + (
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <span>{s.name.split(' (')[0]}</span>
                <span className={'px-1.5 py-0.2 rounded text-[10px] font-bold ' + (
                  isSelected
                    ? 'bg-blue-800 text-blue-100'
                    : p === 'Immediate'
                    ? 'bg-red-100 text-red-800'
                    : p === 'Short-Term'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                )}>
                  {p}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Settlement AI Assessment Card */}
        <div className="p-4 md:p-5 bg-white space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: AI Score & Priority Classification (5 cols) */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    AI-Assessed Relocation Urgency
                  </span>
                  <StatusBadge value={currentPriority} size="sm" />
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className={'text-4xl font-black font-mono tracking-tight ' + (
                    currentRiskScore >= 85 ? 'text-red-700' : currentRiskScore >= 70 ? 'text-amber-700' : 'text-blue-700'
                  )}>
                    {currentRiskScore}
                  </span>
                  <span className="text-slate-500 font-mono text-base font-semibold">/ 100</span>
                </div>

                <div className="mt-1 text-xs text-slate-600 font-medium">
                  <span className="font-bold text-slate-800">AI Risk Score</span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Advisory multi-hazard composite index; not a statistical disaster probability.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Exposed Population</span>
                  <span className="font-mono font-bold text-slate-900">{selectedSettlement.population.toLocaleString()} ({selectedSettlement.households} HH)</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Red Zone Overlap</span>
                  <span className="font-mono font-bold text-rose-700">{selectedSettlement.redZoneOverlapPct}%</span>
                </div>
              </div>
            </div>

            {/* Right: Key Risk Drivers & Explainable Summary (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {/* Top 3 Drivers */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <span>Top Contributing Risk Drivers</span>
                </div>
                <div className="space-y-1.5">
                  {currentTopDrivers.map((driver, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs bg-white p-2 rounded border border-slate-200 text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{driver}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explainable Narrative & Recommendation */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block">
                    Assessment Summary ("Why classified as {currentPriority}?")
                  </span>
                  <p className="text-slate-800 mt-1 leading-relaxed">
                    {currentSummary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-blue-900 block">
                    Actionable Guidance
                  </span>
                  <div className="mt-1 flex items-center gap-1.5 text-slate-900 font-semibold bg-white p-2 rounded border border-blue-200">
                    <ChevronRight className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>{currentRecommendation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Defensive Design & Safety Governance Boundary Callout */}
          <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-blue-950">Safety & Defensive Governance Boundary:</span>
              <p className="text-slate-700 leading-relaxed">
                AI evaluates settlement vulnerability urgency and provides explainable decision support only. Candidate relocation site safety, Red Zone exclusion boundaries, and host-site carrying capacities are strictly calculated by deterministic GIS and civil-engineering min-operator rule engines. AI is prohibited from declaring land safe or overriding physical constraints.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Deterministic Settlement Relocation Priority Ledger */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-3 border-b border-slate-200 flex items-center justify-between font-bold text-xs text-slate-800 bg-slate-50">
          <span>Deterministic Relocation Priority Ledger (Full East Delhi Habitats)</span>
          <span className="text-slate-500 text-[11px] font-normal">Auditable Multi-Criteria Life-Safety Scoring</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Rank & Settlement</th>
                <th className="py-2.5 px-3">AI Priority</th>
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
                const sAi = aiAssessment?.assessments?.[s.id];
                const displayPriority = sAi?.priority || b.priorityLevel;
                const isCurrent = s.id === selectedSettlementId;
                return (
                  <tr 
                    key={s.id} 
                    onClick={() => setSelectedSettlementId(s.id)}
                    className={'cursor-pointer transition-colors ' + (isCurrent ? 'bg-blue-50/60' : 'hover:bg-slate-50')}
                  >
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
                      <StatusBadge value={displayPriority} size="sm" />
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
                        {sAi?.riskScore ?? b.calculatedScore}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. "Why is Settlement A ranked above Settlement B?" Explainable Comparator */}
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
              className="bg-slate-50 text-slate-900 border border-slate-300 rounded px-2.5 py-1 font-medium"
            >
              {settlements.map(s => (
                <option key={s.id} value={s.id}>{s.name} (#{aiAssessment?.assessments?.[s.id]?.riskScore ?? evaluateRelocationPriority(s).calculatedScore})</option>
              ))}
            </select>
            <span className="text-slate-500 font-bold">vs</span>
            <select
              value={selectedForComparison[1]}
              onChange={e => setSelectedForComparison([selectedForComparison[0], e.target.value])}
              className="bg-slate-50 text-slate-900 border border-slate-300 rounded px-2.5 py-1 font-medium"
            >
              {settlements.map(s => (
                <option key={s.id} value={s.id}>{s.name} (#{aiAssessment?.assessments?.[s.id]?.riskScore ?? evaluateRelocationPriority(s).calculatedScore})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
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
