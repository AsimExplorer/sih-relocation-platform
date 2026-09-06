import React from 'react';
import { X, Printer, Shield, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { Settlement, CandidateSite, AllocationAssignment, RedZoneVersionData } from '../../types';

interface OfficialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  settlements: Settlement[];
  candidateSites: CandidateSite[];
  assignments: AllocationAssignment[];
  redZoneVersion?: RedZoneVersionData;
}

export const OfficialReportModal: React.FC<OfficialReportModalProps> = ({
  isOpen,
  onClose,
  settlements,
  candidateSites,
  assignments,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-900" />
            <h3 className="font-bold text-sm text-slate-900">
              SURAKSHA Official Resettlement Briefing Dossier • DDMA East Delhi
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-6 space-y-6 text-xs text-slate-800">
          {/* Header Seal */}
          <div className="text-center pb-4 border-b border-slate-300 space-y-1">
            <div className="font-bold uppercase tracking-widest text-[11px] text-blue-950">
              GOVERNMENT OF NCT OF DELHI • DELHI DISASTER MANAGEMENT AUTHORITY (DDMA)
            </div>
            <h2 className="text-lg font-black text-slate-950">
              STATUTORY HABITATIONAL CONDEMNATION & PERMANENT RESETTLEMENT DIRECTIVE
            </h2>
            <div className="text-[11px] font-mono text-slate-500">
              Doc No: DDMA/DEL/SURAKSHA/2026/GZ-041 • Date: 15 January 2026 • Mandate: DM Act 2005 Sec 30(2)
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase text-slate-900 text-xs tracking-wider border-b border-slate-200 pb-1">
              1. Statutory Findings & Habitational Condemnation
            </h4>
            <p className="leading-relaxed text-slate-700">
              Following the unprecedented July 2023 flood surge (208.66m MSL at Old Railway Bridge) and Central Water Commission hydrological modeling, 5 vulnerable habitations in the East Delhi Yamuna riverbed have been categorized under <b>Permanent Unsuitability Red Zone</b>. Continued human habitation constitutes an unacceptable peril to life and violates National Green Tribunal (NGT) riverbed conservation rulings.
            </p>
          </div>

          {/* Section 2: Allocation & Carrying Capacity Schedule */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase text-slate-900 text-xs tracking-wider border-b border-slate-200 pb-1">
              2. Certified Allocation & Bottleneck-Constrained Resettlement Schedule
            </h4>
            <table className="w-full text-left border border-slate-300">
              <thead className="bg-slate-100 text-slate-700 uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-b">Settlement (Origin)</th>
                  <th className="p-2 border-b">Population / HH</th>
                  <th className="p-2 border-b">Assigned Candidate Site</th>
                  <th className="p-2 border-b">Safe Cap (HH)</th>
                  <th className="p-2 border-b">Limiting Bottleneck</th>
                  <th className="p-2 border-b">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {assignments.map((a, i) => (
                  <tr key={i}>
                    <td className="p-2 font-bold text-slate-900">{a.settlementName}</td>
                    <td className="p-2 font-mono">{a.population} ({a.households} HH)</td>
                    <td className="p-2 font-bold text-blue-900">{a.siteName.split('—')[0]}</td>
                    <td className="p-2 font-mono">{a.capacityTotalHH} HH</td>
                    <td className="p-2 text-amber-900 font-semibold text-[11px]">{a.bindingConstraint}</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                        FEASIBLE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Rejection Log of Disqualified Sites */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase text-slate-900 text-xs tracking-wider border-b border-slate-200 pb-1">
              3. Site Rejection Log (Disqualified Parcels & Bottleneck Grounds)
            </h4>
            <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
              <li>
                <b>Site Epsilon (Geeta Colony Lowland Swale): REJECTED.</b> Severe sewage treatment overload (134% trunk saturation) and 50-year secondary backwater risks violate NGT standards.
              </li>
              <li>
                <b>Site Gamma (Anand Vihar): REJECTED for Yamuna Khadar (770 HH).</b> Capacity capped at 490 HH due to local UDISE+ school classroom seat ceilings.
              </li>
              <li>
                <b>Site Delta (Bakkarwala): LIMITED.</b> Capacity restricted to 560 HH due to Primary Health Centre patient roster limits under NHM ratios.
              </li>
            </ul>
          </div>

          {/* Signature Sign-Off Block */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-6">
              <div className="font-mono text-slate-400">Digitally Verified via NIC e-Sign</div>
              <div>
                <div className="font-bold text-slate-900">District Magistrate / DDMA Chairman</div>
                <div className="text-[11px] text-slate-500">District East Delhi, Govt of NCT of Delhi</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="font-mono text-slate-400">SURAKSHA Mathematical Solver Engine v2.6</div>
              <div>
                <div className="font-bold text-slate-900">Chief Executive Officer, DDMA</div>
                <div className="text-[11px] text-slate-500">State Disaster Management Authority</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
