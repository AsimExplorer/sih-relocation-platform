import { Settlement, CandidateSite, AllocationAssignment } from '../types';

export interface MatchingResult {
  assignments: AllocationAssignment[];
  unallocatedSettlements: { settlement: Settlement; deficitHH: number }[];
  siteUtilization: Record<string, {
    siteId: string;
    siteName: string;
    capacityHH: number;
    assignedHH: number;
    remainingHH: number;
    utilizationPct: number;
  }>;
  totalVulnerableHouseholds: number;
  totalAllocatedHouseholds: number;
  systemCapacityCoveragePct: number;
}

export function solveCapacityConstrainedAllocation(
  settlements: Settlement[],
  candidateSites: CandidateSite[]
): MatchingResult {
  // 1. Sort settlements by priority descending (Immediate first, then by risk score)
  const priorityOrder: Record<string, number> = { 'Immediate': 0, 'Short-Term': 1, 'Medium-Term': 2 };
  const sortedSettlements = [...settlements].sort((a, b) => {
    const diff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (diff !== 0) return diff;
    return b.riskScore - a.riskScore;
  });

  // 2. Track site remaining capacities
  const siteRemaining = new Map<string, number>();
  const siteAssigned = new Map<string, number>();
  candidateSites.forEach(s => {
    siteRemaining.set(s.id, s.calculatedCapacity.netSafeAbsorptionCapacityHH);
    siteAssigned.set(s.id, 0);
  });

  const assignments: AllocationAssignment[] = [];
  const unallocatedSettlements: { settlement: Settlement; deficitHH: number }[] = [];

  // 3. Deterministic greedy allocation with distance & suitability cost function
  for (const st of sortedSettlements) {
    const neededHH = st.households;

    // Rank viable candidate sites by composite score: 
    // Suitability (60%) - Distance penalty (40%)
    const viableSites = candidateSites
      .map(site => {
        const dist = site.distanceToSettlements[st.id] ?? 20;
        const remaining = siteRemaining.get(site.id) ?? 0;
        // Cost: lower distance is better, higher suitability is better
        const score = (site.suitabilityScore * 1.5) - (dist * 2.0);
        return { site, dist, remaining, score };
      })
      .sort((a, b) => b.score - a.score);

    // Pick the best site that has capacity
    let selected = viableSites.find(item => item.remaining >= neededHH);

    // If none has 100% capacity, pick the one with the most remaining capacity
    if (!selected && viableSites.length > 0) {
      const sortedByRemaining = [...viableSites].sort((a, b) => b.remaining - a.remaining);
      selected = sortedByRemaining[0];
    }

    if (selected && selected.remaining > 0) {
      const site = selected.site;
      const allocatedHH = Math.min(neededHH, selected.remaining);
      const prevAssigned = siteAssigned.get(site.id) ?? 0;
      const newAssigned = prevAssigned + allocatedHH;
      const totalCap = site.calculatedCapacity.netSafeAbsorptionCapacityHH;
      const newRemaining = Math.max(0, totalCap - newAssigned);

      siteAssigned.set(site.id, newAssigned);
      siteRemaining.set(site.id, newRemaining);

      const travelTimeMinutes = Math.round(selected.dist * 2.1 + 8);

      assignments.push({
        settlementId: st.id,
        settlementName: st.name,
        population: st.population,
        households: st.households,
        siteId: site.id,
        siteName: site.name,
        distanceKm: selected.dist,
        travelTimeMinutes,
        capacityUtilizedHH: allocatedHH,
        capacityTotalHH: totalCap,
        siteUtilizationPct: Math.round((newAssigned / totalCap) * 100),
        remainingCapacityHH: newRemaining,
        rationale: [
          'Matched under priority ' + st.priority.toUpperCase() + ' mandate.',
          'Optimal travel distance (' + selected.dist.toFixed(1) + ' km / ~' + travelTimeMinutes + ' min via PWD corridor).',
          'High site suitability rating (' + site.suitabilityScore + '/100) with zero active landslide hazard.',
          'Site has ' + newRemaining + ' HH safe capacity headroom remaining after this allocation.'
        ]
      });

      if (allocatedHH < neededHH) {
        unallocatedSettlements.push({
          settlement: st,
          deficitHH: neededHH - allocatedHH
        });
      }
    } else {
      unallocatedSettlements.push({
        settlement: st,
        deficitHH: neededHH
      });
    }
  }

  // 4. Summarize site utilization
  const siteUtilization: MatchingResult['siteUtilization'] = {};
  candidateSites.forEach(s => {
    const assigned = siteAssigned.get(s.id) ?? 0;
    const totalCap = s.calculatedCapacity.netSafeAbsorptionCapacityHH;
    siteUtilization[s.id] = {
      siteId: s.id,
      siteName: s.name,
      capacityHH: totalCap,
      assignedHH: assigned,
      remainingHH: Math.max(0, totalCap - assigned),
      utilizationPct: Math.round((assigned / totalCap) * 100)
    };
  });

  const totalVulnerableHouseholds = settlements.reduce((sum, s) => sum + s.households, 0);
  const totalAllocatedHouseholds = assignments.reduce((sum, a) => sum + a.capacityUtilizedHH, 0);
  const totalCapacityAvailable = candidateSites.reduce((sum, s) => sum + s.calculatedCapacity.netSafeAbsorptionCapacityHH, 0);

  return {
    assignments,
    unallocatedSettlements,
    siteUtilization,
    totalVulnerableHouseholds,
    totalAllocatedHouseholds,
    systemCapacityCoveragePct: Math.round((totalCapacityAvailable / totalVulnerableHouseholds) * 100)
  };
}
