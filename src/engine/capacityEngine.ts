import { CalculatedCapacity, ConstraintType, CandidateSiteConstraints } from '../types';

export interface CapacitySimulationParams {
  waterAugmentationLitersPerDay: number;      // Additional bulk water pipeline capacity
  sanitationAugmentationLitersPerDay: number; // Decentralized STP / sewer connection upgrade
  roadExpansionMeters: number;               // Additional bridge/road width
  schoolSeatsAdded: number;                  // School classroom expansion
  healthBedsAddedHH: number;                 // Additional healthcare PHC capacity
  minPlotAreaSqMeters: number;               // Density planning parameter
}

export function computeSiteCarryingCapacity(
  siteName: string,
  raw: CandidateSiteConstraints,
  simParams?: Partial<CapacitySimulationParams>
): CalculatedCapacity {
  const params: CapacitySimulationParams = {
    waterAugmentationLitersPerDay: simParams?.waterAugmentationLitersPerDay ?? 0,
    sanitationAugmentationLitersPerDay: simParams?.sanitationAugmentationLitersPerDay ?? 0,
    roadExpansionMeters: simParams?.roadExpansionMeters ?? 0,
    schoolSeatsAdded: simParams?.schoolSeatsAdded ?? 0,
    healthBedsAddedHH: simParams?.healthBedsAddedHH ?? 0,
    minPlotAreaSqMeters: simParams?.minPlotAreaSqMeters ?? raw.minPlotAreaSqMetersPerHH
  };

  // 1. Land Capacity: Net buildable area after internal infra overhead & hazard buffers
  const netBuildableLandSqM = raw.buildableLandAreaSqMeters * 
    (1 - (raw.internalInfraOverheadPct / 100)) * 
    (1 - (raw.hazardBufferDeductionPct / 100));
  const landCapacityHH = Math.floor(netBuildableLandSqM / params.minPlotAreaSqMeters);

  // 2. Water Capacity: Yield divided by standard per household (135 lpcd * 4 persons = 540 L/day/HH)
  const totalDailyWaterLiters = raw.waterSustainableYieldLitersPerDay + params.waterAugmentationLitersPerDay;
  const householdDailyWaterDemand = raw.waterLpcdStandard * 4;
  const waterCapacityHH = Math.floor(totalDailyWaterLiters / householdDailyWaterDemand);

  // 3. Sanitation & Wastewater Capacity: 
  // CPHEEO guideline: ~80% of domestic water consumption generates wastewater = 108 lpcd * 4 = 432 L/day/HH
  const totalDailySanitationLiters = (raw.sanitationDailyTreatmentCapacityLiters || 270000) + params.sanitationAugmentationLitersPerDay;
  const householdDailySewageLiters = Math.round(raw.waterLpcdStandard * 0.80 * 4); // 432 L/day
  const sanitationCapacityHH = raw.sanitationCapacityHH > 0 && params.sanitationAugmentationLitersPerDay === 0
    ? raw.sanitationCapacityHH
    : Math.floor(totalDailySanitationLiters / householdDailySewageLiters);

  // 4. Road / Evacuation Capacity: Effective width / evacuation clearance rate
  const effectiveRoadWidth = raw.roadWidthMeters + params.roadExpansionMeters;
  const roadCapacityHH = Math.floor(raw.roadHourlyPcuCapacity * (effectiveRoadWidth / 7.0) * 0.72);

  // 5. Healthcare Capacity
  const healthCapacityHH = raw.healthcareAvailableBedCapacityHH + params.healthBedsAddedHH;

  // 6. School Capacity
  const schoolCapacityHH = raw.schoolAvailableSeatCapacityHH + params.schoolSeatsAdded;

  // Multi-constraint minimum (Strict min-operator: unweighted averages are invalid)
  const constraintMap: Record<ConstraintType, number> = {
    'Water Infrastructure': waterCapacityHH,
    'Sanitation & Wastewater Treatment': sanitationCapacityHH,
    'Road Access / Evacuation Width': roadCapacityHH,
    'School & Educational Capacity': schoolCapacityHH,
    'Healthcare Capacity': healthCapacityHH,
    'Buildable Land': landCapacityHH
  };

  const constraintsList = Object.entries(constraintMap) as [ConstraintType, number][];
  constraintsList.sort((a, b) => a[1] - b[1]);

  const [bindingConstraint, rawMinCapacity] = constraintsList[0];
  const netSafeAbsorptionCapacityHH = Math.max(0, rawMinCapacity - raw.existingHostPopulationHH);
  const netSafePopulationCapacity = netSafeAbsorptionCapacityHH * 4;

  let bindingConstraintExplanation = '';
  let limitingBottleneckValue = '';
  let limitingBottleneckRequired = '';

  switch (bindingConstraint) {
    case 'Water Infrastructure':
      limitingBottleneckValue = totalDailyWaterLiters.toLocaleString() + ' L/day pipeline yield';
      limitingBottleneckRequired = (landCapacityHH * 540).toLocaleString() + ' L/day needed for full buildout';
      bindingConstraintExplanation = 'Sustainable water pipeline yield (' + limitingBottleneckValue + ') restricts safe absorption to ' + netSafeAbsorptionCapacityHH + ' households (' + netSafePopulationCapacity + ' persons), leaving ' + Math.max(0, landCapacityHH - netSafeAbsorptionCapacityHH) + ' buildable plots unviable without DJB feeder augmentation.';
      break;

    case 'Sanitation & Wastewater Treatment':
      limitingBottleneckValue = totalDailySanitationLiters.toLocaleString() + ' L/day STP intake (' + sanitationCapacityHH + ' HH)';
      limitingBottleneckRequired = (landCapacityHH * 432).toLocaleString() + ' L/day needed for full buildout';
      bindingConstraintExplanation = 'Local sewage treatment plant (STP) trunk intake (' + limitingBottleneckValue + ') strictly caps sustainable habitation at ' + netSafeAbsorptionCapacityHH + ' households. In accordance with National Green Tribunal (NGT) Yamuna River rejuvenation mandates, unsewered resettlement without certified STP discharge is legally prohibited.';
      break;

    case 'Road Access / Evacuation Width':
      limitingBottleneckValue = effectiveRoadWidth.toFixed(1) + 'm roadway bottleneck';
      limitingBottleneckRequired = '10.5m 3-lane standard for 900+ HH';
      bindingConstraintExplanation = 'Evacuation access bottleneck (' + limitingBottleneckValue + ') limits emergency egress clearance to ' + netSafeAbsorptionCapacityHH + ' households. In a 90-minute flash-surge evacuation envelope, wider right-of-way is required before approving higher density.';
      break;

    case 'School & Educational Capacity':
      limitingBottleneckValue = schoolCapacityHH + ' catchment desks';
      limitingBottleneckRequired = landCapacityHH + ' seats required for full buildout';
      bindingConstraintExplanation = 'Local UDISE+ school catchment seat surplus (' + limitingBottleneckValue + ') caps family resettlement to ' + netSafeAbsorptionCapacityHH + ' households to avoid severe classroom pupil-to-teacher ratio violations.';
      break;

    case 'Healthcare Capacity':
      limitingBottleneckValue = healthCapacityHH + ' patient roster slots';
      limitingBottleneckRequired = landCapacityHH + ' roster slots for full buildout';
      bindingConstraintExplanation = 'Primary Health Centre roster headroom (' + limitingBottleneckValue + ') caps population intake at ' + netSafeAbsorptionCapacityHH + ' households to adhere to National Health Mission doctor-to-patient and emergency bed thresholds.';
      break;

    case 'Buildable Land':
      limitingBottleneckValue = landCapacityHH + ' physical plots';
      limitingBottleneckRequired = 'N/A (Full parcel utilized)';
      bindingConstraintExplanation = 'Total net developable area after statutory environmental green buffer and internal circulation reserves limits site capacity to ' + netSafeAbsorptionCapacityHH + ' households.';
      break;
  }

  return {
    landCapacityHH,
    waterCapacityHH,
    sanitationCapacityHH,
    roadCapacityHH,
    healthCapacityHH,
    schoolCapacityHH,
    netSafeAbsorptionCapacityHH,
    netSafePopulationCapacity,
    bindingConstraint,
    bindingConstraintExplanation,
    limitingBottleneckValue,
    limitingBottleneckRequired
  };
}
