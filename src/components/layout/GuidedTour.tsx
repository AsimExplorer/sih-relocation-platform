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
    title: 'Step 1: Open Wayanad District Situation Overview',
    narrative: 'Orient the authority: 5 vulnerable settlements in the Meppadi corridor, 5,460 people in extreme danger, and an urgent requirement for permanent relocation planning.',
    keyTakeaway: 'This platform answers what happens AFTER hazard detection: who moves, where to, and how many can sustainably fit.'
  },
  {
    step: 2,
    tab: 'hazard' as ActiveTab,
    title: 'Step 2: Inspect Multi-Hazard Risk & Debris Runout',
    narrative: 'Examine multi-hazard triggers: 34° slope gradients, catastrophic debris flow channels, and 48-hour monsoonal precipitation thresholds.',
    keyTakeaway: 'Standard systems stop here at hazard overlays. Our platform uses this as an input into statutory unsuitability zoning.'
  },
  {
    step: 3,
    tab: 'redzone' as ActiveTab,
    title: 'Step 3: Activate Permanent Unsuitability Red Zone (v2.0)',
    narrative: 'Not just a temporary hazard buffer: Red Zone is a permanent habitation prohibition under the DM Act 2005 based on irreversible geomorphic failure.',
    keyTakeaway: 'Notice version reassessment: v1 (14.2 sq.km, Jan 2025) expanded to v2 (23.8 sq.km, Jan 2026) post-disaster.'
  },
  {
    step: 4,
    tab: 'settlements' as ActiveTab,
    title: 'Step 4: Select Vulnerable Settlement (Mundakkai / Chooralmala)',
    narrative: 'Click on Mundakkai: 1,420 population, 100% Red Zone overlap, 3 catastrophic slide recurrences, and complete arterial bridge islanding.',
    keyTakeaway: 'Immediate relocation classification with full statutory justification.'
  },
  {
    step: 5,
    tab: 'candidates' as ActiveTab,
    title: 'Step 5: Review Candidate Relocation Sites (Suitability Scoring)',
    narrative: 'Evaluate 4 candidate resettlement parcels in safer plateau areas (Kalpetta East, Nedumbala, Pozhuthana, Ambalavayal).',
    keyTakeaway: 'Suitability scores (78-86/100) evaluate slope, hazard safety, and trunk connectivity.'
  },
  {
    step: 6,
    tab: 'capacity' as ActiveTab,
    title: 'Step 6: FLAGSHIP — Site Carrying Capacity & Binding Constraints',
    narrative: 'Inspect Site Alpha: Land allows 580 households, but Safe Absorption Capacity is capped at 340 households! Why? Water Infrastructure is the Binding Constraint.',
    keyTakeaway: 'Deterministic min-operator: Safe Capacity = min(Land, Water, Road, Health, School). Transparent and non-blackbox.'
  },
  {
    step: 7,
    tab: 'allocation' as ActiveTab,
    title: 'Step 7: Capacity-Constrained Population-to-Site Matching',
    narrative: 'Demonstrates shared public capacity: Mundakkai takes 340 HH of Site Alpha, locking it. Chooralmala must be routed to Site Beta (465 of 490 HH capacity).',
    keyTakeaway: 'Sites are shared resources. Allocation accounts for capacity headroom and origin-destination routes.'
  },
  {
    step: 8,
    tab: 'recommendations' as ActiveTab,
    title: 'Step 8: Government-Grade Explainable Decision Brief',
    narrative: 'Review formal DDMA decision brief: specific reasons for selection, alternatives rejected, confidence metrics, and statutory sign-off block.',
    keyTakeaway: 'No vague AI chatbot claims; audit-ready administrative documentation.'
  },
  {
    step: 9,
    tab: 'audit' as ActiveTab,
    title: 'Step 9: Audit Trail, Provenance & Methodology Verification',
    narrative: 'Inspect the cryptographic audit ledger, Bhuvan / NDEM / JJM data provenance, and published gazette notifications.',
    keyTakeaway: 'Accountable government decision support from risk to resettlement.'
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
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-blue-500/40 px-4 py-2.5 sticky top-[57px] z-40 shadow-xl">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm shrink-0 shadow-md">
            {current.step}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Hackathon Presentation Walkthrough (Step {current.step} of {totalSteps})
              </span>
              <span className="text-[10px] text-blue-300 font-mono bg-blue-900/60 px-1.5 py-0.2 rounded border border-blue-700">
                {current.tab.toUpperCase()}
              </span>
            </div>
            <h2 className="text-sm font-bold text-white tracking-tight">{current.title}</h2>
            <p className="text-xs text-slate-300 max-w-4xl">{current.narrative}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onPrevStep}
            disabled={currentStep === 1}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Prev
          </button>

          <span className="text-xs font-mono text-amber-300 px-1">
            {currentStep}/{totalSteps}
          </span>

          {currentStep < totalSteps ? (
            <button
              onClick={onNextStep}
              className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md shadow-amber-950"
            >
              Next Step
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onExitTour}
              className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-emerald-950"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Complete Tour
            </button>
          )}

          <button
            onClick={onExitTour}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            title="Exit Presentation Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
