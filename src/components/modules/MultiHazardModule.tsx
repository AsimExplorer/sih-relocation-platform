import React, { useState } from 'react';
import { 
  Flame, 
  CloudRain, 
  AlertTriangle, 
  Layers, 
  Waves, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { MULTI_HAZARD_LAYERS_CONFIG, SETTLEMENTS_DATA, DATA_CONFIDENCE_METRICS } from '../../data/delhiData';
import { Settlement } from '../../types';
import { DisasterScenario } from '../../data/scenariosData';

interface MultiHazardModuleProps {
  settlements?: Settlement[];
  activeScenario?: DisasterScenario;
}

export const MultiHazardModule: React.FC<MultiHazardModuleProps> = ({ 
  settlements = SETTLEMENTS_DATA,
  activeScenario 
}) => {
  const [selectedSettlementId, setSelectedSettlementId] = useState<string>(settlements[0]?.id || SETTLEMENTS_DATA[0].id);
  const activeSettlement = settlements.find(s => s.id === selectedSettlementId) || settlements[0] || SETTLEMENTS_DATA[0];

  const breakdownFactors = [
    { label: 'Flood Inundation Depth Risk (CWC >208.66m Level)', score: activeSettlement.riskBreakdown.floodInundationRisk, weight: '25%', color: 'bg-blue-600' },
    { label: 'Silt Liquefaction & Scour Vulnerability', score: activeSettlement.riskBreakdown.siltLiquefactionRisk, weight: '20%', color: 'bg-amber-600' },
    { label: 'Drainage Siphon Backflow Congestion', score: activeSettlement.riskBreakdown.drainageBackflowRisk, weight: '15%', color: 'bg-indigo-600' },
    { label: 'Population Vulnerability & Non-Pucca Density', score: activeSettlement.riskBreakdown.populationVulnerability, weight: '15%', color: 'bg-red-600' },
    { label: 'Historical Disaster Recurrence (2013, 2019, 2023)', score: activeSettlement.riskBreakdown.historicalDisasterRecurrence, weight: '15%', color: 'bg-rose-600' },
    { label: 'Evacuation & Accessibility Impedance', score: activeSettlement.riskBreakdown.accessibilityImpedance, weight: '10%', color: 'bg-slate-600' },
  ];

  return (
    <div className="space-y-4">
      {/* Module Title Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
          <Waves className="w-4 h-4 text-blue-700" />
          <span>Stage 1: Multi-Hazard Intelligence & Risk Assessment</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          Hydrological Hazard Drivers & Settlement Risk Breakdown
        </h2>
        <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
          The Yamuna River corridor through East Delhi presents complex multi-hazard dynamics. Hathnikund Barrage releases exceeding 3.5 lakh cusecs cause river levels to surge beyond the danger mark of 205.33m MSL (reaching 208.66m in July 2023), triggering deep riverbed inundation, siphon backflow into urban drains, and severe silt liquefaction.
        </p>
      </div>

      {/* Hazard Mechanics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
            <Waves className="w-4 h-4 text-blue-700" />
            <span>1. Extreme Flood Level (&gt;208.66m MSL)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            In July 2023, the Yamuna reached an all-time record 208.66m, overtopping the Old Railway Bridge (Loha Pul) and submerging Yamuna Khadar lowlands under 3.5m to 4.5m of direct velocity floodwaters.
          </p>
          <div className="text-[11px] font-mono text-blue-900 bg-blue-50 p-2 rounded-lg border border-blue-200">
            Critical Threshold: CWC Danger Level 205.33m / Evac: 206.00m
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-orange-950 font-bold text-sm">
            <CloudRain className="w-4 h-4 text-orange-700" />
            <span>2. Hathnikund Barrage Monsoonal Surge</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Catchment rainfall in Himachal funnels into Yamunanagar, forcing emergency releases over 3.5 lakh cusecs. Flood surge transit time to East Delhi is approximately 36 to 48 hours.
          </p>
          <div className="text-[11px] font-mono text-orange-900 bg-orange-50 p-2 rounded-lg border border-orange-200">
            Peak Trigger: Release &gt; 3,00,000 cusecs triggers red alert
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>3. Drainage Siphon Backflow & Scour</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            During high river stages, river levels exceed outfall gates of city drainage canals (Drain No. 12, Shastri Park culvert), causing reverse backwater flooding behind protective bunds.
          </p>
          <div className="text-[11px] font-mono text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
            Vulnerability: Soil liquefaction and bearing loss in riverbed silt
          </div>
        </div>
      </div>

      {/* DETAILED SETTLEMENT RISK BREAKDOWN & KEY DRIVERS */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-blue-700" />
                Transparent Deterministic Risk Breakdown
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold border border-slate-300">
                Non-Black Box Scoring
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
              Settlement-Specific Multi-Factor Risk Assessment
            </h3>
          </div>

          {/* Settlement Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-300 overflow-x-auto">
            {settlements.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSettlementId(s.id)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all whitespace-nowrap ${
                  activeSettlement.id === s.id
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {s.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Settlement Header */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-500 uppercase">{activeSettlement.id}</span>
              <h4 className="text-base font-black text-slate-900">{activeSettlement.name}</h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                {activeSettlement.hazardExposure} Hazard
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {activeSettlement.localPanchayat} • Population: {activeSettlement.population.toLocaleString()} ({activeSettlement.households} Households)
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Composite Risk Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-mono font-black text-red-600">{activeSettlement.riskScore}</span>
              <span className="text-xs text-slate-500 font-mono">/ 100</span>
            </div>
          </div>
        </div>

        {/* Factor Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {breakdownFactors.map((factor, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{factor.label}</span>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-slate-400">({factor.weight})</span>
                  <span className="font-bold text-slate-900">{factor.score} / 100</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${factor.color}`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Key Risk Drivers Callout */}
        <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-950 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Key Risk Drivers for {activeSettlement.name}</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-800 leading-relaxed font-medium">
            {activeSettlement.keyRiskDrivers.map((driver, i) => (
              <li key={i} className="pl-1">
                <span className="text-slate-900">{driver}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Deterministic Formula Explanation */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900">Deterministic Mathematical Formulation:</span>
            <div className="font-mono text-[11px] text-blue-900 mt-0.5 bg-white p-1.5 rounded border border-slate-200 inline-block">
              Risk_Score = 0.25 × Flood_Risk + 0.20 × Liquefaction + 0.15 × Backflow + 0.15 × Vulnerability + 0.15 × Recurrence + 0.10 × Impedance
            </div>
            <p className="mt-1 text-[11px]">
              Every weight is derived from regional disaster management and hydrological risk criteria. No heuristic or opaque machine-learning weights are utilized in habitational risk scoring.
            </p>
          </div>
        </div>
      </div>

      {/* DATA CONFIDENCE & QUALITY SECTION */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900">Data Confidence & Multi-Agency Quality Audit</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Composite Confidence:</span>
            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              {DATA_CONFIDENCE_METRICS.overallConfidencePct}% (High Assurance)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Source Reliability</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{DATA_CONFIDENCE_METRICS.sourceReliabilityPct}%</span>
            <span className="text-[10px] text-slate-500 block">CWC / IMD Verified</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Hydrology Freshness</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{DATA_CONFIDENCE_METRICS.dataFreshnessPct}%</span>
            <span className="text-[10px] text-slate-500 block">Jan 2026 Audit</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Spatial Completeness</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{DATA_CONFIDENCE_METRICS.completenessPct}%</span>
            <span className="text-[10px] text-slate-500 block">Cadastral Boundary</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Cross-Source Consistency</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{DATA_CONFIDENCE_METRICS.crossSourceConsistencyPct}%</span>
            <span className="text-[10px] text-slate-500 block">Triangulated</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 italic">
          Notice: Risk metrics calibrated to Central Water Commission and regional hydrological baselines.
        </p>
      </div>

      {/* Layer Catalog Table */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
        <div className="flex items-center justify-between font-bold text-sm text-slate-900">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700" />
            Configured Multi-Hazard Spatial Layers
          </span>
          <span className="text-xs text-slate-500 font-normal">Integrated from CWC, PWD & Irrigation Dept</span>
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
                  <td className="py-2.5 px-3 text-slate-600 font-mono">CWC / Irrigation & Flood Control</td>
                  <td className="py-2.5 px-3 font-mono">1:5,000 Cadastral</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      Inundation & Structural
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-bold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Active GIS Layer
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
