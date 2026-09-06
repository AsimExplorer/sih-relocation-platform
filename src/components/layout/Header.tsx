import React from 'react';
import { Shield, Sparkles, FileText, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { RedZoneVersionData, ActiveTab } from '../../types';

interface HeaderProps {
  currentRedZoneVersion: RedZoneVersionData;
  onToggleDemoMode: () => void;
  isDemoMode: boolean;
  onOpenReportModal: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRedZoneVersion,
  onToggleDemoMode,
  isDemoMode,
  onOpenReportModal,
  activeTab,
  onSelectTab,
}) => {
  const pipelineSteps: { id: ActiveTab; stepNumber: number; title: string }[] = [
    { id: 'hazard', stepNumber: 1, title: 'Multi-Hazard' },
    { id: 'redzone', stepNumber: 2, title: 'Red Zone' },
    { id: 'settlements', stepNumber: 3, title: 'Settlements' },
    { id: 'priority', stepNumber: 4, title: 'Priority' },
    { id: 'candidates', stepNumber: 5, title: 'Candidate Sites' },
    { id: 'capacity', stepNumber: 6, title: 'Carrying Capacity' },
    { id: 'allocation', stepNumber: 7, title: 'Allocation' },
    { id: 'recommendations', stepNumber: 8, title: 'Decision Brief' },
    { id: 'audit', stepNumber: 9, title: 'Validation & Audit' },
  ];

  const currentStepIndex = pipelineSteps.findIndex(s => s.id === activeTab);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Top Banner */}
      <div className="px-4 py-2.5 max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-900 border border-blue-950 flex items-center justify-center text-white shadow-sm shrink-0 font-black text-sm">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-widest text-blue-900 flex items-center gap-1">
                SURAKSHA
                <span className="text-[10px] font-normal text-slate-500 hidden sm:inline">• SIH 26191</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                Permanent Relocation Planning Platform
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                Prototype Demonstration
              </span>
            </div>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Delhi Disaster Management Authority (DDMA)
              <span className="text-xs font-normal text-slate-500 hidden xl:inline">
                • East Delhi Corridor (Adjacent to USAR, Surajmal Vihar / Yamuna Basin)
              </span>
            </h1>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200 flex items-center gap-1.5 text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold text-slate-900">East Delhi</span>
            <span className="text-[11px] text-slate-500">(USAR Hub)</span>
          </div>

          <div className="bg-red-50 px-2.5 py-1.5 rounded-md border border-red-200 flex items-center gap-1.5 text-red-900 font-mono text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span className="font-bold">{currentRedZoneVersion.label.split(' ')[0]}</span>
            <span className="text-red-700">({currentRedZoneVersion.date})</span>
          </div>

          <button
            onClick={onToggleDemoMode}
            className={`px-3 py-1.5 rounded-md font-bold text-xs flex items-center gap-1.5 transition-all border shadow-xs ${
              isDemoMode
                ? 'bg-amber-500 text-slate-950 border-amber-600 hover:bg-amber-400'
                : 'bg-blue-700 text-white border-blue-800 hover:bg-blue-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isDemoMode ? 'Exit Walkthrough' : 'Interactive SURAKSHA Tour'}
          </button>

          <button
            onClick={onOpenReportModal}
            className="px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            Export Official Dossier
          </button>
        </div>
      </div>

      {/* 10-Stage Decision Pipeline Breadcrumb Bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-1.5 overflow-x-auto">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-1 text-[11px]">
          <div className="flex items-center gap-1 text-slate-500 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-2">
            <span>SURAKSHA Pipeline:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
            {pipelineSteps.map((step, idx) => {
              const isCurrent = activeTab === step.id;
              const isCompleted = currentStepIndex > idx;
              return (
                <button
                  key={step.id}
                  onClick={() => onSelectTab(step.id)}
                  className={`px-2 py-0.5 rounded-full flex items-center gap-1 transition-all whitespace-nowrap ${
                    isCurrent
                      ? 'bg-blue-700 text-white font-bold shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold hover:bg-emerald-100'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <span className={`w-3.5 h-3.5 rounded-full text-[9px] font-bold flex items-center justify-center ${
                      isCurrent ? 'bg-white text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {step.stepNumber}
                    </span>
                  )}
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>
          <div className="text-[10px] text-slate-500 shrink-0 ml-2 hidden md:block">
            <span className="font-semibold text-slate-800">Permanent Habitation Review</span>
          </div>
        </div>
      </div>
    </header>
  );
};
