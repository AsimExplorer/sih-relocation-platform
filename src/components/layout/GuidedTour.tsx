import React from 'react';
import { ArrowLeft, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { ActiveTab } from '../../types';

interface GuidedTourProps {
  currentStep: number;
  totalSteps: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onExitTour: () => void;
  onJumpToTab: (tab: ActiveTab) => void;
}

export const TOUR_STEPS = [
  {
    step: 1,
    tab: 'overview' as ActiveTab,
    title: 'Step 1: Open East Delhi Situation Overview (USAR Hub Context)',
    narrative: 'Orient the authority: 5 vulnerable floodplain habitations along the Yamuna Khadar (Loha Pul, Garhi Mandu, Shastri Park), 12,240 exposed residents, and planned resettlement adjacent to Surajmal Vihar / USAR.',
    keyTakeaway: 'This platform answers what happens AFTER hazard detection: who moves, where to, and how many can sustainably fit.'
  },
  {
    step: 2,
    tab: 'hazard' as ActiveTab,
    title: 'Step 2: Inspect Multi-Hazard Floodplain Inundation & Silt Scour',
    narrative: 'Examine multi-hazard triggers: 208.66m all-time record Yamuna water level, unbunded floodplain surge corridors, and Hathnikund discharge (>3.5 lakh cusecs).',
    keyTakeaway: 'Standard systems stop at flood depth contours. Our platform feeds this into permanent unsuitability zoning.'
  },
  {
    step: 3,
    tab: 'redzone' as ActiveTab,
    title: 'Step 3: Activate Permanent Unsuitability Red Zone (v2.0)',
    narrative: 'Demarcated based on flood safety and NGT Yamuna conservation benchmarks: area categorized as permanently unsuitable for human habitation.',
    keyTakeaway: 'Notice version reassessment: v1 (18.5 sq.km, Jan 2024) expanded to v2 (31.2 sq.km, Jan 2025) post-July 2023 flood overtopping.'
  },
  {
    step: 4,
    tab: 'settlements' as ActiveTab,
    title: 'Step 4: Inspect Vulnerable Settlement (Yamuna Khadar East / Garhi Mandu)',
    narrative: 'Click on Yamuna Khadar East: 3,850 population, 100% Red Zone overlap, 3 catastrophic flood recurrences, and zero protective bunding.',
    keyTakeaway: 'Immediate relocation priority with formal technical justification.'
  },
  {
    step: 5,
    tab: 'priority' as ActiveTab,
    title: 'Step 5: AI-Assisted Relocation Priority Engine',
    narrative: 'Observe the advisory AI layer: evaluates multi-hazard exposure, flood recurrence frequency, and exposed population to generate explainable relocation urgency classifications and top 3 risk drivers. Candidate site safety and carrying capacities remain strictly guarded by deterministic engines.',
    keyTakeaway: 'AI provides explainable prioritization; GIS and civil-engineering rule engines enforce hard physical safety.'
  },
  {
    step: 6,
    tab: 'candidates' as ActiveTab,
    title: 'Step 6: Review Candidate Relocation Sites (Suitability Scoring)',
    narrative: 'Evaluate candidate resettlement parcels (Site Alpha - Karkardooma near USAR, Site Beta - Mandoli, Site Gamma - Anand Vihar, Site Delta - Bakkarwala, Site Epsilon - Disqualified).',
    keyTakeaway: 'Suitability scores (79-88/100) evaluate flood safety, road connectivity, and institutional buffers.'
  },
  {
    step: 7,
    tab: 'capacity' as ActiveTab,
    title: 'Step 7: FLAGSHIP — Site Carrying Capacity & Binding Constraints',
    narrative: 'Inspect Site Alpha (Karkardooma / USAR Hub): Land allows 820 households, but Safe Absorption Capacity is strictly capped at 620 households! Why? Delhi Jal Board (DJB) water pipeline capacity is the Binding Constraint.',
    keyTakeaway: 'Deterministic min-operator: Safe Capacity = min(Land, Water, Sanitation, Road, Health, School). Transparent and non-blackbox.'
  },
  {
    step: 8,
    tab: 'allocation' as ActiveTab,
    title: 'Step 8: Capacity-Constrained Population-to-Site Matching',
    narrative: 'Demonstrates shared public capacity: Yamuna Khadar takes 620 HH of Site Alpha, locking it. Garhi Mandu must be routed to Site Beta (588 of 780 HH capacity).',
    keyTakeaway: 'Sites are shared resources. Allocation accounts for capacity headroom and origin-destination routes.'
  },
  {
    step: 9,
    tab: 'recommendations' as ActiveTab,
    title: 'Step 9: Executive Relocation Decision Brief',
    narrative: 'Review synthesized relocation brief: specific reasons for selection, alternatives rejected, confidence metrics (88%), and comparative evaluation.',
    keyTakeaway: 'Audit-ready, deterministic decision support with explicit mathematical rationale.'
  },
  {
    step: 10,
    tab: 'audit' as ActiveTab,
    title: 'Step 10: Audit Trail, Provenance & Methodology Verification',
    narrative: 'Inspect the transparent audit ledger, multi-source agency benchmarks (CWC / DJB / PWD / NGT), and reference records.',
    keyTakeaway: 'Accountable decision support from flood risk assessment to sustainable resettlement.'
  }
];

export const GuidedTour: React.FC<GuidedTourProps> = ({
  currentStep,
  totalSteps,
  onNextStep,
  onPrevStep,
  onExitTour,
}) => {
  const current = TOUR_STEPS[currentStep - 1] || TOUR_STEPS[0];

  return (
    <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 sticky top-[57px] z-40 shadow-sm">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-700 text-white font-black text-sm shrink-0 shadow-sm">
            {current.step}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Interactive Guided Tour (Step {current.step} of {totalSteps})
              </span>
              <span className="text-[10px] text-blue-800 font-mono bg-blue-100 px-1.5 py-0.5 rounded border border-blue-300 font-semibold">
                {current.tab.toUpperCase()}
              </span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">{current.title}</h2>
            <p className="text-xs text-slate-600 max-w-4xl">{current.narrative}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onPrevStep}
            disabled={currentStep === 1}
            className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-300 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Prev
          </button>

          <span className="text-xs font-mono font-bold text-blue-900 px-1">
            {currentStep}/{totalSteps}
          </span>

          {currentStep < totalSteps ? (
            <button
              onClick={onNextStep}
              className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
            >
              Next Step
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onExitTour}
              className="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Complete Tour
            </button>
          )}

          <button
            onClick={onExitTour}
            className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-blue-100"
            title="Exit Presentation Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
