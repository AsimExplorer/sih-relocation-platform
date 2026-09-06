import { Settlement, AiRiskAssessment, AiAssessmentBatchResponse } from '../types';
import { evaluateRelocationPriority } from '../engine/priorityEngine';

// In-memory cache singleton
let cachedAssessment: AiAssessmentBatchResponse | null = null;

export function generateDeterministicFallback(settlements: Settlement[]): Record<string, AiRiskAssessment> {
  const result: Record<string, AiRiskAssessment> = {};

  for (const s of settlements) {
    const priorityEval = evaluateRelocationPriority(s);
    
    // Extract top 3 drivers cleanly
    const topDrivers = s.keyRiskDrivers && s.keyRiskDrivers.length >= 3
      ? s.keyRiskDrivers.slice(0, 3)
      : [
          s.redZoneOverlapPct + '% permanent Red Zone overlap within active floodplain',
          'Historical disaster recurrence score of ' + (s.factors?.hazardRecurrence ?? 85) + '/100 across major flood events',
          'High population vulnerability index (' + s.vulnerabilityScore + '/100) with non-pucca housing density'
        ];

    const recommendation = s.recommendedAction || 
      (priorityEval.priorityLevel === 'Immediate'
        ? 'Prioritize for immediate Phase-1 relocation assessment and evacuation staging.'
        : priorityEval.priorityLevel === 'Short-Term'
        ? 'Schedule for Phase-2 relocation planning and host site absorption verification.'
        : 'Monitor hydrological indicators and include in medium-term phased relocation schedule.');

    const summary = s.explanation?.summary ||
      (s.name + ' faces ' + s.hazardExposure.toLowerCase() + ' hazard exposure with ' + s.redZoneOverlapPct + '% overlap inside the permanent unsuitability corridor. Classified as ' + priorityEval.priorityLevel + ' priority based on multi-criteria life-safety vulnerability.');

    result[s.id] = {
      settlementId: s.id,
      priority: priorityEval.priorityLevel,
      riskScore: priorityEval.calculatedScore,
      topDrivers,
      recommendation,
      assessmentSummary: summary
    };
  }

  return result;
}

export async function fetchAiRiskAssessments(
  settlements: Settlement[],
  forceRefresh = false
): Promise<AiAssessmentBatchResponse> {
  if (!forceRefresh && cachedAssessment) {
    return cachedAssessment;
  }

  try {
    const payload = settlements.map(s => ({
      id: s.id,
      name: s.name,
      population: s.population,
      households: s.households,
      hazardExposure: s.hazardExposure,
      vulnerabilityScore: s.vulnerabilityScore,
      redZoneOverlapPct: s.redZoneOverlapPct,
      historicalDisasterRecurrence: s.riskBreakdown?.historicalDisasterRecurrence ?? s.factors.hazardRecurrence,
      floodInundationRisk: s.riskBreakdown?.floodInundationRisk ?? 80,
      siltLiquefactionRisk: s.riskBreakdown?.siltLiquefactionRisk ?? 70,
      drainageBackflowRisk: s.riskBreakdown?.drainageBackflowRisk ?? 60,
      accessibilityImpedance: s.riskBreakdown?.accessibilityImpedance ?? s.factors.accessibilityRisk,
      factors: s.factors
    }));

    const response = await fetch('/api/ai-assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ settlements: payload })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.assessments && typeof data.assessments === 'object') {
        const batchResponse: AiAssessmentBatchResponse = {
          success: Boolean(data.success),
          isFallback: Boolean(data.isFallback),
          source: data.source || (data.isFallback ? 'rule-based-fallback' : 'gemini-2.5-flash'),
          timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          assessments: data.assessments,
          message: data.message
        };
        cachedAssessment = batchResponse;
        return batchResponse;
      }
    }
  } catch {
    // Network or server endpoint error -> fall back cleanly
  }

  // Fallback if API call failed, returned an error, or endpoint was unreachable
  const fallbackAssessments = generateDeterministicFallback(settlements);
  const fallbackResponse: AiAssessmentBatchResponse = {
    success: false,
    isFallback: true,
    source: 'rule-based-fallback',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    assessments: fallbackAssessments,
    message: 'AI unavailable — showing rule-based assessment'
  };

  cachedAssessment = fallbackResponse;
  return fallbackResponse;
}

export function getCachedAssessment(): AiAssessmentBatchResponse | null {
  return cachedAssessment;
}

export function clearAssessmentCache(): void {
  cachedAssessment = null;
}
