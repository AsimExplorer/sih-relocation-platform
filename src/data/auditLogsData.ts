import { AuditEntry } from '../types';

export const AUDIT_LOGS_DATA: AuditEntry[] = [
  {
    id: 'AUD-2026-001',
    timestamp: '2026-01-02 10:30 IST',
    action: 'Permanent Red Zone v2.0 Gazetted & Reassessed',
    operator: 'Dr. Sekhar L. Kuriakose (Member Secretary, KSDMA)',
    authority: 'Kerala State Disaster Management Authority (KSDMA)',
    details: 'Red Zone polygon expanded from 14.2 sq.km to 23.8 sq.km incorporating Mundakkai crown scarp and Chooralmala river corridor based on multi-agency GSI/NRSC post-event survey.',
    status: 'PUBLISHED',
    artifactHash: 'sha256:7f8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9'
  },
  {
    id: 'AUD-2026-002',
    timestamp: '2026-01-15 14:15 IST',
    action: 'Settlement Relocation Priority Assessment Executed',
    operator: 'District Collector & DDMA Chairman, Wayanad',
    authority: 'District Disaster Management Authority (DDMA), Wayanad',
    details: 'Ran deterministic multi-hazard ranking engine. Mundakkai (96/100), Chooralmala (92/100), and Punchirimattom (89/100) formally designated as IMMEDIATE Relocation Priority.',
    status: 'VERIFIED',
    artifactHash: 'sha256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2'
  },
  {
    id: 'AUD-2026-003',
    timestamp: '2026-02-04 11:00 IST',
    action: 'Candidate Resettlement Site Capacity Calculations Audited',
    operator: 'Chief Town Planner & Executive Engineer, Kerala PWD',
    authority: 'State Level High Powered Committee on Rehabilitation',
    details: 'Audited 4 candidate parcels. Site Alpha capped at 340 HH due to PHED water pipeline constraint; Site Beta capped at 490 HH due to 5.5m access bridge constraint.',
    status: 'VERIFIED',
    artifactHash: 'sha256:9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8'
  },
  {
    id: 'AUD-2026-004',
    timestamp: '2026-02-18 16:45 IST',
    action: 'Capacity-Constrained Relocation Matching Plan Formulated',
    operator: 'Joint Relocation Taskforce (DDMA + KSDMA)',
    authority: 'Government of Kerala Disaster Management Department',
    details: 'Executed optimal matching solver. Mundakkai allocated to Site Alpha (355 HH vs 340 HH adjusted with phased intake); Chooralmala allocated to Site Beta (465 HH of 490 HH capacity).',
    status: 'VERIFIED',
    artifactHash: 'sha256:3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4'
  },
  {
    id: 'AUD-2026-005',
    timestamp: '2026-03-01 09:30 IST',
    action: 'Statutory Public Review & Environmental Clearance Notice Issued',
    operator: 'Revenue Divisional Officer (RDO), Mananthavady',
    authority: 'Revenue & Disaster Management Department',
    details: 'Formal gazette publication of preliminary land acquisition notification for Site Alpha and Site Beta under RFCTLARR Act 2013 with KSDMA expedited disaster provisions.',
    status: 'PUBLISHED',
    artifactHash: 'sha256:5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6'
  }
];
