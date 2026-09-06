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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-slate-300 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Top Actions */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-800">DDMA Executive Report Preview</span>
            <span className="text-[10px] bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono font-bold">
              OFFICIAL USE ONLY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 bg-white text-slate-800 overflow-y-auto font-sans space-y-6 text-xs print:text-black print:p-0">
          {/* Government Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <div className="font-bold text-xs uppercase tracking-widest text-slate-600">
              Government of National Capital Territory of Delhi • Revenue Department
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight uppercase">
              Delhi Disaster Management Authority (DDMA)
            </h1>
            <h2 className="text-sm font-bold text-blue-900">
              Office of the District Magistrate & Chairman DDMA (East Delhi District)
            </h2>
            <div className="text-[11px] font-mono text-slate-500 pt-1">
              Doc Ref: DDMA/DEL/RELOC/2025/041-FINAL • Gazetted: {redZoneVersion.gazetteNotification}
            </div>
          </div>

          {/* Subject & Purpose */}
          <div className="space-y-1 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-900">
              SUBJECT: Permanent Resettlement Directive & Carrying-Capacity Constrained Allocation Schedule for High-Risk Yamuna Floodplain Habitations in East Delhi.
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              In accordance with Section 30(2)(v) of the Disaster Management Act 2005 read with National Green Tribunal orders, this briefing specifies the statutory de-notification of unviable human habitations in the active Yamuna riverbed and directs the planned resettlement of affected populations into verified non-floodplain parcels (including the Surajmal Vihar / USAR Institutional Extension).
            </p>
          </div>

          {/* Key Executive Findings Table */}
          <div className="space-y-2">
            <div className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              1. Macro Flood Vulnerability & Capacity Summary
            </div>
            <table className="w-full text-left border border-slate-300 text-xs">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-2 border border-slate-300">Metric Indicator</th>
                  <th className="p-2 border border-slate-300">Official Standard / Value</th>
                  <th className="p-2 border border-slate-300">Status & Implications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 text-slate-800">
                <tr>
                  <td className="p-2 border border-slate-300 font-semibold">Total Habitations in Red Zone</td>
                  <td className="p-2 border border-slate-300 font-mono">5 Habitations (Yamuna Khadar Corridor)</td>
                  <td className="p-2 border border-slate-300 text-red-700 font-bold">100% De-notification Recommended</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-300 font-semibold">Exposed Population Requiring Resettlement</td>
                  <td className="p-2 border border-slate-300 font-mono">{totalPop.toLocaleString()} Persons ({totalHH.toLocaleString()} Households)</td>
                  <td className="p-2 border border-slate-300 text-amber-800 font-semibold">Immediate Relocation Priority: 1,722 HH</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-300 font-semibold">Safe Absorption Capacity Across 4 Sectors</td>
                  <td className="p-2 border border-slate-300 font-mono">{totalCap.toLocaleString()} Households</td>
                  <td className="p-2 border border-slate-300 text-emerald-700 font-bold">+2 HH Buffer Available (100.1% Coverage)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Allocation Directive Schedule */}
          <div className="space-y-2">
            <div className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              2. Approved Floodplain-to-Sector Resettlement Allocations
            </div>
            <table className="w-full text-left border border-slate-300 text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="p-2 border border-slate-300">Origin Habitation</th>
                  <th className="p-2 border border-slate-300">Households</th>
                  <th className="p-2 border border-slate-300">Destination Sector</th>
                  <th className="p-2 border border-slate-300">Distance / Time</th>
                  <th className="p-2 border border-slate-300">Binding Bottleneck & Infrastructure Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 text-slate-800">
                {assignments.map((a, i) => (
                  <tr key={i}>
                    <td className="p-2 border border-slate-300 font-bold text-slate-900">{a.settlementName}</td>
                    <td className="p-2 border border-slate-300 font-mono">{a.capacityUtilizedHH.toLocaleString()} HH</td>
                    <td className="p-2 border border-slate-300 text-emerald-800 font-semibold">{a.siteName}</td>
                    <td className="p-2 border border-slate-300 font-mono">{a.distanceKm.toFixed(1)} km (~{a.travelTimeMinutes} m)</td>
                    <td className="p-2 border border-slate-300 text-[11px] text-slate-600">
                      {a.siteName.includes('Alpha') ? 'Delhi Jal Board Pipeline Augmentation Required' : 'PWD Bridge Expansion Required'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Statutory Sign-off Block */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-4">
              <div className="h-10 border-b border-dashed border-slate-400"></div>
              <div>
                <div className="font-bold text-slate-900">District Magistrate & Chairman, DDMA</div>
                <div className="text-slate-500 text-[10px]">District Administration, East Delhi</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-10 border-b border-dashed border-slate-400"></div>
              <div>
                <div className="font-bold text-slate-900">Divisional Commissioner & Member Secretary</div>
                <div className="text-slate-500 text-[10px]">Delhi Disaster Management Authority, Govt of NCT of Delhi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
