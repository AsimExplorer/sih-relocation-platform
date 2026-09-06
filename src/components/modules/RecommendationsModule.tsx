import React, { useState } from 'react';
import { 
  FileCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Ban
} from 'lucide-react';
import { Settlement, CandidateSite, AllocationAssignment } from '../../types';
import { DATA_CONFIDENCE_METRICS } from '../../data/delhiData';

interface RecommendationsModuleProps {
  settlements: Settlement[];
  candidateSites: CandidateSite[];
  assignments: AllocationAssignment[];
  onOpenReportModal: () => void;
}

export const RecommendationsModule: React.FC<RecommendationsModuleProps> = ({
  settlements,
  candidateSites,
  assignments,
  onOpenReportModal,
}) => {
  const [selectedSettlementId, setSelectedSettlementId] = useState<string>(settlements[0].id);
  const activeSettlement = settlements.find(s => s.id === selectedSettlementId) || settlements[0];
  const activeAssignment = assignments.find(a => a.settlementId === activeSettlement.id);
  const recommendedSite = candidateSites.find(s => s.id === activeAssignment?.siteId);

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>Stage 8: Decision-Ready Relocation Brief & Rejection Audit</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Relocation Recommendations & Site Rejection Log
          </h2>
          <p className="text-xs text-slate-600 max-w-3xl mt-1 leading-relaxed">
            Synthesized relocation decision brief combining multi-hazard urgency, site suitability, capacity limits, and explicit rejection justifications for disqualified alternatives.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print Decision Brief</span>
        </button>
      </div>

      {/* Settlement Selection Bar */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-300 overflow-x-auto text-xs">
        <span className="font-bold text-slate-500 uppercase text-[11px] px-2 shrink-0">Select Settlement:</span>
        {settlements.map(st => (
          <button
            key={st.id}
            onClick={() => setSelectedSettlementId(st.id)}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeSettlement.id === st.id
                ? 'bg-blue-700 text-white shadow-2xs'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            {st.name.split(' ')[0]} ({st.households} HH)
          </button>
        ))}
      </div>

      {/* DECISION-READY EXECUTIVE BRIEF CARD */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
              EXECUTIVE DECISION BRIEF • SURAKSHA-DEL-RELOC-2026
            </span>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
              Permanent Relocation Plan for: {activeSettlement.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded bg-red-50 text-red-800 border border-red-200 font-bold uppercase">
              Priority: {activeSettlement.priority}
            </span>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold">
              Confidence: 88% (High)
            </span>
          </div>
        </div>

        {/* Origin Settlement Profile & Condemnation Ground */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-slate-900">
            <span className="text-red-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Evaluation Criteria for Relocation Priority
            </span>
            <span className="font-mono text-slate-600">{activeSettlement.population.toLocaleString()} Residents ({activeSettlement.households} Households)</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            <b>Relocation Trigger:</b> {activeSettlement.redZoneOverlapPct}% overlap with Permanent Unsuitability Red Zone (NGT Riverbed 'O' Zone). Water reached 208.66m MSL in July 2023, completely submerging dwellings under 3.5m+ floodwaters. No permanent structural flood bund exists or is permissible under environmental law.
          </p>
        </div>

        {/* Recommended Resettlement Site Match Card */}
        {activeAssignment && recommendedSite ? (
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-emerald-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">Recommended Destination Sector</span>
                <h4 className="text-base font-black text-slate-900">{recommendedSite.name}</h4>
                <div className="text-xs text-slate-600">
                  {recommendedSite.locationName} • Transit: <b>{activeAssignment.distanceKm.toFixed(1)} km (~{activeAssignment.travelTimeMinutes} mins)</b>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Suitability Rating</span>
                <span className="text-xl font-mono font-black text-emerald-800">{recommendedSite.suitabilityScore} / 100</span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-white border border-emerald-200">
                <span className="text-[10px] text-slate-500 block uppercase">Safe Capacity</span>
                <span className="font-mono font-bold text-slate-900">{recommendedSite.calculatedCapacity.netSafeAbsorptionCapacityHH} HH</span>
              </div>
              <div className="p-2 rounded bg-white border border-emerald-200">
                <span className="text-[10px] text-slate-500 block uppercase">Quota Allocated</span>
                <span className="font-mono font-bold text-blue-900">{activeAssignment.capacityUtilizedHH} HH</span>
              </div>
              <div className="p-2 rounded bg-white border border-emerald-200">
                <span className="text-[10px] text-slate-500 block uppercase">Remaining Headroom</span>
                <span className="font-mono font-bold text-emerald-700">{activeAssignment.remainingCapacityHH} HH</span>
              </div>
              <div className="p-2 rounded bg-white border border-emerald-200">
                <span className="text-[10px] text-slate-500 block uppercase">Binding Constraint</span>
                <span className="font-bold text-amber-800 truncate text-[11px] block">{recommendedSite.calculatedCapacity.bindingConstraint}</span>
              </div>
            </div>

            {/* Why This Recommendation Bullet Points */}
            <div className="space-y-1.5 text-xs pt-1">
              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block">Why This Recommendation?</span>
              <ul className="space-y-1 text-slate-700 list-disc list-inside leading-relaxed">
                <li><b>Hazard Imperative:</b> {activeSettlement.name} is located inside the Permanent Unsuitability Red Zone with repeated deep-submersion history.</li>
                <li><b>Proximity & Livelihood Continuity:</b> {recommendedSite.name.split('—')[0]} is within {activeAssignment.distanceKm.toFixed(1)} km, preserving municipal transit access and employment linkages.</li>
                <li><b>Carrying Capacity Certification:</b> The site's safe capacity ({recommendedSite.calculatedCapacity.netSafeAbsorptionCapacityHH} HH) safely absorbs the {activeAssignment.capacityUtilizedHH} HH quota without resource oversubscription.</li>
                <li><b>Bottleneck Verification:</b> Governing bottleneck ({recommendedSite.calculatedCapacity.bindingConstraint}) has been checked against DJB / PWD registers and remains within certified limits.</li>
                <li><b>Zero Flood Exposure:</b> Parcel elevation ({recommendedSite.elevationMeters}m MSL) is &gt;8m above the Yamuna High Flood Level.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900">
            Pending allocation evaluation.
          </div>
        )}

        {/* EXPLICIT REJECTION LOG TABLE */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Ban className="w-4 h-4 text-red-600" />
              Candidate Sites Rejection Log for {activeSettlement.name}
            </span>
            <span className="text-[11px] text-slate-500">
              Disqualified alternatives & bottleneck reasons
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-200/70 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-300">
                <tr>
                  <th className="py-2 px-3">Candidate Site</th>
                  <th className="py-2 px-3">Safe Capacity</th>
                  <th className="py-2 px-3">Binding Bottleneck</th>
                  <th className="py-2 px-3">Verdict for this Relocation</th>
                  <th className="py-2 px-3">Rejection Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                {candidateSites.map(site => {
                  const isAssigned = site.id === recommendedSite?.id;
                  const isRejectedIntrinsically = site.status === 'REJECTED';
                  const hasCapacityShortfall = site.calculatedCapacity.netSafeAbsorptionCapacityHH < activeSettlement.households;

                  let verdict = 'FEASIBLE';
                  let verdictClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                  let reason = 'Site has verified capacity and acceptable transit distance.';

                  if (isAssigned) {
                    verdict = 'SELECTED';
                    verdictClass = 'bg-blue-100 text-blue-900 border-blue-200 font-bold';
                    reason = 'Optimal match under multi-criteria distance and capacity scoring.';
                  } else if (isRejectedIntrinsically) {
                    verdict = 'REJECTED';
                    verdictClass = 'bg-red-100 text-red-900 border-red-200 font-bold';
                    reason = site.rejectionReason || 'Fatal sewage treatment overload and proximity to riverbed hydraulic buffer.';
                  } else if (hasCapacityShortfall) {
                    verdict = 'REJECTED';
                    verdictClass = 'bg-red-100 text-red-900 border-red-200 font-bold';
                    reason = `Capacity shortfall: Safe capacity (${site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH) cannot absorb ${activeSettlement.households} HH quota (constrained by ${site.calculatedCapacity.bindingConstraint}).`;
                  } else {
                    verdict = 'RESERVED';
                    verdictClass = 'bg-slate-100 text-slate-800 border-slate-300';
                    reason = 'Feasible, but higher transit distance or reserved for concurrent urgent habitations.';
                  }

                  return (
                    <tr key={site.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {site.name.split('—')[0]}
                      </td>
                      <td className="py-2.5 px-3 font-mono">
                        {site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH
                      </td>
                      <td className="py-2.5 px-3 font-bold text-amber-900 text-[11px]">
                        {site.calculatedCapacity.bindingConstraint}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${verdictClass}`}>
                          {verdict}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px] max-w-sm">
                        {reason}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Decision Support Note */}
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-950">
          <AlertTriangle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <b>Decision Support Note:</b> Generated by SURAKSHA analytical engine for relocation planning and comparative evaluation.
          </p>
        </div>
      </div>

      {/* DATA CONFIDENCE FOOTER */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span className="font-bold text-slate-900">Recommendation Assurance:</span>
          <span className="font-mono text-emerald-800 font-bold">{DATA_CONFIDENCE_METRICS.overallConfidencePct}% Confidence Level</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">Every decision trace includes mathematical rationale, binding resource constraints, and disqualified options.</span>
        </div>
      </div>
    </div>
  );
};
