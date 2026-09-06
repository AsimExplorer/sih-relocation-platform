export const METHODOLOGY_SECTIONS = [
  {
    title: '1. Multi-Hazard Flood & Inundation Risk Framework',
    code: 'DEL-MHR-2025',
    description: 'Calculates the composite life-safety threat profile in the East Delhi Yamuna basin using deterministic multi-source criteria.',
    formula: 'Risk Score = (0.35 × Flood Recurrence) + (0.25 × Red Zone Overlap) + (0.15 × Exposed Population) + (0.15 × Embankment / Drainage Backflow Risk) + (0.10 × Silt Liquefaction Scour)',
    indicators: [
      { name: 'Flood Recurrence (0-100)', source: 'Central Water Commission (CWC) Yamuna River Gauges', weight: '35%' },
      { name: 'Permanent Red Zone Overlap (0-100%)', source: 'Delhi Disaster Management Authority (DDMA) / NGT Riverbed Demarcation', weight: '25%' },
      { name: 'Exposed Population (0-100)', source: 'Census 2011 + District Administration East Delhi Registry', weight: '15%' },
      { name: 'Embankment & Backflow Risk (0-100)', source: 'Irrigation & Flood Control Dept / PWD Delhi', weight: '15%' },
      { name: 'Silt Liquefaction / Foundation Scour Index (0-100)', source: 'Geological Survey of India (GSI) Alluvial Sub-soil Survey', weight: '10%' }
    ]
  },
  {
    title: '2. Permanent Unsuitability Red Zone Statutory Criteria',
    code: 'PURZ-DELHI-NGT',
    description: 'Strict statutory criteria under Section 30(2) of the Disaster Management Act 2005 read with National Green Tribunal (NGT) Principal Bench Orders declaring active Yamuna riverbed floodplains permanently unsuitable for human habitation.',
    criteriaList: [
      'Flood Recurrence: Exceeded CWC Extreme Flood Level (208.66m in July 2023) with direct velocity inundation.',
      'Statutory Riverbed "O" Zone: Location within prohibited Yamuna river conservation zone where permanent civil structures are forbidden by judicial mandate.',
      'Drainage Confluence: Intersects unbunded stormwater outfall backflow corridors during high river stages.',
      'Lifeline Fragility: Arterial road approach submerged under >2.5m floodwaters, requiring boat evacuation.',
      'Ground Saturation: Silt table liquefaction and permanent dampness rendering foundations structurally non-viable.'
    ]
  },
  {
    title: '3. Flagship Carrying Capacity Formulation',
    code: 'CCP-DELHI-CPHEEO',
    description: 'Deterministic, multi-constraint carrying capacity engine determining the safe number of households an urban candidate resettlement site can sustainably absorb.',
    formula: 'Safe Absorption Capacity = min( Land Capacity, Water Capacity, Road Evacuation Capacity, Healthcare Capacity, School Capacity ) - Existing Host Community Load',
    constraintsExplanation: [
      {
        name: 'Buildable Land Capacity',
        math: 'Floor( (Net Parcel Area × (1 - Infra Overhead %)) / Min Plot Area per Household )',
        norm: 'Delhi Development Authority (DDA) & CPHEEO standard: 160 sq.m gross/HH.'
      },
      {
        name: 'Water Supply Capacity',
        math: 'Floor( Delhi Jal Board Bulk Pipeline Yield (L/day) / (135 lpcd × 4 persons/HH) )',
        norm: 'CPHEEO & Delhi Jal Board benchmark: 135 Litres per Capita per Day for piped domestic connection.'
      },
      {
        name: 'Road Evacuation Capacity',
        math: 'Floor( (Effective Carriageway Width / Standard Lane 3.5m) × Hourly Evacuation PCU Capacity × Clearance Window )',
        norm: 'IRC Urban Guidelines: Minimum double-lane (7.0m) required for sectors exceeding 500 households.'
      },
      {
        name: 'Healthcare Capacity',
        math: 'Floor( Dr. Hedgewar / GTB / LBS Hospital Outpatient & Bed Roster Headroom / 4 persons/HH )',
        norm: 'Directorate of Health Services (DHS) / National Health Mission patient-to-bed ratios.'
      },
      {
        name: 'School & Educational Capacity',
        math: 'Floor( Available Directorate of Education Model School Desks within 3 km / 1.2 school-age children per HH )',
        norm: 'Right to Education (RTE) / UDISE+ Delhi standard pupil-to-teacher ratio (30:1).'
      }
    ]
  },
  {
    title: '4. Capacity-Constrained Matching Engine',
    code: 'MATCH-DELHI-OPT',
    description: 'Solves the constrained assignment problem allocating vulnerable Yamuna floodplain clusters to candidate resettlement parcels in East Delhi / NCR.',
    objective: 'Minimize Total Weighted Transit Distance subject to Site Safe Carrying Capacity: Sum(HH_assigned) <= Site_Capacity',
    sharedResourceLogic: 'Resettlement parcels are shared public assets. If Yamuna Khadar absorbs 620 HH of Site Alpha (Karkardooma / USAR Hub), Site Alpha is fully saturated, compelling Garhi Mandu to be routed to Site Beta (Mandoli) regardless of spatial proximity.'
  }
];

export const OFFICIAL_DATA_SOURCES = [
  { name: 'Delhi Disaster Management Authority (DDMA)', type: 'Statutory Authority', officialUrl: 'delhi.gov.in/ddma', status: 'Operational Guidelines Applied', notes: 'Master Plan for Delhi (MPD) flood management and rehabilitation directives.' },
  { name: 'Central Water Commission (CWC)', type: 'Hydrological River Gauges', officialUrl: 'cwc.gov.in', status: 'Calibrated Demonstration Data', notes: 'Old Railway Bridge (Loha Pul) and Delhi Railway Bridge flood level time-series.' },
  { name: 'Delhi Jal Board (DJB)', type: 'Water Supply Standards', officialUrl: 'delhijalboard.delhi.gov.in', status: 'Benchmarks Applied', notes: '135 lpcd domestic norms from Sonia Vihar and Bhagirathi Water Treatment Plants.' },
  { name: 'Delhi Development Authority (DDA)', type: 'Urban Land Planning', officialUrl: 'dda.gov.in', status: 'Cadastral Standards', notes: 'Land-use zoning norms, institutional buffers, and layout plot standards.' },
  { name: 'National Green Tribunal (NGT)', type: 'Judicial Orders', officialUrl: 'greentribunal.gov.in', status: 'Statutory Reference', notes: 'River Yamuna active floodplain "O" Zone non-habitation orders.' },
  { name: 'UDISE+ Directorate of Education Delhi', type: 'Educational Infrastructure', officialUrl: 'edudel.nic.in', status: 'Standards Applied', notes: 'Government Sarvodaya Vidyalaya classroom intake standards in East Delhi.' },
];
