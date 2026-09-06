import React from 'react';
import { Shield, Sparkles, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { RedZoneVersionData, ActiveTab } from '../../types';

interface HeaderProps {
  currentRedZoneVersion: RedZoneVersionData;
  onToggleDemoMode: () => void;
  isDemoMode: boolean;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRedZoneVersion,
  onToggleDemoMode,
  isDemoMode,
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
      <div className="px-4 py-2.5 max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand identity: ONLY [Shield Icon] SURAKSHA */}
        <div 
          onClick={() => onSelectTab('overview')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          title="SURAKSHA — Return to Overview"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-900 border border-blue-950 flex items-center justify-center text-white shadow-xs shrink-0 transition-transform group-hover:scale-105">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-wider text-slate-900 group-hover:text-blue-900 transition-colors">
            SURAKSHA
          </span>
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
            {isDemoMode ? 'Exit Tour' : 'Interactive SURAKSHA Tour'}
          </button>
        </div>
      </div>

      {/* 9-Stage Decision Pipeline Navigation Bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 overflow-x-auto">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
            {/* Overview Button */}
            <button
              onClick={() => onSelectTab('overview')}
              className={`px-3 py-1 rounded-full flex items-center gap-1.5 text-xs transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-blue-700 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 font-semibold'
              }`}
            >
              <span>Overview</span>
            </button>
            <div className="h-4 w-px bg-slate-300 mx-0.5" />

            {/* 9 Sequential Pipeline Steps */}
            {pipelineSteps.map((step, idx) => {
              const isCurrent = activeTab === step.id;
              const isCompleted = currentStepIndex > idx;
              return (
                <button
                  key={step.id}
                  onClick={() => onSelectTab(step.id)}
                  className={`px-3 py-1 rounded-full flex items-center gap-1.5 text-xs transition-all whitespace-nowrap font-medium ${
                    isCurrent
                      ? 'bg-blue-700 text-white font-bold shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold hover:bg-emerald-100'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
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

          <div className="text-[11px] text-slate-500 shrink-0 hidden xl:block">
            <span className="font-semibold text-slate-700">Permanent Habitation Review</span>
          </div>
        </div>
      </div>
    </header>
  );
};
