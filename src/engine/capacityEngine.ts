import { CalculatedCapacity, ConstraintType, CandidateSiteConstraints } from '../types';

export interface CapacitySimulationParams {
  waterAugmentationLitersPerDay: number; // Additional water capacity
  roadExpansionMeters: number;          // Additional bridge/road width
  schoolSeatsAdded: number;             // School expansion
  healthBedsAddedHH: number;            // Additional healthcare capacity
  minPlotAreaSqMeters: number;          // Density planning parameter
}

export function computeSiteCarryingCapacity(
  siteName: string,
  raw: CandidateSiteConstraints,
  simParams?: Partial<CapacitySimulationParams>
): CalculatedCapacity {
  const params: CapacitySimulationParams = {
    waterAugmentationLitersPerDay: simParams?.waterAugmentationLitersPerDay ?? 0,
    roadExpansionMeters: simParams?.roadExpansionMeters ?? 0,
    schoolSeatsAdded: simParams?.schoolSeatsAdded ?? 0,
    healthBedsAddedHH: simParams?.healthBedsAddedHH ?? 0,
    minPlotAreaSqMeters: simParams?.minPlotAreaSqMeters ?? raw.minPlotAreaSqMetersPerHH
  };

  // 1. Land Capacity: Net buildable area after infra deduction & hazard buffers
  const netBuildableLandSqM = raw.buildableLandAreaSqMeters * 
    (1 - (raw.internalInfraOverheadPct / 100)) * 
    (1 - (raw.hazardBufferDeductionPct / 100));
  const landCapacityHH = Math.floor(netBuildableLandSqM / params.minPlotAreaSqMeters);

  // 2. Water Capacity: Yield divided by standard per household (135 lpcd * 4 persons = 540 L/day/HH)
  const totalDailyWaterLiters = raw.waterSustainableYieldLitersPerDay + params.waterAugmentationLitersPerDay;
  const householdDailyWaterDemand = raw.waterLpcdStandard * 4;
  const waterCapacityHH = Math.floor(totalDailyWaterLiters / householdDailyWaterDemand);

  // 3. Road / Evacuation Capacity: Effective width / evacuation clearance
  const effectiveRoadWidth = raw.roadWidthMeters + params.roadExpansionMeters;
  const roadCapacityHH = Math.floor(raw.roadHourlyPcuCapacity * (effectiveRoadWidth / 7.0) * 0.72);

  // 4. Healthcare Capacity
  const healthCapacityHH = raw.healthcareAvailableBedCapacityHH + params.healthBedsAddedHH;

  // 5. School Capacity
  const schoolCapacityHH = raw.schoolAvailableSeatCapacityHH + params.schoolSeatsAdded;

  // Multi-constraint minimum
  const constraintMap: Record<ConstraintType, number> = {
    'Water Infrastructure': waterCapacityHH,
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
      limitingBottleneckValue = totalDailyWaterLiters.toLocaleString() + ' L/day yield';
      limitingBottleneckRequired = (landCapacityHH * 540).toLocaleString() + ' L/day needed for full buildout';
      bindingConstraintExplanation = 'Sustainable water yield (' + limitingBottleneckValue + ') restricts safe absorption to ' + netSafeAbsorptionCapacityHH + ' households (' + netSafePopulationCapacity + ' persons), leaving ' + (landCapacityHH - netSafeAbsorptionCapacityHH) + ' buildable plots unviable without pipeline augmentation.';
      break;
    case 'Road Access / Evacuation Width':
      limitingBottleneckValue = effectiveRoadWidth.toFixed(1) + 'm roadway bottleneck';
      limitingBottleneckRequired = '7.5m double-lane standard';
      bindingConstraintExplanation = 'Evacuation access bottleneck (' + limitingBottleneckValue + ') limits emergency clearance to ' + netSafeAbsorptionCapacityHH + ' households. In a 90-minute disaster evacuation envelope, wider egress is required before building higher density.';
      break;
    case 'School & Educational Capacity':
      limitingBottleneckValue = schoolCapacityHH + ' catchment desks';
      limitingBottleneckRequired = landCapacityHH + ' seats required';
      bindingConstraintExplanation = 'Local UDISE+ school catchment seat surplus (' + limitingBottleneckValue + ') caps family resettlement to ' + netSafeAbsorptionCapacityHH + ' households to avoid severe classroom overloading.';
      break;
    case 'Healthcare Capacity':
      limitingBottleneckValue = healthCapacityHH + ' patient roster slots';
      limitingBottleneckRequired = landCapacityHH + ' roster slots';
      bindingConstraintExplanation = 'Primary Health Centre roster headroom (' + limitingBottleneckValue + ') caps population intake at ' + netSafeAbsorptionCapacityHH + ' households to adhere to National Health Mission patient-to-bed ratios.';
      break;
    case 'Buildable Land':
      limitingBottleneckValue = landCapacityHH + ' physical plots';
      limitingBottleneckRequired = 'N/A (Full parcel utilized)';
      bindingConstraintExplanation = 'Total net developable area after mandatory green spaces and road network reserves strictly limits site capacity to ' + netSafeAbsorptionCapacityHH + ' households.';
      break;
  }

  return {
    landCapacityHH,
    waterCapacityHH,
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
