export type PriorityLevel = 'Immediate' | 'Short-Term' | 'Medium-Term';
export type SiteStatus = 'FEASIBLE' | 'LIMITED' | 'REJECTED';

export interface HistoricalDisasterEvent {
  year: number;
  eventType: string;
  fatalities: number;
  damageDesc: string;
}

export interface SettlementRiskBreakdown {
  floodInundationRisk: number;      // 0-100: CWC 208.66m flood depth envelope
  siltLiquefactionRisk: number;     // 0-100: Saturated alluvial sand scour
  drainageBackflowRisk: number;     // 0-100: Siphon / regulator closure backwater
  populationVulnerability: number;  // 0-100: Non-pucca density & socio-economic
  historicalDisasterRecurrence: number; // 0-100: 2013, 2019, 2023 flood events
  accessibilityImpedance: number;   // 0-100: Roadway submergence & boat dependency
}

export interface Settlement {
  id: string;
  name: string;
  localPanchayat: string;
  lat: number;
  lng: number;
  population: number;
  households: number;
  areaSqKm: number;
  hazardExposure: 'Extreme' | 'Very High' | 'High' | 'Moderate';
  vulnerabilityScore: number; // 0-100
  historicalDisasters: HistoricalDisasterEvent[];
  redZoneOverlapPct: number;
  isPermanentRedZone: boolean;
  slopeDegrees: number;
  soilErosionClass: 'Critical' | 'Severe' | 'Moderate';
  primaryHazardDrivers: string[];
  riskScore: number; // 0-100
  priority: PriorityLevel;
  recommendedAction: string;
  riskBreakdown: SettlementRiskBreakdown;
  keyRiskDrivers: string[];
  factors: {
    hazardRecurrence: number;
    redZoneOverlap: number;
    populationExposure: number;
    accessibilityRisk: number;
    slopeInstability: number;
  };
  explanation: {
    summary: string;
    keyPoints: string[];
    statutoryJustification: string;
  };
}

export type ConstraintType = 
  | 'Water Infrastructure' 
  | 'Road Access / Evacuation Width' 
  | 'School & Educational Capacity' 
  | 'Healthcare Capacity' 
  | 'Sanitation & Wastewater Treatment'
  | 'Buildable Land';

export interface CandidateSiteConstraints {
  buildableLandAreaSqMeters: number;
  minPlotAreaSqMetersPerHH: number;
  internalInfraOverheadPct: number;
  waterSustainableYieldLitersPerDay: number;
  waterLpcdStandard: number;
  sanitationFacilityName: string;
  sanitationDailyTreatmentCapacityLiters: number;
  sanitationCapacityHH: number;
  sanitationUtilizationPct: number;
  roadWidthMeters: number;
  roadHourlyPcuCapacity: number;
  healthcareFacilityName: string;
  healthcareAvailableBedCapacityHH: number;
  schoolName: string;
  schoolAvailableSeatCapacityHH: number;
  existingHostPopulationHH: number;
  hazardBufferDeductionPct: number;
}

export interface CalculatedCapacity {
  landCapacityHH: number;
  waterCapacityHH: number;
  sanitationCapacityHH: number;
  roadCapacityHH: number;
  healthCapacityHH: number;
  schoolCapacityHH: number;
  netSafeAbsorptionCapacityHH: number;
  netSafePopulationCapacity: number;
  bindingConstraint: ConstraintType;
  bindingConstraintExplanation: string;
  limitingBottleneckValue: string;
  limitingBottleneckRequired: string;
}

export interface CandidateSite {
  id: string;
  name: string;
  locationName: string;
  panchayat: string;
  lat: number;
  lng: number;
  areaHectares: number;
  meanSlopeDegrees: number;
  elevationMeters: number;
  distanceToSettlements: Record<string, number>; // settlementId -> km
  suitabilityScore: number; // 0-100
  status: SiteStatus;
  statusReason: string;
  rejectionReason?: string;
  suitabilityFactors: {
    hazardSafety: number;
    buildableSlope: number;
    roadConnectivity: number;
    waterProximity: number;
    sanitationAccess: number;
    healthcareAccess: number;
    schoolAccess: number;
    landTenure: number;
  };
  rawConstraints: CandidateSiteConstraints;
  calculatedCapacity: CalculatedCapacity;
  boundaryGeoJson: [number, number][]; // [lat, lng] polygon ring
}

export interface EvaluatedSiteOutcome {
  siteId: string;
  siteName: string;
  status: SiteStatus;
  safeCapacityHH: number;
  requiredHH: number;
  deficitHH: number;
  bindingConstraint: ConstraintType;
  reason: string;
}

export interface AllocationAssignment {
  settlementId: string;
  settlementName: string;
  population: number;
  households: number;
  siteId: string;
  siteName: string;
  distanceKm: number;
  travelTimeMinutes: number;
  capacityUtilizedHH: number;
  capacityTotalHH: number;
  siteUtilizationPct: number;
  remainingCapacityHH: number;
  bindingConstraint: ConstraintType;
  rationale: string[];
  candidateSitesEvaluated?: EvaluatedSiteOutcome[];
  rejectedSites?: EvaluatedSiteOutcome[];
}

export interface RedZoneVersionData {
  version: 'v1.0-2024' | 'v2.0-2025';
  label: string;
  date: string;
  gazetteNotification: string;
  totalAreaSqKm: number;
  habitationsCondemned: number;
  populationExposed: number;
  criteria: string[];
  reassessmentSummary: string;
  polygonRings: [number, number][][]; // Array of [lat, lng] polygons
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  operator: string;
  authority: string;
  details: string;
  status: 'VERIFIED' | 'AMENDED' | 'PUBLISHED';
  artifactHash?: string;
}

export interface DataConfidenceDomain {
  rating: 'High' | 'Moderate' | 'Low';
  source: string;
  lastUpdated: string;
  completenessPct: number;
  notes: string;
}

export interface DataConfidenceInfo {
  overallConfidencePct: number;
  sourceReliabilityPct: number;
  dataFreshnessPct: number;
  completenessPct: number;
  crossSourceConsistencyPct: number;
  domains: Record<string, DataConfidenceDomain>;
}

export interface ValidationCheck {
  id: string;
  checkName: string;
  domain: string;
  sourcesCompared: string[];
  status: 'PASS' | 'WARNING' | 'INCOMPLETE';
  details: string;
  varianceMetric: string;
}

export type ActiveTab = 
  | 'overview'
  | 'hazard'
  | 'redzone'
  | 'settlements'
  | 'priority'
  | 'candidates'
  | 'capacity'
  | 'allocation'
  | 'recommendations'
  | 'audit';
