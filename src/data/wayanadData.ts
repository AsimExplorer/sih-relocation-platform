import { Settlement, CandidateSite, RedZoneVersionData } from '../types';

export const WAYANAD_CENTER: [number, number] = [11.5850, 76.1400];
export const WAYANAD_BOUNDS = {
  minLat: 11.450,
  maxLat: 11.750,
  minLng: 76.000,
  maxLng: 76.280,
};

export const SETTLEMENTS_DATA: Settlement[] = [
  {
    id: 'SET-01',
    name: 'Mundakkai',
    localPanchayat: 'Meppadi Grama Panchayat',
    lat: 11.5451,
    lng: 76.2012,
    population: 1420,
    households: 355,
    areaSqKm: 4.8,
    hazardExposure: 'Extreme',
    vulnerabilityScore: 94,
    slopeDegrees: 34.2,
    soilErosionClass: 'Critical',
    isPermanentRedZone: true,
    redZoneOverlapPct: 100,
    riskScore: 96,
    priority: 'Immediate',
    recommendedAction: 'Mandatory Permanent Relocation & Habitation De-notification',
    historicalDisasters: [
      { year: 2020, eventType: 'Mundakkai Stream Debris Slide', fatalities: 8, damageDesc: '32 houses washed away; bridge severed' },
      { year: 2024, eventType: 'Catastrophic Multi-Apex Debris Flow', fatalities: 231, damageDesc: 'Entire upper township buried under 6m boulder silt' },
      { year: 2019, eventType: 'Puthumala Runout Overlap', fatalities: 17, damageDesc: 'Structural slope liquefaction on tea plantation fringes' }
    ],
    primaryHazardDrivers: [
      'Debris Flow Runout Confluence (>30m/s boulder velocity zone)',
      'Steep Upper Catchment Crown Detachment (34.2° slope)',
      'Total Arterial Bridge & Lifeline Inundation Vulnerability',
      'High Structural Saprolite Saturation Index'
    ],
    factors: {
      hazardRecurrence: 98,
      redZoneOverlap: 100,
      populationExposure: 92,
      accessibilityRisk: 95,
      slopeInstability: 96
    },
    explanation: {
      summary: 'Ranked #1 Priority for immediate permanent relocation due to triple catastrophic recurrence, 100% overlap with geomorphically unviable debris runout zone, and complete loss of sub-surface bedrock stability.',
      keyPoints: [
        'Geological Survey of India (GSI) post-event assessment confirmed deep-seated rotational failure in crown zone.',
        'Zero viable structural engineering interventions can withstand recurrence velocity exceeding 28 m/s.',
        'Arterial bridge connection severed in both 2020 and 2024 events, leaving settlement islanded.'
      ],
      statutoryJustification: 'Qualifies under Section 30(2)(v) of Disaster Management Act 2005 for permanent non-resettlement zone declaration.'
    }
  },
  {
    id: 'SET-02',
    name: 'Chooralmala',
    localPanchayat: 'Meppadi Grama Panchayat',
    lat: 11.5367,
    lng: 76.1775,
    population: 1860,
    households: 465,
    areaSqKm: 5.4,
    hazardExposure: 'Extreme',
    vulnerabilityScore: 91,
    slopeDegrees: 28.6,
    soilErosionClass: 'Critical',
    isPermanentRedZone: true,
    redZoneOverlapPct: 92,
    riskScore: 92,
    priority: 'Immediate',
    recommendedAction: 'Comprehensive Relocation & Riparian Buffer Re-wilding',
    historicalDisasters: [
      { year: 2024, eventType: 'Catastrophic River Confluence Surge', fatalities: 186, damageDesc: 'Commercial center destroyed, school and 140+ dwellings washed away' },
      { year: 2020, eventType: 'Iruvanjippuzha Flash Inundation', fatalities: 4, damageDesc: 'Market area submerged under 2.5m flash surge' }
    ],
    primaryHazardDrivers: [
      'River Confluence Bottleneck (Chaliyar tributary choke point)',
      'Severe Channel Lateral Erosion (>45m river corridor expansion)',
      'High Household Density in 50-Year Floodway Encroachment',
      'Loose Colluvial Silt Deposition (>4m average depth)'
    ],
    factors: {
      hazardRecurrence: 92,
      redZoneOverlap: 92,
      populationExposure: 96,
      accessibilityRisk: 88,
      slopeInstability: 89
    },
    explanation: {
      summary: 'Ranked #2 Priority due to dense commercial/residential congregation inside active debris deposition channel. 92% of inhabited built-up footprint lies within statutory Red Zone.',
      keyPoints: [
        'River channel bed elevated by 3.8m due to boulder deposition, rendering future monsoonal overtopping inevitable.',
        'Dense population (1,860 residents) creates extreme humanitarian casualty exposure in night-time events.',
        'Public infrastructure (schools, dispensary) completely razed in recent event.'
      ],
      statutoryJustification: 'Meets State Disaster Management Plan criteria for immediate habitational de-densification.'
    }
  },
  {
    id: 'SET-03',
    name: 'Punchirimattom',
    localPanchayat: 'Meppadi Grama Panchayat',
    lat: 11.5580,
    lng: 76.2150,
    population: 680,
    households: 170,
    areaSqKm: 3.1,
    hazardExposure: 'Extreme',
    vulnerabilityScore: 88,
    slopeDegrees: 36.8,
    soilErosionClass: 'Critical',
    isPermanentRedZone: true,
    redZoneOverlapPct: 100,
    riskScore: 89,
    priority: 'Immediate',
    recommendedAction: 'Complete Relocation & Forest Regeneration Zone',
    historicalDisasters: [
      { year: 2024, eventType: 'Primary Crown Failure Slide', fatalities: 42, damageDesc: 'Originating scarp destroyed 28 hilltop tribal & estate dwellings' },
      { year: 2021, eventType: 'Crown Scarp Tension Crack Opening', fatalities: 0, damageDesc: '200m fissure opened across main access road' }
    ],
    primaryHazardDrivers: [
      'Originating Scarp / Crown Detachment Zone (36.8° slope)',
      'Complete Severance of Only Single-Track Access Road',
      'Active Sub-Surface Tension Cracks (Expanding 1.2cm/week in monsoon)',
      'Isolated Hilltop Enclave Without Redundant Evacuation Route'
    ],
    factors: {
      hazardRecurrence: 86,
      redZoneOverlap: 100,
      populationExposure: 78,
      accessibilityRisk: 99,
      slopeInstability: 98
    },
    explanation: {
      summary: 'Ranked #3 Priority. While population is smaller (680), accessibility risk is 99/100 and slope instability is 98/100. The settlement sits directly on the active detachment crown.',
      keyPoints: [
        'Active tension cracks continue to migrate laterally uphill.',
        'Evacuation route is a single non-tarred estate path traversed by active debris chutes.',
        'Rainfall threshold exceeding 120mm in 24h triggers immediate scarp mobilization.'
      ],
      statutoryJustification: 'Classified by Geological Survey of India as Level-4 Hazard Source Zone.'
    }
  },
  {
    id: 'SET-04',
    name: 'Vellarmala',
    localPanchayat: 'Meppadi Grama Panchayat',
    lat: 11.5280,
    lng: 76.1620,
    population: 940,
    households: 235,
    areaSqKm: 4.2,
    hazardExposure: 'High',
    vulnerabilityScore: 74,
    slopeDegrees: 24.1,
    soilErosionClass: 'Severe',
    isPermanentRedZone: true,
    redZoneOverlapPct: 78,
    riskScore: 76,
    priority: 'Short-Term',
    recommendedAction: 'Phased Permanent Resettlement within 6 Months',
    historicalDisasters: [
      { year: 2024, eventType: 'Downstream Flash Inundation', fatalities: 19, damageDesc: 'GVHSS Vellarmala school collapsed; riverbank scouring' },
      { year: 2019, eventType: 'Slope Slump on Terrace Cultivations', fatalities: 2, damageDesc: 'Agricultural loss and 8 dwellings damaged' }
    ],
    primaryHazardDrivers: [
      'Severe Riverbank Erosion & Channel Widening',
      'Vulnerability of Downstream Flood Plain Built-Up Areas',
      'Medium Slope Colluvial Slumping Risks'
    ],
    factors: {
      hazardRecurrence: 72,
      redZoneOverlap: 78,
      populationExposure: 82,
      accessibilityRisk: 74,
      slopeInstability: 73
    },
    explanation: {
      summary: 'Ranked #4 (Short-Term). 78% in Red Zone. Secondary river scouring compromises foundations, but immediate life-safety risk is lower than upper catchment settlements.',
      keyPoints: [
        'Secondary hazard impact from upstream burst rather than primary scarp generation.',
        'Allows structured 6-month planned transition and host-site land development.',
        'Requires ongoing monsoon warning telemetry while resettlement site is prepped.'
      ],
      statutoryJustification: 'Designated as Tier-2 relocation under Kerala Post-Disaster Need Assessment (PDNA).'
    }
  },
  {
    id: 'SET-05',
    name: 'Attamala',
    localPanchayat: 'Meppadi Grama Panchayat',
    lat: 11.5120,
    lng: 76.1950,
    population: 560,
    households: 140,
    areaSqKm: 3.6,
    hazardExposure: 'Moderate',
    vulnerabilityScore: 61,
    slopeDegrees: 21.4,
    soilErosionClass: 'Moderate',
    isPermanentRedZone: false,
    redZoneOverlapPct: 42,
    riskScore: 62,
    priority: 'Medium-Term',
    recommendedAction: 'Selective Slope Stabilization & Monitored Voluntary Resettlement',
    historicalDisasters: [
      { year: 2024, eventType: 'Isolation & Peripheral Mudslides', fatalities: 1, damageDesc: 'Road blocked for 12 days; no direct mass casualty' }
    ],
    primaryHazardDrivers: [
      'Peripheral Access Isolation During Extreme Rains',
      'Partial Overlap with Secondary Drainage Swales',
      'Localized Minor Slump Susceptibility'
    ],
    factors: {
      hazardRecurrence: 55,
      redZoneOverlap: 42,
      populationExposure: 64,
      accessibilityRisk: 79,
      slopeInstability: 60
    },
    explanation: {
      summary: 'Ranked #5 (Medium-Term). Does not exhibit full crown detachment or debris flow trajectory. Only 42% falls inside conservative Red Zone boundary.',
      keyPoints: [
        'Predominantly an isolation risk due to road blockage rather than structural habitat erasure.',
        'Eligible for prioritized road buttressing and voluntary relocation matching in Phase 2.',
        'Lower immediate life-safety risk permits orderly multi-year resettlement.'
      ],
      statutoryJustification: 'Monitored under DDMA Watchlist as per National Disaster Management Guidelines.'
    }
  }
];

export const CANDIDATE_SITES_DATA: CandidateSite[] = [
  {
    id: 'SITE-01',
    name: 'Site Alpha — Kalpetta East Plateau',
    locationName: 'Kalpetta East Ridge Parcel',
    panchayat: 'Kalpetta Municipality / Kaniyambetta',
    lat: 11.6150,
    lng: 76.1050,
    areaHectares: 28.5,
    meanSlopeDegrees: 4.2,
    elevationMeters: 780,
    distanceToSettlements: {
      'SET-01': 18.4,
      'SET-02': 16.2,
      'SET-03': 21.5,
      'SET-04': 14.8,
      'SET-05': 19.1,
    },
    suitabilityScore: 86,
    suitabilityFactors: {
      hazardSafety: 96,
      buildableSlope: 94,
      roadConnectivity: 91,
      waterProximity: 68,
      healthcareAccess: 88,
      schoolAccess: 82,
      landTenure: 90
    },
    rawConstraints: {
      buildableLandAreaSqMeters: 142500,
      minPlotAreaSqMetersPerHH: 160,
      internalInfraOverheadPct: 35,
      waterSustainableYieldLitersPerDay: 183600,
      waterLpcdStandard: 135,
      roadWidthMeters: 12.0,
      roadHourlyPcuCapacity: 1200,
      healthcareFacilityName: 'General Hospital Kalpetta (3.8 km)',
      healthcareAvailableBedCapacityHH: 480,
      schoolName: 'Govt Model HSS Kalpetta (2.1 km)',
      schoolAvailableSeatCapacityHH: 410,
      existingHostPopulationHH: 45,
      hazardBufferDeductionPct: 5,
    },
    calculatedCapacity: {
      landCapacityHH: 580,
      waterCapacityHH: 340,
      roadCapacityHH: 520,
      healthCapacityHH: 480,
      schoolCapacityHH: 410,
      netSafeAbsorptionCapacityHH: 340,
      netSafePopulationCapacity: 1360,
      bindingConstraint: 'Water Infrastructure',
      bindingConstraintExplanation: 'State PHED bulk pipeline capacity is 183,600 L/day, which at CPHEEO standard 135 lpcd for 4 persons/HH mathematically caps safe absorption at 340 households, despite land availability for 580 households.',
      limitingBottleneckValue: '183,600 L/day capacity',
      limitingBottleneckRequired: '313,200 L/day needed for full land utilization'
    },
    boundaryGeoJson: [
      [11.6110, 76.1010],
      [11.6190, 76.1020],
      [11.6210, 76.1090],
      [11.6130, 76.1110],
      [11.6110, 76.1010]
    ]
  },
  {
    id: 'SITE-02',
    name: 'Site Beta — Nedumbala Gentle Terraces',
    locationName: 'Nedumbala Tea Board Vesting Land',
    panchayat: 'Muppainad Grama Panchayat',
    lat: 11.5820,
    lng: 76.1550,
    areaHectares: 34.0,
    meanSlopeDegrees: 6.1,
    elevationMeters: 810,
    distanceToSettlements: {
      'SET-01': 14.2,
      'SET-02': 11.8,
      'SET-03': 16.5,
      'SET-04': 9.6,
      'SET-05': 12.4,
    },
    suitabilityScore: 81,
    suitabilityFactors: {
      hazardSafety: 92,
      buildableSlope: 88,
      roadConnectivity: 64,
      waterProximity: 89,
      healthcareAccess: 78,
      schoolAccess: 84,
      landTenure: 92
    },
    rawConstraints: {
      buildableLandAreaSqMeters: 170000,
      minPlotAreaSqMetersPerHH: 160,
      internalInfraOverheadPct: 35,
      waterSustainableYieldLitersPerDay: 297000,
      waterLpcdStandard: 135,
      roadWidthMeters: 5.5,
      roadHourlyPcuCapacity: 600,
      healthcareFacilityName: 'CHC Meppadi / Muppainad (4.2 km)',
      healthcareAvailableBedCapacityHH: 510,
      schoolName: 'St Joseph HSS & Govt LPS Meppadi (3.0 km)',
      schoolAvailableSeatCapacityHH: 530,
      existingHostPopulationHH: 60,
      hazardBufferDeductionPct: 8,
    },
    calculatedCapacity: {
      landCapacityHH: 720,
      waterCapacityHH: 550,
      roadCapacityHH: 490,
      healthCapacityHH: 510,
      schoolCapacityHH: 530,
      netSafeAbsorptionCapacityHH: 490,
      netSafePopulationCapacity: 1960,
      bindingConstraint: 'Road Access / Evacuation Width',
      bindingConstraintExplanation: 'The approach bridge over Chaliyar tributary has a single-lane 5.5m width restriction. PWD evacuation clearance model caps rapid disaster egress capacity at 490 households, restricting otherwise ample land and water.',
      limitingBottleneckValue: '5.5m approach bridge width',
      limitingBottleneckRequired: '8.5m double-lane standard for 720 HH egress'
    },
    boundaryGeoJson: [
      [11.5780, 76.1510],
      [11.5870, 76.1520],
      [11.5890, 76.1600],
      [11.5800, 76.1620],
      [11.5780, 76.1510]
    ]
  },
  {
    id: 'SITE-03',
    name: 'Site Gamma — Pozhuthana Highland Shelf',
    locationName: 'Pozhuthana Plateau Vesting Area',
    panchayat: 'Pozhuthana Grama Panchayat',
    lat: 11.6200,
    lng: 76.0450,
    areaHectares: 22.0,
    meanSlopeDegrees: 5.8,
    elevationMeters: 840,
    distanceToSettlements: {
      'SET-01': 22.8,
      'SET-02': 20.4,
      'SET-03': 24.1,
      'SET-04': 19.2,
      'SET-05': 23.5,
    },
    suitabilityScore: 78,
    suitabilityFactors: {
      hazardSafety: 95,
      buildableSlope: 89,
      roadConnectivity: 82,
      waterProximity: 81,
      healthcareAccess: 76,
      schoolAccess: 59,
      landTenure: 85
    },
    rawConstraints: {
      buildableLandAreaSqMeters: 110000,
      minPlotAreaSqMetersPerHH: 160,
      internalInfraOverheadPct: 35,
      waterSustainableYieldLitersPerDay: 226800,
      waterLpcdStandard: 135,
      roadWidthMeters: 9.0,
      roadHourlyPcuCapacity: 950,
      healthcareFacilityName: 'Pozhuthana FHC & Vythiri Taluk Hospital (5.8 km)',
      healthcareAvailableBedCapacityHH: 440,
      schoolName: 'GLPS Pozhuthana (1.8 km)',
      schoolAvailableSeatCapacityHH: 310,
      existingHostPopulationHH: 35,
      hazardBufferDeductionPct: 6,
    },
    calculatedCapacity: {
      landCapacityHH: 450,
      waterCapacityHH: 420,
      roadCapacityHH: 380,
      healthCapacityHH: 440,
      schoolCapacityHH: 310,
      netSafeAbsorptionCapacityHH: 310,
      netSafePopulationCapacity: 1240,
      bindingConstraint: 'School & Educational Capacity',
      bindingConstraintExplanation: 'Primary & High School seat intake within 3 km catchment is limited to 310 additional student-households under UDISE+ standards. Without school expansion, safe social absorption is capped at 310 households.',
      limitingBottleneckValue: '310 school seats available',
      limitingBottleneckRequired: '450 seats needed for full land buildout'
    },
    boundaryGeoJson: [
      [11.6160, 76.0410],
      [11.6250, 76.0420],
      [11.6260, 76.0490],
      [11.6180, 76.0500],
      [11.6160, 76.0410]
    ]
  },
  {
    id: 'SITE-04',
    name: 'Site Delta — Ambalavayal South Bench',
    locationName: 'Ambalavayal Krishi Vigyan Kendra Contiguous Parcel',
    panchayat: 'Ambalavayal Grama Panchayat',
    lat: 11.6230,
    lng: 76.2100,
    areaHectares: 26.0,
    meanSlopeDegrees: 3.9,
    elevationMeters: 920,
    distanceToSettlements: {
      'SET-01': 17.5,
      'SET-02': 15.1,
      'SET-03': 19.8,
      'SET-04': 14.2,
      'SET-05': 18.0,
    },
    suitabilityScore: 84,
    suitabilityFactors: {
      hazardSafety: 97,
      buildableSlope: 96,
      roadConnectivity: 86,
      waterProximity: 80,
      healthcareAccess: 65,
      schoolAccess: 88,
      landTenure: 93
    },
    rawConstraints: {
      buildableLandAreaSqMeters: 130000,
      minPlotAreaSqMetersPerHH: 160,
      internalInfraOverheadPct: 35,
      waterSustainableYieldLitersPerDay: 210600,
      waterLpcdStandard: 135,
      roadWidthMeters: 10.5,
      roadHourlyPcuCapacity: 1100,
      healthcareFacilityName: 'Ambalavayal FHC & CHC Sulthan Bathery (6.5 km)',
      healthcareAvailableBedCapacityHH: 350,
      schoolName: 'Govt Vocational HSS Ambalavayal (1.6 km)',
      schoolAvailableSeatCapacityHH: 420,
      existingHostPopulationHH: 50,
      hazardBufferDeductionPct: 4,
    },
    calculatedCapacity: {
      landCapacityHH: 520,
      waterCapacityHH: 390,
      roadCapacityHH: 480,
      healthCapacityHH: 350,
      schoolCapacityHH: 420,
      netSafeAbsorptionCapacityHH: 350,
      netSafePopulationCapacity: 1400,
      bindingConstraint: 'Healthcare Capacity',
      bindingConstraintExplanation: 'National Health Mission norms require 1 Primary Health Sub-Centre per 5,000 population. Local FHC capacity can absorb a maximum of 350 incoming households before doctor-to-patient and emergency bed thresholds are violated.',
      limitingBottleneckValue: '350 HH healthcare threshold',
      limitingBottleneckRequired: '520 HH needed for full land buildout'
    },
    boundaryGeoJson: [
      [11.6190, 76.2050],
      [11.6280, 76.2070],
      [11.6290, 76.2160],
      [11.6210, 76.2170],
      [11.6190, 76.2050]
    ]
  }
];

export const RED_ZONE_VERSIONS: Record<'v1.0-2025' | 'v2.0-2026', RedZoneVersionData> = {
  'v1.0-2025': {
    version: 'v1.0-2025',
    label: 'Version 1.0 (Pre-Monsoon Jan 2025 Baseline)',
    date: '15 January 2025',
    gazetteNotification: 'KSDMA/SEC/GZ-2025/082',
    totalAreaSqKm: 14.2,
    habitationsCondemned: 2,
    populationExposed: 2100,
    criteria: [
      'Active slope scars from 2019-2020 events (>25° angle)',
      'Direct 50-meter riverbed riparian buffer',
      'Structural crack lineation observed in Geological Survey 2021 mapping'
    ],
    reassessmentSummary: 'Initial hazard envelope delineated following 2019 Puthumala and 2020 Meppadi events. Confined predominantly to lower valley floor and primary stream channel.',
    polygonRings: [
      [
        [11.5300, 76.1700],
        [11.5420, 76.1750],
        [11.5500, 76.1950],
        [11.5450, 76.2080],
        [11.5350, 76.1900],
        [11.5280, 76.1780],
        [11.5300, 76.1700]
      ]
    ]
  },
  'v2.0-2026': {
    version: 'v2.0-2026',
    label: 'Version 2.0 (Post-Event Comprehensive Reassessment 2026)',
    date: '02 January 2026',
    gazetteNotification: 'KSDMA/SEC/GZ-2026/014-AMENDED',
    totalAreaSqKm: 23.8,
    habitationsCondemned: 4,
    populationExposed: 5460,
    criteria: [
      'Recurrence: >= 2 catastrophic debris-flow events in 10-year rolling window',
      'Upper Catchment Crown Detachment Zone (>30° slope with weathered saprolite)',
      'High-velocity (>20 m/s) boulder debris runout corridor',
      'Complete loss of redundant arterial evacuation routes / islanding risk',
      'Hydrological channel elevation (>3m bed aggradation)'
    ],
    reassessmentSummary: 'Comprehensive multi-agency reassessment (KSDMA, GSI, NRSC/ISRO, CWRDM) following the July 2024 disaster. Expanded by +9.6 sq.km to encompass upper Punchirimattom detachment scars, entire Chooralmala confluence, and Vellarmala scour zones.',
    polygonRings: [
      [
        [11.5220, 76.1550],
        [11.5340, 76.1620],
        [11.5480, 76.1750],
        [11.5620, 76.2050],
        [11.5680, 76.2250],
        [11.5550, 76.2300],
        [11.5380, 76.2150],
        [11.5250, 76.1850],
        [11.5180, 76.1680],
        [11.5220, 76.1550]
      ]
    ]
  }
};

export const MULTI_HAZARD_LAYERS_CONFIG = [
  { id: 'landslide', name: 'Landslide Susceptibility (GSI High Hazard Zone)', color: '#dc2626', opacity: 0.45, active: true },
  { id: 'debris_runout', name: 'Debris Flow Runout Corridors (>25 m/s)', color: '#ea580c', opacity: 0.55, active: true },
  { id: 'flood_inundation', name: '100-Year Flash Floodway Buffer', color: '#0284c7', opacity: 0.4, active: false },
  { id: 'slope_steep', name: 'Critical Slope Gradient (>28°)', color: '#d97706', opacity: 0.35, active: false },
  { id: 'red_zone', name: 'Permanent Unsuitability Red Zone', color: '#b91c1c', opacity: 0.6, active: true },
  { id: 'candidate_sites', name: 'Candidate Resettlement Sites (Safe Enclaves)', color: '#059669', opacity: 0.7, active: true },
  { id: 'allocation_routes', name: 'Relocation Assignment Corridors', color: '#3b82f6', opacity: 0.85, active: true },
];
