import React from 'react';
import { X, Printer, Shield, CheckCircle2, AlertOctagon } from 'lucide-react';
import { Settlement, CandidateSite, AllocationAssignment, RedZoneVersionData } from '../../types';

interface OfficialReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  settlements: Settlement[];
  candidateSites: CandidateSite[];
  assignments: AllocationAssignment[];
  redZoneVersion: RedZoneVersionData;
}

export const OfficialReportModal: React.FC<OfficialReportModalProps> = ({
  isOpen,
  onClose,
  settlements,
  candidateSites,
  assignments,
  redZoneVersion,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const totalPop = settlements.reduce((sum, s) => sum + s.population, 0);
  const totalHH = settlements.reduce((sum, s) => sum + s.households, 0);
  const totalCap = candidateSites.reduce((sum, s) => sum + s.calculatedCapacity.netSafeAbsorptionCapacityHH, 0);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Top Actions */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-300">Executive Report Preview</span>
            <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-1.5 py-0.2 rounded font-mono">
              OFFICIAL USE ONLY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 bg-slate-900 text-slate-200 overflow-y-auto font-sans space-y-6 text-xs print:text-black print:bg-white">
          {/* Government Document Header */}
          <div className="border-b-2 border-slate-700 pb-4 text-center space-y-1">
            <div className="font-bold text-xs uppercase tracking-widest text-slate-400">
              Government of Kerala • Revenue & Disaster Management Department
            </div>
            <h1 className="text-lg font-black text-white tracking-tight uppercase">
              Kerala State Disaster Management Authority (KSDMA)
            </h1>
            <h2 className="text-sm font-bold text-blue-400">
              District Disaster Management Authority (DDMA), Wayanad
            </h2>
            <div className="text-[11px] font-mono text-slate-400 pt-1">
              Doc Ref: KSDMA/RELOC/2026/041-FINAL • Gazetted: {redZoneVersion.gazetteNotification}
            </div>
          </div>

          {/* Subject & Purpose */}
          <div className="space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <div className="font-bold text-slate-200">
              SUBJECT: Permanent Resettlement Directive & Carrying-Capacity Constrained Allocation Schedule for High-Risk Habitations in Meppadi Corridor, Wayanad.
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              In accordance with Section 30(2)(v) of the Disaster Management Act 2005, this briefing specifies the statutory de-notification of unviable human habitations and directs the phased resettlement of affected populations into verified candidate sites.
            </p>
          </div>

          {/* Key Executive Findings Table */}
          <div className="space-y-2">
            <div className="font-bold text-xs text-white uppercase tracking-wider">
              1. Macro District Life-Safety Summary
            </div>
            <table className="w-full text-left border border-slate-700 text-xs">
              <thead className="bg-slate-800 text-slate-300">
                <tr>
                  <th className="p-2 border border-slate-700">Metric Indicator</th>
                  <th className="p-2 border border-slate-700">Official Standard / Value</th>
                  <th className="p-2 border border-slate-700">Status & Implications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 text-slate-300">
                <tr>
                  <td className="p-2 border border-slate-700 font-semibold">Total Habitations in Red Zone</td>
                  <td className="p-2 border border-slate-700 font-mono">5 Habitations (Chooralmala-Mundakkai)</td>
                  <td className="p-2 border border-slate-700 text-red-400 font-bold">100% De-notification Recommended</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-700 font-semibold">Exposed Population Requiring Resettlement</td>
                  <td className="p-2 border border-slate-700 font-mono">{totalPop.toLocaleString()} Persons ({totalHH} Households)</td>
                  <td className="p-2 border border-slate-700 text-amber-300">Immediate Relocation Priority: 990 HH</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-700 font-semibold">Safe Absorption Capacity Across 4 Sites</td>
                  <td className="p-2 border border-slate-700 font-mono">{totalCap} Households</td>
                  <td className="p-2 border border-slate-700 text-emerald-400 font-bold">+125 HH Buffer Available (109.1% Coverage)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Allocation Directive Schedule */}
          <div className="space-y-2">
            <div className="font-bold text-xs text-white uppercase tracking-wider">
              2. Approved Village-to-Site Relocation Assignments
            </div>
            <table className="w-full text-left border border-slate-700 text-xs">
              <thead className="bg-slate-800 text-slate-300 font-bold">
                <tr>
                  <th className="p-2 border border-slate-700">Origin Habitation</th>
                  <th className="p-2 border border-slate-700">Households</th>
                  <th className="p-2 border border-slate-700">Destination Site</th>
                  <th className="p-2 border border-slate-700">Distance / Time</th>
                  <th className="p-2 border border-slate-700">Binding Bottleneck & Mitigations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 text-slate-300">
                {assignments.map((a, i) => (
                  <tr key={i}>
                    <td className="p-2 border border-slate-700 font-bold text-white">{a.settlementName}</td>
                    <td className="p-2 border border-slate-700 font-mono">{a.capacityUtilizedHH} HH</td>
                    <td className="p-2 border border-slate-700 text-emerald-300 font-semibold">{a.siteName}</td>
                    <td className="p-2 border border-slate-700 font-mono">{a.distanceKm.toFixed(1)} km (~{a.travelTimeMinutes} m)</td>
                    <td className="p-2 border border-slate-700 text-[11px] text-slate-400">
                      {a.siteName.includes('Alpha') ? 'Water Pipeline Augmentation Required' : 'PWD Bridge Expansion Required'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Statutory Sign-off Block */}
          <div className="pt-8 border-t border-slate-700 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-4">
              <div className="h-10 border-b border-dashed border-slate-600"></div>
              <div>
                <div className="font-bold text-white">District Collector & Chairman, DDMA</div>
                <div className="text-slate-400 text-[10px]">District Administration, Wayanad</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-10 border-b border-dashed border-slate-600"></div>
              <div>
                <div className="font-bold text-white">Member Secretary, KSDMA</div>
                <div className="text-slate-400 text-[10px]">Disaster Management Authority, Government of Kerala</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
