import { AuditEntry } from '../types';

export const AUDIT_LOGS_DATA: AuditEntry[] = [
  {
    id: 'AUD-DEL-2025-001',
    timestamp: '2025-01-02 10:30 IST',
    action: 'Permanent Red Zone v2.0 Boundary Reassessed',
    operator: 'SURAKSHA Modeling Team',
    authority: 'Spatial Modeling & Delineation Unit',
    details: 'Red Zone boundary expanded from 18.5 sq.km to 31.2 sq.km following post-July 2023 flood survey (208.66m record peak), incorporating breached khadar reaches up to Ring Road / Vikas Marg embankments.',
    status: 'PUBLISHED',
    artifactHash: 'sha256:7f8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9'
  },
  {
    id: 'AUD-DEL-2025-002',
    timestamp: '2025-01-15 14:15 IST',
    action: 'Floodplain Settlement Relocation Priority Assessment Executed',
    operator: 'Senior Spatial Analyst',
    authority: 'Hazard & Vulnerability Evaluation Framework',
    details: 'Executed deterministic multi-hazard ranking engine. Yamuna Khadar East (96/100), Garhi Mandu (92/100), and Bela Estate (88/100) evaluated with IMMEDIATE Relocation Priority.',
    status: 'VERIFIED',
    artifactHash: 'sha256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2'
  },
  {
    id: 'AUD-DEL-2025-003',
    timestamp: '2025-02-04 11:00 IST',
    action: 'Candidate Resettlement Site Capacity Calculations Audited',
    operator: 'Infrastructure Engineering Lead',
    authority: 'Municipal Infrastructure Capacity Framework',
    details: 'Audited 5 candidate parcels. Site Alpha (Karkardooma / USAR Hub) capped at 620 HH due to DJB Bhagirathi pipeline bottleneck; Site Beta (Mandoli) capped at 780 HH due to bridge bottleneck; Site Epsilon rejected.',
    status: 'VERIFIED',
    artifactHash: 'sha256:9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8'
  },
  {
    id: 'AUD-DEL-2025-004',
    timestamp: '2025-02-18 16:45 IST',
    action: 'Capacity-Constrained Relocation Matching Plan Formulated',
    operator: 'Systems & Operations Research Lead',
    authority: 'SURAKSHA Allocation Engine',
    details: 'Executed optimal matching solver. Yamuna Khadar allocated to Site Alpha (620 HH of 770 HH demand phased intake); Garhi Mandu allocated to Site Beta (588 HH of 780 HH capacity).',
    status: 'VERIFIED',
    artifactHash: 'sha256:3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4'
  },
  {
    id: 'AUD-DEL-2025-005',
    timestamp: '2025-03-01 09:30 IST',
    action: 'Relocation Evaluation Summary Finalized',
    operator: 'Project Review Lead',
    authority: 'SURAKSHA Decision Support Framework',
    details: 'Technical evaluation of land suitability and municipal carrying capacity finalized for Site Alpha (Karkardooma Institutional Area near USAR) and Site Beta.',
    status: 'PUBLISHED',
    artifactHash: 'sha256:5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6'
  }
];
