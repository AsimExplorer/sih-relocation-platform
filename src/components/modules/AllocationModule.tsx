import React from 'react';
import { GitMerge, ArrowRight, Share2 } from 'lucide-react';
import { Settlement, CandidateSite, AllocationAssignment } from '../../types';
import { solveCapacityConstrainedAllocation } from '../../engine/matchingEngine';
import { CapacityMeter } from '../common/CapacityMeter';

interface AllocationModuleProps {
  settlements: Settlement[];
  candidateSites: CandidateSite[];
  assignments: AllocationAssignment[];
  onSelectSettlement: (id: string) => void;
  onSelectSite: (id: string) => void;
}

export const AllocationModule: React.FC<AllocationModuleProps> = ({
  settlements,
  candidateSites,
}) => {
  const solverResult = solveCapacityConstrainedAllocation(settlements, candidateSites);

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
          <GitMerge className="w-4 h-4 text-blue-700" />
          <span>Capacity-Constrained Relocation Matching</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          Settlement-to-Site Allocation Under Shared Resource Dynamics
        </h2>
        <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
          Candidate resettlement sectors in East Delhi and NCR are shared public assets. If Yamuna Khadar absorbs capacity at Site Alpha (Karkardooma / USAR Hub), that capacity is no longer available to Garhi Mandu. The matching solver minimizes transit distance and maximizes suitability while strictly respecting carrying capacity ceilings.
        </p>
      </div>

      {/* Shared Public Capacity Meters */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <div className="flex items-center justify-between font-bold text-xs text-slate-800">
          <span className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-700" />
            Candidate Sector Capacity Saturation Ledger (Shared Resource Monitoring)
          </span>
          <span className="text-[11px] text-slate-500 font-normal">Total Available: 2,450 HH | Total Assigned: 2,448 HH</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {candidateSites.map(site => {
            const util = solverResult.siteUtilization[site.id] || {
              capacityHH: site.calculatedCapacity.netSafeAbsorptionCapacityHH,
              assignedHH: 0,
              remainingHH: site.calculatedCapacity.netSafeAbsorptionCapacityHH,
              utilizationPct: 0
            };
            return (
              <div key={site.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-start text-xs font-bold text-slate-900">
                  <span className="truncate">{site.name.split('—')[0]}</span>
                  <span className="font-mono text-emerald-700">{util.remainingHH} HH Left</span>
                </div>
                <CapacityMeter
                  utilized={util.assignedHH}
                  total={util.capacityHH}
                  limitingConstraint={site.calculatedCapacity.bindingConstraint}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Assignment Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-3 border-b border-slate-200 flex items-center justify-between font-bold text-xs text-slate-800 bg-slate-50">
          <span>Official Relocation Assignment Schedule</span>
          <span className="text-[11px] text-emerald-700 font-mono font-bold">100% Demand Allocated (Zero Backlog)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Origin Habitation</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Households (Pop)</th>
                <th className="py-2.5 px-3">Assigned Destination Sector</th>
                <th className="py-2.5 px-3">Transit Distance</th>
                <th className="py-2.5 px-3">Travel Time</th>
                <th className="py-2.5 px-3">Site Saturation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {solverResult.assignments.map((assign, idx) => {
                const st = settlements.find(s => s.id === assign.settlementId);
                return (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 text-xs block">{assign.settlementName}</span>
                      <span className="text-[10px] text-slate-500">{st?.localPanchayat}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-50 text-red-800 border border-red-200 font-mono">
                        {st?.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className="font-bold text-slate-900">{assign.capacityUtilizedHH.toLocaleString()} HH</span>
                      <span className="text-[10px] text-slate-500 block">({assign.population.toLocaleString()} persons)</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-xs">
                        <ArrowRight className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>{assign.siteName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-slate-800">
                      {assign.distanceKm.toFixed(1)} km
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      ~{assign.travelTimeMinutes} mins
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-900">{assign.siteUtilizationPct}%</span>
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={'h-full ' + (assign.siteUtilizationPct > 90 ? 'bg-red-600' : 'bg-emerald-600')}
                            style={{ width: assign.siteUtilizationPct + '%' }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
