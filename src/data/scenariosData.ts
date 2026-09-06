import { Settlement } from '../types';
import { SETTLEMENTS_DATA } from './delhiData';

export interface DisasterScenario {
  id: string;
  name: string;
  shortTitle: string;
  badge: string;
  waterLevelMeters: number;
  hathnikundDischargeCusecs: number;
  severity: 'Normal' | 'High' | 'Severe' | 'Catastrophic';
  incidentSummary: string;
  keyHydrologicalTriggers: string[];
  settlements: Settlement[];
}

// 1. Baseline Scenario: Seasonal High Flood Mark (205.33m)
const BASELINE_SCENARIO: DisasterScenario = {
  id: 'baseline',
  name: 'Scenario 1: Baseline Seasonal High (205.33m MSL)',
  shortTitle: 'Baseline Seasonal High (205.33m)',
  badge: 'CWC Danger Mark (205.33m)',
  waterLevelMeters: 205.33,
  hathnikundDischargeCusecs: 125000,
  severity: 'High',
  incidentSummary: 'Standard monsoon high-flood envelope along East Delhi Yamuna riverbed. River reaches CWC 205.33m danger mark, inundating unprotected agricultural and low-lying khadar habitations.',
  keyHydrologicalTriggers: [
    'Yamuna water level matches CWC Danger Mark at Old Railway Bridge (205.33m)',
    'Hathnikund Barrage seasonal discharge stable at 1.25 Lakh Cusecs',
    'Unbunded floodplain sectors at Loha Pul and Garhi Mandu fully inundated',
    '2 Habitations in Immediate Priority (770 HH + 588 HH)'
  ],
  settlements: JSON.parse(JSON.stringify(SETTLEMENTS_DATA))
};

// 2. Scenario 2: Extreme Hathnikund Peak Spillway Surge (208.66m Record)
const SURGE_208M_SETTLEMENTS: Settlement[] = JSON.parse(JSON.stringify(SETTLEMENTS_DATA)).map((s: Settlement) => {
  if (s.id === 'SET-01') {
    return {
      ...s,
      hazardExposure: 'Extreme',
      vulnerabilityScore: 98,
      redZoneOverlapPct: 100,
      riskScore: 99,
      priority: 'Immediate',
      riskBreakdown: { ...s.riskBreakdown, floodInundationRisk: 100, accessibilityImpedance: 98 },
      keyRiskDrivers: [
        'Record 208.66m peak overtopping with 4.2m floodwaters across riverbed',
        'Total submergence of Old Loha Pul approach corridors; boat rescue only',
        '100% active floodplain envelope overlap with catastrophic silt scouring',
        'Severe drinking water contamination and complete electrical grid blackout'
      ]
    };
  }
  if (s.id === 'SET-02') {
    return {
      ...s,
      hazardExposure: 'Extreme',
      vulnerabilityScore: 96,
      redZoneOverlapPct: 100,
      riskScore: 97,
      priority: 'Immediate',
      riskBreakdown: { ...s.riskBreakdown, floodInundationRisk: 98, siltLiquefactionRisk: 96 },
      keyRiskDrivers: [
        'Massive alluvial scarp collapse adjacent to Geeta Colony breach corridor',
        'Direct surge envelope from 3.59 Lakh cusecs Hathnikund release wave',
        '100% Red Zone overlap with zero residual dry elevation',
        'Complete cutoff of eastern marginal access road'
      ]
    };
  }
  if (s.id === 'SET-03') {
    // Escalates from Short-Term (78) to Immediate (93)
    return {
      ...s,
      hazardExposure: 'Extreme',
      vulnerabilityScore: 92,
      redZoneOverlapPct: 95,
      riskScore: 93,
      priority: 'Immediate',
      recommendedAction: 'Emergency Evacuation & Immediate Phase-1 Relocation Condemnation (Surge Envelope Spill)',
      factors: { ...s.factors, hazardRecurrence: 94, redZoneOverlap: 95, accessibilityRisk: 92 },
      riskBreakdown: { ...s.riskBreakdown, floodInundationRisk: 95, drainageBackflowRisk: 96, accessibilityImpedance: 90 },
      keyRiskDrivers: [
        'Severe 208.66m backwater surcharge causing reverse flow in open Shahdara trunk regulators',
        'Marginal bund overtopping flooding 490 households up to 2.1m depth',
        'Red Zone envelope expands to 95% due to hydraulic backwater pooling',
        'Access roads severed requiring amphibious military raft evacuation'
      ]
    };
  }
  if (s.id === 'SET-04') {
    // Escalates from Short-Term (73) to Immediate (89)
    return {
      ...s,
      hazardExposure: 'Extreme',
      vulnerabilityScore: 88,
      redZoneOverlapPct: 90,
      riskScore: 89,
      priority: 'Immediate',
      recommendedAction: 'Emergency Phase-1 Relocation (ISBT Corridor Overtopping Hazard)',
      factors: { ...s.factors, hazardRecurrence: 90, redZoneOverlap: 90, accessibilityRisk: 88 },
      riskBreakdown: { ...s.riskBreakdown, floodInundationRisk: 92, drainageBackflowRisk: 94, accessibilityImpedance: 88 },
      keyRiskDrivers: [
        'Submergence of ISBT flyover lowlands and Monastery market approach corridors',
        '90% Red Zone inundation envelope under 3.59 Lakh cusecs surge wave',
        'Chronic drainage lockout at Ring Road culvert siphons',
        'Dense non-pucca habitations experiencing total structural saturation'
      ]
    };
  }
  if (s.id === 'SET-05') {
    // Escalates from Medium-Term (58) to Short-Term (76)
    return {
      ...s,
      hazardExposure: 'High',
      vulnerabilityScore: 75,
      redZoneOverlapPct: 65,
      riskScore: 76,
      priority: 'Short-Term',
      recommendedAction: 'Phase-2 Accelerated Relocation Planning under Surge Envelope Expansion',
      factors: { ...s.factors, hazardRecurrence: 75, redZoneOverlap: 65, accessibilityRisk: 70 },
      riskBreakdown: { ...s.riskBreakdown, floodInundationRisk: 78, drainageBackflowRisk: 82 }
    };
  }
  return s;
});

const SURGE_208M_SCENARIO: DisasterScenario = {
  id: 'surge-208m',
  name: 'Scenario 2: Record Hathnikund Surge (208.66m Peak Breach)',
  shortTitle: 'Historic Peak Surge (208.66m)',
  badge: 'All-Time Record (208.66m MSL)',
  waterLevelMeters: 208.66,
  hathnikundDischargeCusecs: 359000,
  severity: 'Catastrophic',
  incidentSummary: 'Severe surge equivalent to the historic July 2023 Yamuna catastrophe. Discharge exceeds 3.59 Lakh cusecs; floodwaters breach marginal bunds, expanding Red Zone unsuitability across 4 habitations simultaneously.',
  keyHydrologicalTriggers: [
    'Yamuna water level hits 208.66m MSL — surpassing 1978 record by 1.17 meters',
    'Hathnikund Barrage releases 3,59,000 Cusecs surge envelope downstream',
    'Usmanpur Dhall & Shastri Park Lowlands escalate from Short-Term to IMMEDIATE priority',
    'Total 4 Settlements in IMMEDIATE relocation status (2,208 HH / 11,040 persons)',
    'Immediate host site capacity stress across DJB water pipelines at Site Alpha'
  ],
  settlements: SURGE_208M_SETTLEMENTS
};

// 3. Scenario 3: Marginal Bund Collapse & Drain Siphon Surcharge
const BUND_BREACH_SETTLEMENTS: Settlement[] = [
  ...JSON.parse(JSON.stringify(SETTLEMENTS_DATA)),
  {
    id: 'SET-06',
    name: 'Geeta Colony Bund Extension Pocket',
    localPanchayat: 'Geeta Colony Sub-Division, East Delhi',
    lat: 28.6480,
    lng: 77.2680,
    population: 1600,
    households: 320,
    areaSqKm: 1.4,
    hazardExposure: 'Extreme',
    vulnerabilityScore: 93,
    slopeDegrees: 1.1,
    soilErosionClass: 'Critical',
    isPermanentRedZone: true,
    redZoneOverlapPct: 98,
    riskScore: 95,
    priority: 'Immediate',
    recommendedAction: 'Emergency Resettlement following Structural Bund Breach under DM Act Sec 34',
    historicalDisasters: [
      { year: 2023, eventType: 'Embankment Seepage Breach', fatalities: 4, damageDesc: 'Unreinforced bund failed under 2.8m pressure head' }
    ],
    primaryHazardDrivers: [
      'Structural Marginal Bund Collapse',
      'Direct River Basin Scouring',
      'Zero Evacuation Time Warning Buffer'
    ],
    riskBreakdown: {
      floodInundationRisk: 98,
      siltLiquefactionRisk: 95,
      drainageBackflowRisk: 91,
      populationVulnerability: 94,
      historicalDisasterRecurrence: 90,
      accessibilityImpedance: 96
    },
    keyRiskDrivers: [
      'Catastrophic physical failure of 180m section of unreinforced marginal bund',
      'Sudden inland surge inundating 320 households within 45 minutes',
      'High non-pucca vulnerability with structural collapse of brick-mud foundations',
      'Complete road severance requiring immediate diversion to Site Beta (Mandoli)'
    ],
    factors: {
      hazardRecurrence: 90,
      redZoneOverlap: 98,
      populationExposure: 88,
      accessibilityRisk: 96,
      slopeInstability: 92
    },
    explanation: {
      summary: 'Geeta Colony Bund Extension Pocket is condemned due to active physical embankment failure and irreversible scarp liquefaction, requiring immediate Phase-1 extraction.',
      keyPoints: [
        '180-meter breach in earthen flood embankment',
        '320 households completely flooded under 2.4m head',
        'Physical safety impossible without complete multi-crore civil dyke reconstruction'
      ],
      statutoryJustification: 'Emergency condemnation authorized under DM Act 2005 Sec 34(c).'
    }
  }
];

const BUND_BREACH_SCENARIO: DisasterScenario = {
  id: 'bund-breach',
  name: 'Scenario 3: Marginal Bund Collapse & Siphon Surcharge',
  shortTitle: 'Marginal Bund Breach (207.25m)',
  badge: 'Structural Embankment Failure',
  waterLevelMeters: 207.25,
  hathnikundDischargeCusecs: 245000,
  severity: 'Catastrophic',
  incidentSummary: 'Physical failure of a 180-meter marginal flood embankment section near Geeta Colony accompanied by reverse surcharge through Shahdara drain siphons. An additional 320 households are immediately displaced.',
  keyHydrologicalTriggers: [
    '180m physical structural collapse of Geeta Colony marginal river embankment',
    'Water level 207.25m with reverse backwater through Shahdara storm regulator #12',
    'Ingestion of 6th vulnerable habitation: Geeta Colony Bund Pocket (320 HH)',
    'Total displaced population rises to 13,840 persons (2,768 HH)',
    'Site Alpha (620 HH safe capacity) reaches 100% saturation; overflow routed to Site Beta'
  ],
  settlements: BUND_BREACH_SETTLEMENTS
};

// 4. Scenario 4: Post-Monsoon Alluvial Liquefaction & Lifeline Severance
const SCOUR_LIQUEFACTION_SETTLEMENTS: Settlement[] = JSON.parse(JSON.stringify(SETTLEMENTS_DATA)).map((s: Settlement) => {
  if (s.id === 'SET-02') {
    return {
      ...s,
      hazardExposure: 'Extreme',
      vulnerabilityScore: 98,
      riskScore: 97,
      priority: 'Immediate',
      factors: { ...s.factors, slopeInstability: 98, accessibilityRisk: 99 },
      riskBreakdown: { ...s.riskBreakdown, siltLiquefactionRisk: 99, accessibilityImpedance: 99 },
      keyRiskDrivers: [
        'Catastrophic alluvial sand boiling and bank scouring undermining riverbed foundation',
        'Complete severance of 5.5m approach roadway; bridges structurally compromised',
        'Severe foundation liquefaction rendering any reconstruction illegal and fatal',
        'Mandatory rerouting of all 588 households to Mandoli due to road severance'
      ]
    };
  }
  return s;
});

const SCOUR_LIQUEFACTION_SCENARIO: DisasterScenario = {
  id: 'scour-liquefaction',
  name: 'Scenario 4: Alluvial Silt Liquefaction & Road Severance',
  shortTitle: 'Alluvial Liquefaction & Scour',
  badge: 'Bank Scouring & Isolation',
  waterLevelMeters: 206.80,
  hathnikundDischargeCusecs: 185000,
  severity: 'Severe',
  incidentSummary: 'Rapid water recession causes massive bank scouring, sub-surface sand boiling, and saturated alluvial slope collapse. Complete lifeline severance cuts off road access to Garhi Mandu.',
  keyHydrologicalTriggers: [
    'Pore water pressure surge causing riverbank liquefaction along 1.2km scarp',
    'Garhi Mandu access roadway completely collapsed into riverbed (Accessibility Risk: 99/100)',
    'Direct road route to Site Alpha (Karkardooma) severed; forces 100% rerouting to Site Beta',
    'Demonstrates deterministic route impedance and origin-destination recalculation'
  ],
  settlements: SCOUR_LIQUEFACTION_SETTLEMENTS
};

export const SCENARIOS: Record<string, DisasterScenario> = {
  'baseline': BASELINE_SCENARIO,
  'surge-208m': SURGE_208M_SCENARIO,
  'bund-breach': BUND_BREACH_SCENARIO,
  'scour-liquefaction': SCOUR_LIQUEFACTION_SCENARIO
};

export const SCENARIO_LIST: DisasterScenario[] = [
  BASELINE_SCENARIO,
  SURGE_208M_SCENARIO,
  BUND_BREACH_SCENARIO,
  SCOUR_LIQUEFACTION_SCENARIO
];

export function createCustomSettlement(data: {
  name: string;
  panchayat: string;
  population: number;
  households: number;
  redZoneOverlapPct: number;
  hazardExposure: 'Extreme' | 'Very High' | 'High' | 'Moderate';
  vulnerabilityScore: number;
  historicalRecurrence: number;
  primaryDrivers?: string[];
}): Settlement {
  const id = 'SET-CUSTOM-' + Math.floor(100 + Math.random() * 900);
  const redZone = Number(data.redZoneOverlapPct) || 75;
  const vuln = Number(data.vulnerabilityScore) || 80;
  const rec = Number(data.historicalRecurrence) || 80;
  const calculatedScore = Math.min(100, Math.round(0.35 * rec + 0.25 * redZone + 0.20 * vuln + 15));

  let priority: 'Immediate' | 'Short-Term' | 'Medium-Term' = 'Medium-Term';
  if (calculatedScore >= 85 || redZone >= 90) priority = 'Immediate';
  else if (calculatedScore >= 68 || redZone >= 65) priority = 'Short-Term';

  const drivers = data.primaryDrivers && data.primaryDrivers.length > 0
    ? data.primaryDrivers
    : [
        `${redZone}% permanent Red Zone unsuitability overlap within floodplain`,
        `High community vulnerability index (${vuln}/100) with informal dwellings`,
        `Disaster recurrence frequency rating of ${rec}/100 in recent monsoon cycles`
      ];

  return {
    id,
    name: data.name || 'Live Ingested Habitation',
    localPanchayat: data.panchayat || 'East Delhi Revenue District',
    lat: 28.6500 + (Math.random() * 0.03 - 0.015),
    lng: 77.2600 + (Math.random() * 0.03 - 0.015),
    population: Number(data.population) || 1200,
    households: Number(data.households) || Math.round(Number(data.population || 1200) / 5),
    areaSqKm: 1.2,
    hazardExposure: data.hazardExposure || 'Very High',
    vulnerabilityScore: vuln,
    slopeDegrees: 1.0,
    soilErosionClass: 'Critical',
    isPermanentRedZone: redZone >= 80,
    redZoneOverlapPct: redZone,
    riskScore: calculatedScore,
    priority,
    recommendedAction: priority === 'Immediate'
      ? 'Mandatory immediate relocation assessment under DM Act 2005'
      : priority === 'Short-Term'
      ? 'Scheduled Phase-2 planned resettlement to verified safe host parcel'
      : 'Include in medium-term phased relocation schedule',
    historicalDisasters: [
      { year: 2023, eventType: 'Yamuna Floodplain Inundation', fatalities: 1, damageDesc: 'Dwelling submergence and livestock loss' }
    ],
    primaryHazardDrivers: drivers,
    riskBreakdown: {
      floodInundationRisk: Math.min(100, redZone + 5),
      siltLiquefactionRisk: Math.min(100, vuln),
      drainageBackflowRisk: Math.min(100, rec),
      populationVulnerability: vuln,
      historicalDisasterRecurrence: rec,
      accessibilityImpedance: Math.min(100, redZone)
    },
    keyRiskDrivers: drivers,
    factors: {
      hazardRecurrence: rec,
      redZoneOverlap: redZone,
      populationExposure: Math.min(100, Math.round(Number(data.population || 1200) / 40)),
      accessibilityRisk: Math.min(100, redZone),
      slopeInstability: 60
    },
    explanation: {
      summary: `${data.name} exhibits ${data.hazardExposure.toLowerCase()} hazard exposure with ${redZone}% Red Zone overlap, classified as ${priority} priority under live data ingestion.`,
      keyPoints: drivers,
      statutoryJustification: 'Assessed under SURAKSHA live dataset ingestion stream.'
    }
  };
}
