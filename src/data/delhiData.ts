import { Settlement, CandidateSite, RedZoneVersionData } from '../types';

/**
 * EAST DELHI / DELHI NCR RELOCATION DECISION SUPPORT DATASET
 * Focus area: East Delhi District (Preet Vihar, Gandhi Nagar, Mayur Vihar) & USAR Surajmal Vihar Corridor
 * Scenario: Post-July 2023 Yamuna Flood Inundation & NGT Riverbed Protection Zone Resettlement
 */

export const DELHI_CENTER: [number, number] = [28.6538, 77.3015]; // Centered near USAR (University School of Automation and Robotics, Surajmal Vihar)
export const DELHI_BOUNDS = {
  minLat: 28.580,
  maxLat: 28.740,
  minLng: 77.220,
  maxLng: 77.360,
};

export const SETTLEMENTS_DATA: Settlement[] = [
  {
    id: 'SET-01',
    name: 'Yamuna Khadar East (Old Loha Pul)',
    localPanchayat: 'Gandhi Nagar Sub-Division, East Delhi',
    lat: 28.6610,
    lng: 77.2550,
    population: 3850,
    households: 770,
    areaSqKm: 3.2,
    hazardExposure: 'Extreme',
    vulnerabilityScore: 95,
    slopeDegrees: 0.8,
    soilErosionClass: 'Critical',
    isPermanentRedZone: true,
    redZoneOverlapPct: 100,
    riskScore: 96,
    priority: 'Immediate',
    recommendedAction: 'Mandatory Permanent Relocation & Riverbed Khadar De-notification',
    historicalDisasters: [
      { year: 2023, eventType: 'Record 208.66m Yamuna Peak Inundation', fatalities: 7, damageDesc: 'Submerged 620 dwellings under 3.8m floodwaters; Ring Road regulator breached' },
      { year: 2019, eventType: 'Monsoon High Spillway Surge (8.28 Lakh Cusecs)', fatalities: 2, damageDesc: 'Complete agricultural and shelter loss; 14-day mandatory evacuation' },
      { year: 2013, eventType: 'Hathnikund Barrage Discharge Flash Surge', fatalities: 3, damageDesc: 'Kadar settlements inundated; 350 cattle lost' }
    ],
    primaryHazardDrivers: [
      'Active Riverbed Inundation (Below CWC 205.33m Danger Mark)',
      'Unprotected Riverbed Encroachment without Flood Bunding',
      'High Silt Liquefaction and Embankment Scouring Index',
      'Recurrent Submersion (>14 days) during every major Hathnikund spillway release'
    ],
    factors: {
      hazardRecurrence: 98,
      redZoneOverlap: 100,
      populationExposure: 94,
      accessibilityRisk: 92,
      slopeInstability: 96
    },
    explanation: {
      summary: 'Ranked #1 Priority for immediate permanent relocation due to triple catastrophic flood recurrence, 100% location inside statutory NGT Riverbed "O" Zone, and absence of physical flood protection bunding.',
      keyPoints: [
        'Central Water Commission (CWC) hydrological data confirms water level crossed 208.66m in July 2023, completely submerging the entire habitation.',
        'National Green Tribunal (NGT) Principal Bench orders prohibit any permanent structures within active Yamuna floodplains.',
        'Emergency evacuation requires boat rescue across active river currents during peak monsoon.'
      ],
      statutoryJustification: 'Mandated under Section 30(2)(v) of Disaster Management Act 2005 read with NGT River Yamuna Preservation Orders.'
    }
  },
  {
    id: 'SET-02',
    name: 'Garhi Mandu Floodplain Settlement',
    localPanchayat: 'Khajuri Khas / Shastri Park Sub-Division',
    lat: 28.6820,
    lng: 77.2480,
    population: 2940,
    households: 588,
    areaSqKm: 2.8,
    hazardExposure: 'Extreme',
    vulnerabilityScore: 92,
    slopeDegrees: 1.1,
    soilErosionClass: 'Critical',
    isPermanentRedZone: true,
    redZoneOverlapPct: 94,
    riskScore: 92,
    priority: 'Immediate',
    recommendedAction: 'Comprehensive Relocation & Riparian Flood Buffer Restoration',
    historicalDisasters: [
      { year: 2023, eventType: 'Yamuna Western Bund Seepage & Khadar Inundation', fatalities: 4, damageDesc: 'Over 410 dwellings submerged; access road severed for 9 days' },
      { year: 2021, eventType: 'Localized Silt Subsidence & Monsoon Waterlogging', fatalities: 1, damageDesc: '120 huts inundated due to stagnant drainage backflow' }
    ],
    primaryHazardDrivers: [
      'Direct Unbunded Exposure to Hathnikund Runoff Surge',
      'Marshy Alluvial Swale with Saturated Ground Table',
      'High Population Density in 50-Year Flood Envelope',
      'Absence of Regulated Stormwater Outfalls'
    ],
    factors: {
      hazardRecurrence: 92,
      redZoneOverlap: 94,
      populationExposure: 92,
      accessibilityRisk: 89,
      slopeInstability: 88
    },
    explanation: {
      summary: 'Ranked #2 Priority due to direct unbunded exposure to high-velocity flood runoff. 94% of the built-up cluster lies within the statutory Red Zone.',
      keyPoints: [
        'Riverbed silt deposition has elevated surrounding ground, causing ponding during normal rains.',
        'Dense population (2,940 residents) creates severe humanitarian exposure during sudden nighttime barrage water releases.',
        'Zero motorable access during monsoon alerts.'
      ],
      statutoryJustification: 'Designated for habitational de-densification under Delhi Disaster Management Plan.'
    }
  },
  {
    id: 'SET-03',
    name: 'Bela Estate / Shastri Park Lowland Fringe',
    localPanchayat: 'Gandhi Nagar Sub-Division, East Delhi',
    lat: 28.6690,
    lng: 77.2620,
    population: 1820,
    households: 364,
    areaSqKm: 2.1,
    hazardExposure: 'Extreme',
    vulnerabilityScore: 88,
    slopeDegrees: 1.4,
    soilErosionClass: 'Critical',
    isPermanentRedZone: true,
    redZoneOverlapPct: 88,
    riskScore: 88,
    priority: 'Immediate',
    recommendedAction: 'Phased Permanent Resettlement & PWD Embankment Strengthening',
    historicalDisasters: [
      { year: 2023, eventType: 'Shastri Park Culvert Siphon Backflow Surge', fatalities: 2, damageDesc: '280 houses flooded; drinking water supply contaminated' },
      { year: 2019, eventType: 'Yamuna Bund Backwater Surge', fatalities: 0, damageDesc: '150 families evacuated to relief camps' }
    ],
    primaryHazardDrivers: [
      'Critical Drainage Siphon Backflow Point during High River Stage',
      'Lowland Depression below Embankment Crown',
      'Unstable Sandy Loam Foundations Prone to Siphon Collapse'
    ],
    factors: {
      hazardRecurrence: 86,
      redZoneOverlap: 88,
      populationExposure: 84,
      accessibilityRisk: 91,
      slopeInstability: 89
    },
    explanation: {
      summary: 'Ranked #3 Priority. While smaller in population (1,820), the settlement sits directly in the drainage depression where stormwater backflows when river levels rise.',
      keyPoints: [
        'Drainage culvert gates under Shastri Park road failed in July 2023, causing instantaneous inundation.',
        'Groundwater table stands at 0.5m during monsoon, preventing soakage and creating severe contamination.',
        'Access via narrow earthen embankment road prone to washouts.'
      ],
      statutoryJustification: 'Classified under Delhi Master Plan (MPD-2041) as Non-Habitable River Buffer Zone.'
    }
  },
  {
    id: 'SET-04',
    name: 'Usmanpur Dhall Lowlands',
    localPanchayat: 'East / North East Delhi District',
    lat: 28.6750,
    lng: 77.2590,
    population: 2150,
    households: 430,
    areaSqKm: 2.6,
    hazardExposure: 'High',
    vulnerabilityScore: 74,
    slopeDegrees: 1.2,
    soilErosionClass: 'Severe',
    isPermanentRedZone: true,
    redZoneOverlapPct: 72,
    riskScore: 75,
    priority: 'Short-Term',
    recommendedAction: 'Phased Permanent Resettlement within 6-Month Planning Window',
    historicalDisasters: [
      { year: 2023, eventType: 'Drainage Canal Overflow & Inundation', fatalities: 1, damageDesc: '190 homes flooded; power and water cutoff for 6 days' }
    ],
    primaryHazardDrivers: [
      'Drainage Canal Overspill Confluence',
      'High Silt Liquefaction and Foundation Scour Vulnerability',
      'Partial Protection from Embankment Bund'
    ],
    factors: {
      hazardRecurrence: 72,
      redZoneOverlap: 72,
      populationExposure: 80,
      accessibilityRisk: 72,
      slopeInstability: 70
    },
    explanation: {
      summary: 'Ranked #4 (Short-Term). 72% within Red Zone. Suffers severe drainage congestion and canal overspill, but protected on northern perimeter by ring road embankment.',
      keyPoints: [
        'Secondary flood impact from stormwater backup rather than direct river current.',
        'Enables structured 6-month planned transition to nearby candidate sites.',
        'Requires monsoon telemetry monitoring until resettlement is executed.'
      ],
      statutoryJustification: 'Designated as Tier-2 Relocation Habitation under Delhi Flood Mitigation Strategy.'
    }
  },
  {
    id: 'SET-05',
    name: 'Sonia Vihar Marginal Bund Enclave',
    localPanchayat: 'North East / East Delhi District',
    lat: 28.7110,
    lng: 77.2520,
    population: 1480,
    households: 296,
    areaSqKm: 1.9,
    hazardExposure: 'Moderate',
    vulnerabilityScore: 60,
    slopeDegrees: 1.0,
    soilErosionClass: 'Moderate',
    isPermanentRedZone: false,
    redZoneOverlapPct: 45,
    riskScore: 61,
    priority: 'Medium-Term',
    recommendedAction: 'Embankment Ring Buttressing & Monitored Voluntary Relocation',
    historicalDisasters: [
      { year: 2023, eventType: 'Perimeter Bund Overtopping & Seepage', fatalities: 0, damageDesc: 'Agricultural loss and 45 dwellings inundated' }
    ],
    primaryHazardDrivers: [
      'Perimeter Bund Overtopping Vulnerability during Super-Surges',
      'Backwater Seepage into Low-Lying Farm Pockets',
      'Moderate Silt Stability'
    ],
    factors: {
      hazardRecurrence: 54,
      redZoneOverlap: 45,
      populationExposure: 62,
      accessibilityRisk: 76,
      slopeInstability: 58
    },
    explanation: {
      summary: 'Ranked #5 (Medium-Term). Only 45% falls within the conservative Red Zone boundary. Primary risk is bund overtopping during rare super-floods.',
      keyPoints: [
        'Predominantly an isolation and agricultural loss risk rather than structural habitat erasure.',
        'Eligible for prioritized PWD bund reinforcement in Phase 1 and voluntary relocation in Phase 2.',
        'Ordered multi-year transition feasible.'
      ],
      statutoryJustification: 'Monitored under DDMA Watchlist as per National Disaster Management Guidelines.'
    }
  }
];

export const CANDIDATE_SITES_DATA: CandidateSite[] = [
  {
    id: 'SITE-01',
    name: 'Site Alpha — Karkardooma Institutional Extension (Near USAR Hub)',
    locationName: 'Surajmal Vihar Institutional Zone (Adjacent to USAR, GGSIPU East Delhi Campus)',
    panchayat: 'Preet Vihar Sub-Division, East Delhi',
    lat: 28.6538,
    lng: 77.3015,
    areaHectares: 32.0,
    meanSlopeDegrees: 1.1,
    elevationMeters: 216,
    distanceToSettlements: {
      'SET-01': 5.2,
      'SET-02': 6.8,
      'SET-03': 4.6,
      'SET-04': 5.9,
      'SET-05': 8.5,
    },
    suitabilityScore: 88,
    suitabilityFactors: {
      hazardSafety: 98,
      buildableSlope: 96,
      roadConnectivity: 94,
      waterProximity: 68,
      healthcareAccess: 92,
      schoolAccess: 90,
      landTenure: 91
    },
    rawConstraints: {
      buildableLandAreaSqMeters: 160000,
      minPlotAreaSqMetersPerHH: 160,
      internalInfraOverheadPct: 35,
      waterSustainableYieldLitersPerDay: 334800, // DJB Bhagirathi WTP bulk pipeline allocation
      waterLpcdStandard: 135,
      roadWidthMeters: 14.0, // Multi-lane Vikas Marg / CBD Ground Corridor
      roadHourlyPcuCapacity: 1400,
      healthcareFacilityName: 'Dr. Hedgewar Arogya Sansthan Karkardooma (1.8 km)',
      healthcareAvailableBedCapacityHH: 740,
      schoolName: 'Govt Model Sarvodaya Bal/Kanya Vidyalaya Surajmal Vihar (1.2 km)',
      schoolAvailableSeatCapacityHH: 710,
      existingHostPopulationHH: 50,
      hazardBufferDeductionPct: 4,
    },
    calculatedCapacity: {
      landCapacityHH: 820,
      waterCapacityHH: 620, // BINDING CONSTRAINT!
      roadCapacityHH: 850,
      healthCapacityHH: 740,
      schoolCapacityHH: 710,
      netSafeAbsorptionCapacityHH: 620,
      netSafePopulationCapacity: 2480,
      bindingConstraint: 'Water Infrastructure',
      bindingConstraintExplanation: 'Delhi Jal Board (DJB) Bhagirathi WTP bulk pipeline yield is 334,800 L/day, which at CPHEEO standard 135 lpcd for 4 persons/HH mathematically caps safe absorption at 620 households, despite buildable land available for 820 households.',
      limitingBottleneckValue: '334,800 L/day pipeline yield',
      limitingBottleneckRequired: '442,800 L/day needed for full 820 HH land buildout'
    },
    boundaryGeoJson: [
      [28.6500, 77.2970],
      [28.6580, 77.2980],
      [28.6600, 77.3060],
      [28.6510, 77.3070],
      [28.6500, 77.2970]
    ]
  },
  {
    id: 'SITE-02',
    name: 'Site Beta — Mandoli Planned Resettlement Enclave',
    locationName: 'Mandoli Sub-City Planned Sector (Near Gagan Cinema / Wazirabad Road)',
    panchayat: 'Shahdara / North East Delhi Border',
    lat: 28.7010,
    lng: 77.3150,
    areaHectares: 40.0,
    meanSlopeDegrees: 1.3,
    elevationMeters: 218,
    distanceToSettlements: {
      'SET-01': 7.8,
      'SET-02': 6.2,
      'SET-03': 7.1,
      'SET-04': 6.5,
      'SET-05': 6.8,
    },
    suitabilityScore: 84,
    suitabilityFactors: {
      hazardSafety: 96,
      buildableSlope: 94,
      roadConnectivity: 66,
      waterProximity: 88,
      healthcareAccess: 80,
      schoolAccess: 86,
      landTenure: 92
    },
    rawConstraints: {
      buildableLandAreaSqMeters: 200000,
      minPlotAreaSqMetersPerHH: 160,
      internalInfraOverheadPct: 35,
      waterSustainableYieldLitersPerDay: 475200,
      waterLpcdStandard: 135,
      roadWidthMeters: 7.0, // Intermediate bridge bottleneck over railway corridor
      roadHourlyPcuCapacity: 800,
      healthcareFacilityName: 'Guru Teg Bahadur (GTB) Hospital Dilshad Garden (3.5 km)',
      healthcareAvailableBedCapacityHH: 820,
      schoolName: 'Govt Boys/Girls Senior Secondary School Mandoli (1.5 km)',
      schoolAvailableSeatCapacityHH: 850,
      existingHostPopulationHH: 65,
      hazardBufferDeductionPct: 6,
    },
    calculatedCapacity: {
      landCapacityHH: 950,
      waterCapacityHH: 880,
      roadCapacityHH: 780, // BINDING CONSTRAINT!
      healthCapacityHH: 820,
      schoolCapacityHH: 850,
      netSafeAbsorptionCapacityHH: 780,
      netSafePopulationCapacity: 3120,
      bindingConstraint: 'Road Access / Evacuation Width',
      bindingConstraintExplanation: 'The approach bridge connecting the sector across the rail spur has a 7.0m width restriction. PWD evacuation clearance model caps rapid disaster egress capacity at 780 households, restricting otherwise ample land and water.',
      limitingBottleneckValue: '7.0m railway overbridge bottleneck',
      limitingBottleneckRequired: '10.5m 3-lane standard for 950 HH evacuation clearance'
    },
    boundaryGeoJson: [
      [28.6970, 77.3100],
      [28.7060, 77.3120],
      [28.7080, 77.3210],
      [28.6990, 77.3220],
      [28.6970, 77.3100]
    ]
  },
  {
    id: 'SITE-03',
    name: 'Site Gamma — Anand Vihar - Ghazipur Transition Sector',
    locationName: 'Anand Vihar Transport & Institutional Buffer (Near ISBT / Ghazipur)',
    panchayat: 'Mayur Vihar Sub-Division, East Delhi',
    lat: 28.6380,
    lng: 77.3180,
    areaHectares: 28.0,
    meanSlopeDegrees: 1.0,
    elevationMeters: 214,
    distanceToSettlements: {
      'SET-01': 6.9,
      'SET-02': 8.4,
      'SET-03': 6.2,
      'SET-04': 7.5,
      'SET-05': 10.2,
    },
    suitabilityScore: 79,
    suitabilityFactors: {
      hazardSafety: 95,
      buildableSlope: 92,
      roadConnectivity: 89,
      waterProximity: 82,
      healthcareAccess: 78,
      schoolAccess: 61,
      landTenure: 85
    },
    rawConstraints: {
      buildableLandAreaSqMeters: 140000,
      minPlotAreaSqMetersPerHH: 160,
      internalInfraOverheadPct: 35,
      waterSustainableYieldLitersPerDay: 345600,
      waterLpcdStandard: 135,
      roadWidthMeters: 12.0,
      roadHourlyPcuCapacity: 1100,
      healthcareFacilityName: 'Lal Bahadur Shastri (LBS) Hospital Khichripur (3.2 km)',
      healthcareAvailableBedCapacityHH: 650,
      schoolName: 'Govt Co-ed Sarvodaya Vidyalaya Ghazipur (1.8 km)',
      schoolAvailableSeatCapacityHH: 490, // BINDING CONSTRAINT!
      existingHostPopulationHH: 45,
      hazardBufferDeductionPct: 5,
    },
    calculatedCapacity: {
      landCapacityHH: 680,
      waterCapacityHH: 640,
      roadCapacityHH: 610,
      healthCapacityHH: 650,
      schoolCapacityHH: 490, // BINDING CONSTRAINT!
      netSafeAbsorptionCapacityHH: 490,
      netSafePopulationCapacity: 1960,
      bindingConstraint: 'School & Educational Capacity',
      bindingConstraintExplanation: 'Primary & Secondary classroom intake within 3 km catchment is limited to 490 additional student-households under UDISE+ standards. Without school expansion, safe social absorption is capped at 490 households.',
      limitingBottleneckValue: '490 school seats available',
      limitingBottleneckRequired: '680 seats needed for full land buildout'
    },
    boundaryGeoJson: [
      [28.6340, 77.3130],
      [28.6430, 77.3150],
      [28.6440, 77.3230],
      [28.6360, 77.3240],
      [28.6340, 77.3130]
    ]
  },
  {
    id: 'SITE-04',
    name: 'Site Delta — Bakkarwala Institutional Resettlement Sector',
    locationName: 'Bakkarwala Urban Extension Sector (Delhi NCR Border)',
    panchayat: 'Delhi Development Authority Planned Sector',
    lat: 28.6650,
    lng: 77.3320,
    areaHectares: 30.0,
    meanSlopeDegrees: 0.9,
    elevationMeters: 217,
    distanceToSettlements: {
      'SET-01': 8.5,
      'SET-02': 9.6,
      'SET-03': 8.1,
      'SET-04': 8.9,
      'SET-05': 11.0,
    },
    suitabilityScore: 82,
    suitabilityFactors: {
      hazardSafety: 97,
      buildableSlope: 95,
      roadConnectivity: 88,
      waterProximity: 82,
      healthcareAccess: 67,
      schoolAccess: 87,
      landTenure: 93
    },
    rawConstraints: {
      buildableLandAreaSqMeters: 150000,
      minPlotAreaSqMetersPerHH: 160,
      internalInfraOverheadPct: 35,
      waterSustainableYieldLitersPerDay: 367200,
      waterLpcdStandard: 135,
      roadWidthMeters: 11.0,
      roadHourlyPcuCapacity: 1150,
      healthcareFacilityName: 'Civil Hospital / Primary Health Centre Hub (4.5 km)',
      healthcareAvailableBedCapacityHH: 560, // BINDING CONSTRAINT!
      schoolName: 'Govt Sarvodaya Kanya/Bal Vidyalaya (1.9 km)',
      schoolAvailableSeatCapacityHH: 670,
      existingHostPopulationHH: 50,
      hazardBufferDeductionPct: 4,
    },
    calculatedCapacity: {
      landCapacityHH: 720,
      waterCapacityHH: 680,
      roadCapacityHH: 650,
      healthCapacityHH: 560, // BINDING CONSTRAINT!
      schoolCapacityHH: 670,
      netSafeAbsorptionCapacityHH: 560,
      netSafePopulationCapacity: 2240,
      bindingConstraint: 'Healthcare Capacity',
      bindingConstraintExplanation: 'National Health Mission norms require 1 Primary Health Sub-Centre per 5,000 population. Local health centre capacity can absorb a maximum of 560 incoming households before doctor-to-patient and emergency bed thresholds are violated.',
      limitingBottleneckValue: '560 HH healthcare threshold',
      limitingBottleneckRequired: '720 HH needed for full land buildout'
    },
    boundaryGeoJson: [
      [28.6610, 77.3270],
      [28.6700, 77.3290],
      [28.6710, 77.3380],
      [28.6630, 77.3390],
      [28.6610, 77.3270]
    ]
  }
];

export const RED_ZONE_VERSIONS: Record<'v1.0-2024' | 'v2.0-2025', RedZoneVersionData> = {
  'v1.0-2024': {
    version: 'v1.0-2024' as any,
    label: 'Version 1.0 (Pre-Monsoon Jan 2024 Baseline)',
    date: '15 January 2024',
    gazetteNotification: 'DDMA/DEL/GZ-2024/091',
    totalAreaSqKm: 18.5,
    habitationsCondemned: 2,
    populationExposed: 5200,
    criteria: [
      'Immediate active Yamuna river watercourse below 204.5m MSL',
      'Direct 50-meter riparian ecological buffer',
      'National Green Tribunal (NGT) 2015 prohibited active floodplain boundary'
    ],
    reassessmentSummary: 'Initial hazard envelope delineated prior to 2023 flood season. Confined strictly to low-lying agricultural fringes directly adjacent to the active stream channel.',
    polygonRings: [
      [
        [28.6500, 77.2500],
        [28.6650, 77.2520],
        [28.6850, 77.2450],
        [28.6900, 77.2500],
        [28.6700, 77.2600],
        [28.6520, 77.2580],
        [28.6500, 77.2500]
      ]
    ]
  },
  'v2.0-2025': {
    version: 'v2.0-2025' as any,
    label: 'Version 2.0 (Post-July 2023 Floods Comprehensive Reassessment)',
    date: '02 January 2025',
    gazetteNotification: 'DDMA/DEL/GZ-2025/018-AMENDED',
    totalAreaSqKm: 31.2,
    habitationsCondemned: 4,
    populationExposed: 12240,
    criteria: [
      'Recurrence: Exceeded CWC Extreme Flood Level (crossing 208.66m in July 2023)',
      'Submersion Depth: Lowlands inundated under >3.5m floodwaters for >5 consecutive days',
      'Embankment Vulnerability: Seepage, drainage backflow, and earthen bund breach corridors',
      'Statutory River Yamuna Preservation Zone ("O" Zone) permanent non-habitation declaration'
    ],
    reassessmentSummary: 'Comprehensive multi-agency reassessment (DDMA, CWC, Delhi Irrigation & Flood Control Dept, NGT High Committee) following the unprecedented July 2023 floods. Expanded by +12.7 sq.km to encompass Garhi Mandu, Shastri Park lowlands, and Yamuna Khadar floodway reaches up to Ring Road / Vikas Marg embankments.',
    polygonRings: [
      [
        [28.6450, 77.2480],
        [28.6600, 77.2500],
        [28.6750, 77.2420],
        [28.7050, 77.2460],
        [28.7180, 77.2550],
        [28.7000, 77.2650],
        [28.6800, 77.2680],
        [28.6620, 77.2700],
        [28.6480, 77.2620],
        [28.6450, 77.2480]
      ]
    ]
  }
};

export const MULTI_HAZARD_LAYERS_CONFIG = [
  { id: 'flood_inundation', name: 'Yamuna River 100-Year Peak Flood Inundation (>208.66m Level)', color: '#0284c7', opacity: 0.55, active: true },
  { id: 'khadar_surge', name: 'Active Floodplain Khadar Surge Runout Corridor', color: '#ea580c', opacity: 0.45, active: true },
  { id: 'drain_backflow', name: 'Embankment Seepage & Siphon Backflow Zone', color: '#d97706', opacity: 0.4, active: false },
  { id: 'silt_liquefaction', name: 'Saturated Alluvial Soil Liquefaction Zone', color: '#b45309', opacity: 0.35, active: false },
  { id: 'red_zone', name: 'Statutory Permanent Unsuitability Red Zone (NGT O-Zone)', color: '#b91c1c', opacity: 0.6, active: true },
  { id: 'candidate_sites', name: 'Candidate Resettlement Sites (Karkardooma / Mandoli / Anand Vihar)', color: '#15803d', opacity: 0.7, active: true },
  { id: 'allocation_routes', name: 'Relocation Assignment Corridors', color: '#1d4ed8', opacity: 0.85, active: true },
];
