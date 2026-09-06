import React from 'react';
import { FileCheck, ShieldAlert, AlertTriangle, Printer } from 'lucide-react';
import { Settlement, CandidateSite, AllocationAssignment } from '../../types';

interface RecommendationsModuleProps {
  settlements: Settlement[];
  candidateSites: CandidateSite[];
  assignments: AllocationAssignment[];
  onOpenReportModal: () => void;
}

export const RecommendationsModule: React.FC<RecommendationsModuleProps> = ({
  onOpenReportModal,
}) => {
  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-4 rounded-xl bg-gov-card border border-gov-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            <span>Executive Relocation Directives</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1">
            Government Decision Recommendations Briefing
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl mt-1">
            Formally generated administrative relocation brief for the District Disaster Management Authority (DDMA Wayanad) and KSDMA High Powered Committee.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-950 shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export DDMA Official Brief</span>
        </button>
      </div>

      {/* Official Executive Directive Card */}
      <div className="p-5 rounded-xl bg-gov-surface border border-gov-border space-y-4 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-gov-border">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              OFFICIAL DECISION BRIEF • KSDMA/RELOC/2026/041
            </span>
            <h3 className="text-base font-extrabold text-white mt-0.5">
              Recommended Action: Mandate Phased Permanent Relocation of 5 Meppadi Habitations
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono font-bold text-xs">
            CONFIDENCE: 94.2% (GRADE A)
          </span>
        </div>

        {/* Priority 1 Highlight Box: Mundakkai to Site Alpha */}
        <div className="p-4 rounded-lg bg-slate-900/90 border border-red-900/60 space-y-2">
          <div className="flex items-center justify-between font-bold text-xs">
            <span className="text-red-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              DIRECTIVE 1 (URGENT): Relocate Mundakkai (355 HH / 1,420 Pop) ➔ Site Alpha (Kalpetta East)
            </span>
            <span className="text-emerald-400 font-mono">18.4 km / ~46 min transit</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <b>Primary Rationale:</b> 100% overlap with statutory Red Zone v2.0; GSI post-disaster survey confirms irrecoverable crown detachment; Site Alpha possesses high suitability (86/100) and zero debris flow threat. Site Alpha's capacity of 340 HH accommodates the initial phase, with balance absorbed in contiguous extension.
          </p>
          <div className="text-[11px] text-slate-400 flex items-center gap-4 pt-1">
            <span>• Alternatives Rejected: Site Gamma (too distant: 22.8 km); Site Beta (assigned to Chooralmala).</span>
            <span>• Bottleneck Watch: Water availability requires PHED pipeline augmentation.</span>
          </div>
        </div>

        {/* Priority 2 Highlight Box: Chooralmala to Site Beta */}
        <div className="p-4 rounded-lg bg-slate-900/90 border border-orange-900/60 space-y-2">
          <div className="flex items-center justify-between font-bold text-xs">
            <span className="text-orange-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              DIRECTIVE 2 (URGENT): Relocate Chooralmala (465 HH / 1,860 Pop) ➔ Site Beta (Nedumbala Terraces)
            </span>
            <span className="text-emerald-400 font-mono">11.8 km / ~32 min transit</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <b>Primary Rationale:</b> Severe riverbed lateral widening (45m) and commercial zone obliteration; Site Beta is only 11.8 km away, minimizing livelihood disruption for tea plantation workers while providing 490 HH safe capacity.
          </p>
          <div className="text-[11px] text-slate-400 flex items-center gap-4 pt-1">
            <span>• Alternatives Rejected: Site Alpha (insufficient remaining headroom).</span>
            <span>• Bottleneck Watch: PWD single-lane bridge widening required.</span>
          </div>
        </div>

        {/* Statutory Legal Disclaimer */}
        <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <b>Statutory Notice:</b> This platform is an automated decision-support system designed for risk modeling, capacity sizing, and spatial optimization. Final resettlement, land acquisition, and de-notification orders require field survey verification, socio-economic impact assessment (SIA), and statutory approval by the Competent Authority under the Disaster Management Act 2005.
          </p>
        </div>
      </div>
    </div>
  );
};
