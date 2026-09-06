export const METHODOLOGY_SECTIONS = [
  {
    title: '1. Multi-Hazard Risk Scoring Framework',
    code: 'MHR-2026',
    description: 'Calculates the composite life-safety threat profile using deterministic multi-source criteria.',
    formula: 'Risk Score = (0.35 × Hazard Recurrence) + (0.25 × Red Zone Overlap) + (0.15 × Exposed Population) + (0.15 × Accessibility / Islanding Risk) + (0.10 × Slope Instability)',
    indicators: [
      { name: 'Hazard Recurrence (0-100)', source: 'NDEM / GSI Landslide Inventory', weight: '35%' },
      { name: 'Permanent Red Zone Overlap (0-100%)', source: 'KSDMA Geomorphic Zonation v2.0', weight: '25%' },
      { name: 'Exposed Population (0-100)', source: 'Census 2011 + SECC / Local Panchayat Registry', weight: '15%' },
      { name: 'Accessibility & Bridge Islanding Risk (0-100)', source: 'PWD Roads & Bridges Database + OSM', weight: '15%' },
      { name: 'Slope Instability Index (0-100)', source: 'CartoDEM 10m / SRTM Terrain Gradient', weight: '10%' }
    ]
  },
  {
    title: '2. Permanent Unsuitability Red Zone Criteria',
    code: 'PURZ-STATUTORY',
    description: 'Strict statutory criteria under Section 30(2) of the Disaster Management Act 2005 declaring a geographical land parcel permanently unsuitable for human habitation.',
    criteriaList: [
      'Recurrence Threshold: Two or more catastrophic debris flow / slope failure events within a rolling 10-year period.',
      'Geomorphic Non-viability: Location within the primary crown detachment scar (>30° slope with loose saprolite mantle) where physical retaining structures are impossible.',
      'Debris Velocity Envelope: Trajectory intersects unconfined boulder-silt flow exceeding 20 meters/second velocity.',
      'Lifeline Fragility: The sole arterial lifeline bridge crosses an active alluvial aggradation channel subject to recurring severance (>3 days isolation).',
      'Channel Aggradation: Riverbed elevation raised by >2.5 meters, making future monsoonal overtopping mathematically inevitable.'
    ]
  },
  {
    title: '3. Flagship Carrying Capacity Formulation',
    code: 'CCP-MIN-OP',
    description: 'Deterministic, multi-constraint carrying capacity engine determining the safe number of households a candidate site can sustainably accommodate.',
    formula: 'Safe Absorption Capacity = min( Land Capacity, Water Capacity, Road Evacuation Capacity, Healthcare Capacity, School Capacity ) - Existing Host Community Load',
    constraintsExplanation: [
      {
        name: 'Buildable Land Capacity',
        math: 'Floor( (Net Parcel Area × (1 - Infra Overhead %)) / Min Plot Area per Household )',
        norm: 'CPHEEO & Town Planning Standard: 160 sq.m gross/HH (including access roads, green space, community hall).'
      },
      {
        name: 'Water Supply Capacity',
        math: 'Floor( Sustainable Daily Water Yield (L/day) / (135 lpcd × 4 persons/HH) )',
        norm: 'CPHEEO Indian Standard: 135 Litres per Capita per Day for piped domestic habitation.'
      },
      {
        name: 'Road Evacuation Capacity',
        math: 'Floor( (Effective Carriageway Width / Standard Lane 3.5m) × Hourly Evacuation PCU Capacity × Clearance Window )',
        norm: 'IRC Guidelines: Minimum double-lane (7.0m) required for settlements exceeding 500 households.'
      },
      {
        name: 'Healthcare Capacity',
        math: 'Floor( Available Primary Health Centre / Sub-Centre Patient Roster Headroom / 4 persons/HH )',
        norm: 'National Health Mission: 1 PHC per 30,000 population in plains, 20,000 in hilly/tribal areas.'
      },
      {
        name: 'School & Educational Capacity',
        math: 'Floor( Available Primary & Upper Primary Classroom Desks within 3 km / 1.2 school-age children per HH )',
        norm: 'Right to Education (RTE) / UDISE+ standard pupil-to-teacher ratio (30:1).'
      }
    ]
  },
  {
    title: '4. Capacity-Constrained Matching Engine',
    code: 'MATCH-OPT',
    description: 'Solves the constrained assignment problem allocating vulnerable settlements to candidate sites.',
    objective: 'Minimize Total Weighted Relocation Distance subject to Site Safe Carrying Capacity Constraints: Sum(HH_assigned) <= Site_Capacity',
    sharedResourceLogic: 'Candidate sites are shared public assets. If Settlement A absorbs 340 HH of Site Alpha, Site Alpha is fully locked, compelling Settlement B to be routed to Site Beta or Gamma regardless of spatial preference.'
  }
];

export const OFFICIAL_DATA_SOURCES = [
  { name: 'Bhuvan / NRSC (ISRO)', type: 'Geospatial Hazard Layer', officialUrl: 'bhuvan.nrsc.gov.in', status: 'Reference Methodology Used', notes: 'High-resolution CartoDEM terrain elevation and landslide hazard zonation.' },
  { name: 'National Disaster Emergency Management (NDEM)', type: 'Historical Disaster Ledger', officialUrl: 'ndem.nrsc.gov.in', status: 'Calibrated Demonstration Data', notes: 'Event fatality, damage extent, and historical recurrence logs.' },
  { name: 'Kerala State Disaster Management Authority (KSDMA)', type: 'Statutory Authority', officialUrl: 'sdma.kerala.gov.in', status: 'Decision Model Specifications', notes: 'Standard operating procedures for post-disaster rehabilitation.' },
  { name: 'Jal Jeevan Mission / Kerala PHED', type: 'Water Supply Metrics', officialUrl: 'jaljeevanmission.gov.in', status: 'Standards Applied', notes: '135 lpcd rural/peri-urban water infrastructure benchmarks.' },
  { name: 'Unified District Information System for Education (UDISE+)', type: 'Social Infrastructure', officialUrl: 'udiseplus.gov.in', status: 'Standards Applied', notes: 'Catchment school intake capacity standards.' },
  { name: 'National Health Facility Registry (NHFR)', type: 'Health Facility Metrics', officialUrl: 'nhfr.abdm.gov.in', status: 'Standards Applied', notes: 'Primary Health Centre bed and doctor load capacity ratios.' },
];
