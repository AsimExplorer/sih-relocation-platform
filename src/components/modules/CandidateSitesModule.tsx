import React, { useState } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Droplet, 
  Road, 
  GraduationCap, 
  HeartPulse, 
  Maximize2,
  Filter,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { CandidateSite } from '../../types';
import { SETTLEMENTS_DATA, DATA_CONFIDENCE_METRICS } from '../../data/delhiData';

interface CandidateSitesModuleProps {
  candidateSites: CandidateSite[];
  selectedSiteId: string | null;
  onSelectSite: (id: string) => void;
  onNavigateToCapacity: () => void;
}

export const CandidateSitesModule: React.FC<CandidateSitesModuleProps> = ({
  candidateSites,
  selectedSiteId,
  onSelectSite,
  onNavigateToCapacity,
}) => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'FEASIBLE' | 'LIMITED' | 'REJECTED'>('ALL');
  const [evalSettlementId, setEvalSettlementId] = useState<string>(SETTLEMENTS_DATA[0].id);

  const selected = candidateSites.find(s => s.id === selectedSiteId) || candidateSites[0];
  const evalSettlement = SETTLEMENTS_DATA.find(s => s.id === evalSettlementId) || SETTLEMENTS_DATA[0];

  const filteredSites = candidateSites.filter(site => {
    if (statusFilter === 'ALL') return true;
    return site.status === statusFilter;
  });

  // Calculate relocation feasibility for evaluated settlement
  const neededHH = evalSettlement.households;
  const safeCap = selected.calculatedCapacity.netSafeAbsorptionCapacityHH;
  const isSiteRejectedIntrinsically = selected.status === 'REJECTED';
  const hasCapacityDeficit = safeCap < neededHH;

  let relocationStatusText = '';
  let relocationStatusBadge = '';
  if (isSiteRejectedIntrinsically) {
    relocationStatusText = `REJECTED: ${selected.statusReason}`;
    relocationStatusBadge = 'bg-red-100 text-red-900 border-red-300';
  } else if (hasCapacityDeficit) {
    relocationStatusText = `REJECTED for ${evalSettlement.name} single-batch transfer: Safe capacity (${safeCap} HH) is less than required quota (${neededHH} HH). Deficit: -${neededHH - safeCap} HH governed by ${selected.calculatedCapacity.bindingConstraint}.`;
    relocationStatusBadge = 'bg-red-100 text-red-900 border-red-300';
  } else if (selected.status === 'LIMITED') {
    relocationStatusText = `LIMITED: Site can absorb full quota (${neededHH} HH / ${safeCap} HH safe capacity), but expansion is limited by ${selected.calculatedCapacity.bindingConstraint}.`;
    relocationStatusBadge = 'bg-amber-100 text-amber-900 border-amber-300';
  } else {
    relocationStatusText = `FEASIBLE: Full ${neededHH} households can be sustainably relocated within certified safe capacity of ${safeCap} HH (${selected.calculatedCapacity.bindingConstraint} compliant).`;
    relocationStatusBadge = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  }

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>Stage 5: Candidate Resettlement Sites & Bottleneck Analysis</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Candidate Parcel Evaluation & Bottleneck-Based Site Rejection
          </h2>
          <p className="text-xs text-slate-600 max-w-3xl mt-1 leading-relaxed">
            SURAKSHA evaluates candidate sites like a real government planning authority: <b>More available land does not equal more relocation capacity</b>. Final safe capacity is governed strictly by the limiting utility bottleneck. Sites with fatal infrastructure deficits or floodway swale proximity are explicitly <b>REJECTED</b>.
          </p>
        </div>

        <button
          onClick={onNavigateToCapacity}
          className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <span>Open Carrying Capacity Engine</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-300 text-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase px-2 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filter Status:
          </span>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Parcels ({candidateSites.length})
          </button>
          <button
            onClick={() => setStatusFilter('FEASIBLE')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              statusFilter === 'FEASIBLE' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-emerald-800 hover:text-emerald-950'
            }`}
          >
            Feasible ({candidateSites.filter(s => s.status === 'FEASIBLE').length})
          </button>
          <button
            onClick={() => setStatusFilter('LIMITED')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              statusFilter === 'LIMITED' ? 'bg-amber-600 text-white shadow-2xs' : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            Limited ({candidateSites.filter(s => s.status === 'LIMITED').length})
          </button>
          <button
            onClick={() => setStatusFilter('REJECTED')}
            className={`px-2.5 py-1 rounded font-bold transition-all ${
              statusFilter === 'REJECTED' ? 'bg-red-600 text-white shadow-2xs' : 'text-red-800 hover:text-red-950'
            }`}
          >
            Rejected ({candidateSites.filter(s => s.status === 'REJECTED').length})
          </button>
        </div>

        <div className="text-xs text-slate-500">
          Click a site card below to inspect physical resources & run batch feasibility simulations.
        </div>
      </div>

      {/* Grid of Candidate Sites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {filteredSites.map(site => {
          const isSelected = site.id === selected?.id;
          let statusBadgeClass = 'bg-emerald-100 text-emerald-900 border-emerald-300';
          if (site.status === 'REJECTED') {
            statusBadgeClass = 'bg-red-100 text-red-900 border-red-300';
          } else if (site.status === 'LIMITED') {
            statusBadgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
          }

          return (
            <div
              key={site.id}
              onClick={() => onSelectSite(site.id)}
              className={'p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ' + (
                isSelected 
                  ? 'bg-emerald-50/60 border-emerald-500 ring-2 ring-emerald-200 shadow-xs' 
                  : site.status === 'REJECTED'
                  ? 'bg-red-50/20 border-red-200 hover:border-red-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{site.id}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black border uppercase tracking-wider ${statusBadgeClass}`}>
                    {site.status}
                  </span>
                </div>
                <h3 className="text-xs font-black text-slate-900 mt-1 leading-snug">
                  {site.name.split('—')[0]}
                </h3>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{site.locationName.split('(')[0]}</div>

                <div className="my-2.5 py-1.5 border-y border-slate-100 grid grid-cols-2 gap-1 text-center text-xs">
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">Suitability</span>
                    <span className="font-mono font-black text-emerald-700">{site.suitabilityScore}/100</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">Safe Cap</span>
                    <span className={`font-mono font-black ${site.status === 'REJECTED' ? 'text-red-700' : 'text-slate-900'}`}>
                      {site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-[11px] pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[10px]">Binding Limit:</span>
                  <span className={`font-bold text-[10px] truncate max-w-[120px] ${
                    site.status === 'REJECTED' ? 'text-red-800' : 'text-amber-800'
                  }`}>
                    {site.calculatedCapacity.bindingConstraint.split('/')[0]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECTED SITE DETAILED EVALUATION DOSSIER */}
      {selected && (
        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Candidate Sector In-Depth Dossier</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-black border uppercase tracking-wider ${
                  selected.status === 'REJECTED' 
                    ? 'bg-red-100 text-red-900 border-red-300'
                    : selected.status === 'LIMITED'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}>
                  STATUS: {selected.status}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">{selected.name}</h3>
              <div className="text-xs text-slate-500">
                {selected.locationName} • Elevation: {selected.elevationMeters}m MSL (&gt;8m above Yamuna High Flood Level) • Area: {selected.areaHectares} Hectares
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Composite Suitability</span>
              <span className="text-2xl font-mono font-black text-emerald-700">{selected.suitabilityScore} / 100</span>
            </div>
          </div>

          {/* Decision Status Banner & Plain English Explanation */}
          <div className={`p-4 rounded-xl border space-y-1.5 ${
            selected.status === 'REJECTED'
              ? 'bg-red-50/80 border-red-300 text-red-950'
              : selected.status === 'LIMITED'
              ? 'bg-amber-50/80 border-amber-300 text-amber-950'
              : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {selected.status === 'REJECTED' ? (
                <XCircle className="w-4 h-4 text-red-700 shrink-0" />
              ) : selected.status === 'LIMITED' ? (
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              )}
              <span>Administrative Assessment Verdict: {selected.status}</span>
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {selected.statusReason}
            </p>
            <div className="text-[11px] pt-1 font-semibold flex items-center gap-1.5">
              <span>Primary Bottleneck:</span>
              <span className="font-bold underline">{selected.calculatedCapacity.bindingConstraint}</span>
              <span>— {selected.calculatedCapacity.bindingConstraintExplanation}</span>
            </div>
          </div>

          {/* PHYSICAL RESOURCE CAPACITY COMPARISON (6 FACTORS INCL SANITATION) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Multi-Resource Carrying Capacity Breakdown (Strict Min-Operator Applied)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Safe Cap = min(Land, Water, Sanitation, Road, Health, School)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {/* 1. Buildable Land */}
              <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                selected.calculatedCapacity.bindingConstraint === 'Buildable Land' 
                  ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-slate-600 font-bold text-[10px] uppercase">
                  <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3 text-slate-600" /> Land</span>
                  {selected.calculatedCapacity.bindingConstraint === 'Buildable Land' && (
                    <span className="text-[9px] px-1 rounded bg-amber-200 text-amber-900 font-bold">BINDING</span>
                  )}
                </div>
                <div className="font-mono text-base font-black text-slate-900">
                  {selected.calculatedCapacity.landCapacityHH} <span className="text-[10px] font-normal text-slate-500">HH</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  Net {((selected.rawConstraints.buildableLandAreaSqMeters * 0.65) / 10000).toFixed(1)} ha buildable
                </div>
              </div>

              {/* 2. Water Supply */}
              <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                selected.calculatedCapacity.bindingConstraint === 'Water Infrastructure' 
                  ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-blue-900 font-bold text-[10px] uppercase">
                  <span className="flex items-center gap-1"><Droplet className="w-3 h-3 text-blue-600" /> Water (DJB)</span>
                  {selected.calculatedCapacity.bindingConstraint === 'Water Infrastructure' && (
                    <span className="text-[9px] px-1 rounded bg-amber-200 text-amber-900 font-bold">BINDING</span>
                  )}
                </div>
                <div className="font-mono text-base font-black text-blue-950">
                  {selected.calculatedCapacity.waterCapacityHH} <span className="text-[10px] font-normal text-slate-500">HH</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {selected.rawConstraints.waterSustainableYieldLitersPerDay.toLocaleString()} L/day
                </div>
              </div>

              {/* 3. Sanitation & Wastewater (NEW) */}
              <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                selected.calculatedCapacity.bindingConstraint === 'Sanitation & Wastewater Treatment' 
                  ? 'bg-red-50 border-red-400 ring-1 ring-red-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-indigo-900 font-bold text-[10px] uppercase">
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3 text-indigo-600" /> Sanitation</span>
                  {selected.calculatedCapacity.bindingConstraint === 'Sanitation & Wastewater Treatment' && (
                    <span className="text-[9px] px-1 rounded bg-red-200 text-red-900 font-bold">BINDING</span>
                  )}
                </div>
                <div className="font-mono text-base font-black text-indigo-950">
                  {selected.calculatedCapacity.sanitationCapacityHH} <span className="text-[10px] font-normal text-slate-500">HH</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {selected.rawConstraints.sanitationFacilityName.split('(')[0]}
                </div>
              </div>

              {/* 4. Road Access */}
              <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                selected.calculatedCapacity.bindingConstraint === 'Road Access / Evacuation Width' 
                  ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-slate-800 font-bold text-[10px] uppercase">
                  <span className="flex items-center gap-1"><Road className="w-3 h-3 text-slate-700" /> Road RoW</span>
                  {selected.calculatedCapacity.bindingConstraint === 'Road Access / Evacuation Width' && (
                    <span className="text-[9px] px-1 rounded bg-amber-200 text-amber-900 font-bold">BINDING</span>
                  )}
                </div>
                <div className="font-mono text-base font-black text-slate-900">
                  {selected.calculatedCapacity.roadCapacityHH} <span className="text-[10px] font-normal text-slate-500">HH</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {selected.rawConstraints.roadWidthMeters}m RoW width
                </div>
              </div>

              {/* 5. Healthcare */}
              <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                selected.calculatedCapacity.bindingConstraint === 'Healthcare Capacity' 
                  ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-rose-900 font-bold text-[10px] uppercase">
                  <span className="flex items-center gap-1"><HeartPulse className="w-3 h-3 text-rose-600" /> Health</span>
                  {selected.calculatedCapacity.bindingConstraint === 'Healthcare Capacity' && (
                    <span className="text-[9px] px-1 rounded bg-amber-200 text-amber-900 font-bold">BINDING</span>
                  )}
                </div>
                <div className="font-mono text-base font-black text-rose-950">
                  {selected.calculatedCapacity.healthCapacityHH} <span className="text-[10px] font-normal text-slate-500">HH</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {selected.rawConstraints.healthcareFacilityName.split('(')[0]}
                </div>
              </div>

              {/* 6. Schools */}
              <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                selected.calculatedCapacity.bindingConstraint === 'School & Educational Capacity' 
                  ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-amber-900 font-bold text-[10px] uppercase">
                  <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3 text-amber-600" /> Schools</span>
                  {selected.calculatedCapacity.bindingConstraint === 'School & Educational Capacity' && (
                    <span className="text-[9px] px-1 rounded bg-amber-200 text-amber-900 font-bold">BINDING</span>
                  )}
                </div>
                <div className="font-mono text-base font-black text-amber-950">
                  {selected.calculatedCapacity.schoolCapacityHH} <span className="text-[10px] font-normal text-slate-500">HH</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {selected.rawConstraints.schoolName.split('(')[0]}
                </div>
              </div>
            </div>
          </div>

          {/* SETTLEMENT RELOCATION FEASIBILITY SIMULATOR */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-blue-700" />
                Settlement Relocation Feasibility Simulator
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Evaluate against:</span>
                <select
                  value={evalSettlementId}
                  onChange={(e) => setEvalSettlementId(e.target.value)}
                  className="px-2 py-1 rounded bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {SETTLEMENTS_DATA.map(st => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.households} HH)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs text-slate-600">
                  Target Habitation: <b className="text-slate-900">{evalSettlement.name}</b> • Required Quota: <b className="text-blue-900 font-mono">{neededHH} HH</b> ({evalSettlement.population} pop)
                </div>
                <div className="text-xs text-slate-600">
                  Candidate Site: <b className="text-slate-900">{selected.name.split('—')[0]}</b> • Safe Absorption Capacity: <b className="text-emerald-900 font-mono">{safeCap} HH</b>
                </div>
                <div className="text-xs text-slate-700 pt-0.5">
                  <span className="font-bold">Verdict:</span> {relocationStatusText}
                </div>
              </div>

              <div className="shrink-0">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider border shadow-2xs inline-block ${relocationStatusBadge}`}>
                  {isSiteRejectedIntrinsically || hasCapacityDeficit ? 'REJECTED FOR THIS QUOTA' : selected.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DATA CONFIDENCE & QUALITY SECTION */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span className="font-bold text-slate-900">Site Cadastral & Infrastructure Confidence:</span>
          <span className="font-mono text-emerald-800 font-bold">{DATA_CONFIDENCE_METRICS.overallConfidencePct}% Assured</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">Cross-verified against DDA Master Plan 2041, DJB WTP registers & PWD Road Right-of-Way</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Last Updated: 2026 Baseline
        </div>
      </div>
    </div>
  );
};
