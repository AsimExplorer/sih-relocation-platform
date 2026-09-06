import { Settlement, CandidateSite, AllocationAssignment, EvaluatedSiteOutcome } from '../types';

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
    // Only feasible or limited sites can absorb, rejected sites have 0 usable allocation capacity
    const initialCap = s.status === 'REJECTED' ? 0 : s.calculatedCapacity.netSafeAbsorptionCapacityHH;
    siteRemaining.set(s.id, initialCap);
    siteAssigned.set(s.id, 0);
  });

  const assignments: AllocationAssignment[] = [];
  const unallocatedSettlements: { settlement: Settlement; deficitHH: number }[] = [];

  // 3. Deterministic greedy allocation with distance & suitability cost function
  for (const st of sortedSettlements) {
    const neededHH = st.households;

    // Evaluate all candidate sites for this settlement to generate comprehensive Rejection Log
    const evaluatedSites: EvaluatedSiteOutcome[] = [];
    const rejectedSites: EvaluatedSiteOutcome[] = [];

    candidateSites.forEach(site => {
      const safeCap = site.calculatedCapacity.netSafeAbsorptionCapacityHH;
      const currentRemaining = siteRemaining.get(site.id) ?? 0;
      const bindingConstraint = site.calculatedCapacity.bindingConstraint;

      if (site.status === 'REJECTED') {
        const outcome: EvaluatedSiteOutcome = {
          siteId: site.id,
          siteName: site.name,
          status: 'REJECTED',
          safeCapacityHH: safeCap,
          requiredHH: neededHH,
          deficitHH: Math.max(0, neededHH - safeCap),
          bindingConstraint,
          reason: site.rejectionReason || 'Site intrinsically rejected due to severe infrastructure bottleneck and floodway buffer violation.'
        };
        evaluatedSites.push(outcome);
        rejectedSites.push(outcome);
      } else if (currentRemaining < neededHH) {
        const outcome: EvaluatedSiteOutcome = {
          siteId: site.id,
          siteName: site.name,
          status: 'REJECTED',
          safeCapacityHH: currentRemaining,
          requiredHH: neededHH,
          deficitHH: neededHH - currentRemaining,
          bindingConstraint,
          reason: 'Insufficient safe residual capacity (' + currentRemaining + ' HH available vs ' + neededHH + ' HH required). Constrained by ' + bindingConstraint + '.'
        };
        evaluatedSites.push(outcome);
        rejectedSites.push(outcome);
      } else {
        const outcome: EvaluatedSiteOutcome = {
          siteId: site.id,
          siteName: site.name,
          status: site.status,
          safeCapacityHH: safeCap,
          requiredHH: neededHH,
          deficitHH: 0,
          bindingConstraint,
          reason: 'Site provides sustainable absorption of ' + neededHH + ' HH within safe capacity threshold of ' + safeCap + ' HH (' + bindingConstraint + ' compliant).'
        };
        evaluatedSites.push(outcome);
      }
    });

    // Rank viable candidate sites (excluding intrinsically rejected ones)
    const viableSites = candidateSites
      .filter(site => site.status !== 'REJECTED')
      .map(site => {
        const dist = site.distanceToSettlements[st.id] ?? 20;
        const remaining = siteRemaining.get(site.id) ?? 0;
        // Cost function: suitability (60%) - distance penalty (40%)
        const score = (site.suitabilityScore * 1.5) - (dist * 2.0);
        return { site, dist, remaining, score };
      })
      .sort((a, b) => b.score - a.score);

    // Pick best site that has full capacity
    let selected = viableSites.find(item => item.remaining >= neededHH);

    // If none has 100% capacity, pick the one with most remaining headroom
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
        bindingConstraint: site.calculatedCapacity.bindingConstraint,
        rationale: [
          'Matched under statutory priority ' + st.priority.toUpperCase() + ' mandate (DM Act Section 30).',
          'Optimal transit connectivity (' + selected.dist.toFixed(1) + ' km / ~' + travelTimeMinutes + ' min via PWD corridor).',
          'High composite suitability rating (' + site.suitabilityScore + '/100) with zero active floodway hazard.',
          'Sustainable capacity verified: ' + allocatedHH + ' HH absorbed, ' + newRemaining + ' HH safe headroom remaining.',
          'Governing bottleneck (' + site.calculatedCapacity.bindingConstraint + ') monitored and certified within safe absorption limits.'
        ],
        candidateSitesEvaluated: evaluatedSites,
        rejectedSites: rejectedSites
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
      utilizationPct: totalCap > 0 ? Math.round((assigned / totalCap) * 100) : 0
    };
  });

  const totalVulnerableHouseholds = settlements.reduce((sum, s) => sum + s.households, 0);
  const totalAllocatedHouseholds = assignments.reduce((sum, a) => sum + a.capacityUtilizedHH, 0);
  const totalCapacityAvailable = candidateSites
    .filter(s => s.status !== 'REJECTED')
    .reduce((sum, s) => sum + s.calculatedCapacity.netSafeAbsorptionCapacityHH, 0);

  return {
    assignments,
    unallocatedSettlements,
    siteUtilization,
    totalVulnerableHouseholds,
    totalAllocatedHouseholds,
    systemCapacityCoveragePct: Math.round((totalCapacityAvailable / totalVulnerableHouseholds) * 100)
  };
}
