import { Settlement, PriorityLevel } from '../types';

export interface PriorityBreakdown {
  settlementId: string;
  settlementName: string;
  calculatedScore: number;
  priorityLevel: PriorityLevel;
  contributions: {
    hazardRecurrence: number;
    redZoneOverlap: number;
    populationExposure: number;
    accessibilityRisk: number;
    slopeInstability: number;
  };
}

export function evaluateRelocationPriority(settlement: Settlement): PriorityBreakdown {
  const f = settlement.factors;
  // Weighted multi-criteria calculation:
  // Recurrence (35%) + RedZone (25%) + Pop (15%) + Access (15%) + Slope (10%)
  const calculatedScore = Math.round(
    (0.35 * f.hazardRecurrence) +
    (0.25 * f.redZoneOverlap) +
    (0.15 * f.populationExposure) +
    (0.15 * f.accessibilityRisk) +
    (0.10 * f.slopeInstability)
  );

  let priorityLevel: PriorityLevel = 'Medium-Term';
  if (calculatedScore >= 85 || settlement.redZoneOverlapPct >= 90) {
    priorityLevel = 'Immediate';
  } else if (calculatedScore >= 68 || settlement.redZoneOverlapPct >= 65) {
    priorityLevel = 'Short-Term';
  }

  return {
    settlementId: settlement.id,
    settlementName: settlement.name,
    calculatedScore,
    priorityLevel,
    contributions: {
      hazardRecurrence: Math.round(0.35 * f.hazardRecurrence),
      redZoneOverlap: Math.round(0.25 * f.redZoneOverlap),
      populationExposure: Math.round(0.15 * f.populationExposure),
      accessibilityRisk: Math.round(0.15 * f.accessibilityRisk),
      slopeInstability: Math.round(0.10 * f.slopeInstability),
    }
  };
}

export function compareSettlements(a: Settlement, b: Settlement): {
  winner: Settlement;
  loser: Settlement;
  margin: number;
  differentialFactors: string[];
} {
  const pA = evaluateRelocationPriority(a);
  const pB = evaluateRelocationPriority(b);
  const margin = pA.calculatedScore - pB.calculatedScore;
  const winner = margin >= 0 ? a : b;
  const loser = margin >= 0 ? b : a;

  const differentials: string[] = [];
  if (winner.factors.hazardRecurrence > loser.factors.hazardRecurrence) {
    differentials.push('Higher historical catastrophe recurrence (+' + (winner.factors.hazardRecurrence - loser.factors.hazardRecurrence) + ' pts)');
  }
  if (winner.factors.redZoneOverlap > loser.factors.redZoneOverlap) {
    differentials.push('Greater statutory Red Zone overlap (' + winner.redZoneOverlapPct + '% vs ' + loser.redZoneOverlapPct + '%)');
  }
  if (winner.factors.accessibilityRisk > loser.factors.accessibilityRisk) {
    differentials.push('Severe lifeline severance / bridge islanding risk (' + winner.factors.accessibilityRisk + '/100 vs ' + loser.factors.accessibilityRisk + '/100)');
  }
  if (winner.factors.slopeInstability > loser.factors.slopeInstability) {
    differentials.push('Steeper scarp slope gradient (' + winner.slopeDegrees + '° vs ' + loser.slopeDegrees + '°)');
  }

  return {
    winner,
    loser,
    margin: Math.abs(margin),
    differentialFactors: differentials
  };
}
