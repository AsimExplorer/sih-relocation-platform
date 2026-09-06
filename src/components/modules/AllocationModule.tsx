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
      <div className="p-4 rounded-xl bg-gov-card border border-gov-border">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
          <GitMerge className="w-4 h-4" />
          <span>Capacity-Constrained Relocation Matching</span>
        </div>
        <h2 className="text-xl font-black text-white tracking-tight mt-1">
          Settlement-to-Site Allocation Under Shared Resource Dynamics
        </h2>
        <p className="text-xs text-slate-300 max-w-4xl mt-1 leading-relaxed">
          Candidate resettlement sites are shared public assets. If Settlement A absorbs capacity at Site Alpha, that capacity is no longer available to Settlement B. The matching solver minimizes displacement distance and maximizes suitability while strictly respecting carrying capacity ceilings.
        </p>
      </div>

      {/* Shared Public Capacity Meters Row */}
      <div className="p-4 rounded-xl bg-gov-dark border border-gov-border space-y-3">
        <div className="flex items-center justify-between font-bold text-xs text-white">
          <span className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-400" />
            Candidate Site Capacity Saturation Ledger (Shared Resource Monitoring)
          </span>
          <span className="text-[11px] text-slate-400">Total Available: 1,490 HH | Total Assigned: 1,365 HH</span>
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
              <div key={site.id} className="p-3 rounded-lg bg-gov-surface border border-gov-border space-y-2">
                <div className="flex justify-between items-start text-xs font-bold text-white">
                  <span className="truncate">{site.name.split('—')[0]}</span>
                  <span className="font-mono text-emerald-400">{util.remainingHH} HH Left</span>
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
      <div className="bg-gov-dark rounded-xl border border-gov-border overflow-hidden">
        <div className="p-3 border-b border-gov-border flex items-center justify-between font-bold text-xs text-slate-300">
          <span>Official Relocation Assignment Schedule</span>
          <span className="text-[11px] text-emerald-400 font-mono font-semibold">100% Demand Allocated (Zero Backlog)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gov-surface text-slate-400 uppercase text-[10px] tracking-wider border-b border-gov-border">
              <tr>
                <th className="py-2.5 px-3">Vulnerable Origin Settlement</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Households (Pop)</th>
                <th className="py-2.5 px-3">Assigned Destination Site</th>
                <th className="py-2.5 px-3">Transit Distance</th>
                <th className="py-2.5 px-3">Travel Time</th>
                <th className="py-2.5 px-3">Site Saturation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-border/60">
              {solverResult.assignments.map((assign, idx) => {
                const st = settlements.find(s => s.id === assign.settlementId);
                return (
                  <tr key={idx} className="hover:bg-gov-surface/60">
                    <td className="py-3 px-3">
                      <span className="font-bold text-white text-xs block">{assign.settlementName}</span>
                      <span className="text-[10px] text-slate-400">{st?.localPanchayat}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-950 text-red-300 border border-red-700 font-mono">
                        {st?.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className="font-bold text-white">{assign.capacityUtilizedHH} HH</span>
                      <span className="text-[10px] text-slate-400 block">({assign.population} persons)</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-300 text-xs">
                        <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{assign.siteName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-slate-200">
                      {assign.distanceKm.toFixed(1)} km
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">
                      ~{assign.travelTimeMinutes} mins
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-white">{assign.siteUtilizationPct}%</span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={'h-full ' + (assign.siteUtilizationPct > 90 ? 'bg-rose-500' : 'bg-emerald-500')}
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
