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
      <div className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>Executive Relocation Directives</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            DDMA Decision Recommendations Briefing
          </h2>
          <p className="text-xs text-slate-600 max-w-3xl mt-1">
            Formally generated administrative relocation brief for the District Disaster Management Authority (DDMA East Delhi) and the State Level Committee, Government of NCT of Delhi.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export DDMA Official Brief</span>
        </button>
      </div>

      {/* Official Executive Directive Card */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
              OFFICIAL DECISION BRIEF • DDMA/DEL/RELOC/2025/041
            </span>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
              Recommended Action: Mandate Phased Permanent Relocation of 5 East Delhi Floodplain Habitations
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-xs">
            CONFIDENCE: 95.4% (GRADE A)
          </span>
        </div>

        {/* Priority 1 Highlight Box: Yamuna Khadar to Site Alpha */}
        <div className="p-4 rounded-lg bg-slate-50 border border-red-200 space-y-2">
          <div className="flex items-center justify-between font-bold text-xs">
            <span className="text-red-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              DIRECTIVE 1 (URGENT): Relocate Yamuna Khadar East (770 HH / 3,850 Pop) ➔ Site Alpha (Karkardooma / USAR Hub)
            </span>
            <span className="text-emerald-800 font-mono">5.2 km / ~18 min transit</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            <b>Primary Rationale:</b> 100% overlap with statutory Red Zone (NGT Riverbed 'O' Zone); 208.66m flood level in July 2023 submerged all 620 dwellings; Site Alpha possesses high suitability (88/100) and zero flood risk. Site Alpha's capacity of 620 HH accommodates the initial phase, with balance absorbed in contiguous Bakkarwala extension.
          </p>
          <div className="text-[11px] text-slate-500 flex items-center gap-4 pt-1">
            <span>• Alternatives Rejected: Site Beta (assigned to Garhi Mandu); Site Gamma (school desk deficit).</span>
            <span>• Bottleneck Watch: Delhi Jal Board Bhagirathi WTP feeder line augmentation recommended.</span>
          </div>
        </div>

        {/* Priority 2 Highlight Box: Garhi Mandu to Site Beta */}
        <div className="p-4 rounded-lg bg-slate-50 border border-orange-200 space-y-2">
          <div className="flex items-center justify-between font-bold text-xs">
            <span className="text-orange-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-orange-600" />
              DIRECTIVE 2 (URGENT): Relocate Garhi Mandu (588 HH / 2,940 Pop) ➔ Site Beta (Mandoli Resettlement Sector)
            </span>
            <span className="text-emerald-800 font-mono">6.2 km / ~22 min transit</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            <b>Primary Rationale:</b> Unbunded marshy swale facing direct Hathnikund surge runoff; Site Beta is only 6.2 km away via Wazirabad corridor, minimizing livelihood disruption for workers while providing 780 HH safe capacity.
          </p>
          <div className="text-[11px] text-slate-500 flex items-center gap-4 pt-1">
            <span>• Alternatives Rejected: Site Alpha (insufficient remaining headroom).</span>
            <span>• Bottleneck Watch: PWD bridge widening required across rail spur.</span>
          </div>
        </div>

        {/* Statutory Legal Disclaimer */}
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <b>Statutory Notice:</b> This platform is an automated decision-support system designed for flood risk modeling, carrying-capacity sizing, and spatial allocation. Final resettlement, land allotment, and de-notification orders require field survey verification, socio-economic impact assessment (SIA), and statutory approval by the Competent Authority under the Disaster Management Act 2005.
          </p>
        </div>
      </div>
    </div>
  );
};
