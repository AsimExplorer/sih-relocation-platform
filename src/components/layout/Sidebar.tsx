import React from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  Ban, 
  Home, 
  TrendingUp, 
  MapPin, 
  Gauge, 
  GitMerge, 
  FileCheck, 
  History,
  ShieldAlert
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  immediateCount: number;
  totalVulnerablePop: number;
  totalSafeCapacityHH: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  immediateCount,
  totalVulnerablePop,
  totalSafeCapacityHH,
}) => {
  const navItems = [
    { id: 'overview' as ActiveTab, label: 'Overview & KPIs', icon: LayoutDashboard, badge: 'Summary' },
    { id: 'hazard' as ActiveTab, label: 'Hazard & Multi-Risk', icon: Flame, badge: '5 Layers' },
    { id: 'redzone' as ActiveTab, label: 'Permanent Red Zone', icon: Ban, badge: 'v2.0 Active', isSpecial: true },
    { id: 'settlements' as ActiveTab, label: 'Vulnerable Settlements', icon: Home, badge: '5 Sites' },
    { id: 'priority' as ActiveTab, label: 'Relocation Priority', icon: TrendingUp, badge: immediateCount + ' Urgent' },
    { id: 'candidates' as ActiveTab, label: 'Candidate Sites', icon: MapPin, badge: '4 Parcels' },
    { id: 'capacity' as ActiveTab, label: 'Carrying Capacity', icon: Gauge, badge: 'FLAGSHIP', isHighlight: true },
    { id: 'allocation' as ActiveTab, label: 'Allocation & Matching', icon: GitMerge, badge: 'Solver' },
    { id: 'recommendations' as ActiveTab, label: 'Decision Brief', icon: FileCheck, badge: 'DDMA Ready' },
    { id: 'audit' as ActiveTab, label: 'Audit & Methodology', icon: History, badge: 'Verified' },
  ];

  return (
    <aside className="w-64 bg-gov-dark border-r border-gov-border flex flex-col justify-between shrink-0 select-none">
      <div className="py-3">
        <div className="px-4 pb-2 mb-2 border-b border-gov-border/60 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-[11px]">Workflow Pipeline</span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">10 Steps</span>
        </div>
        <nav className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-950 border border-blue-500/50'
                    : item.isHighlight
                    ? 'bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40 border border-emerald-800/40'
                    : item.isSpecial
                    ? 'bg-red-950/30 text-red-300 hover:bg-red-900/30 border border-red-900/30'
                    : 'text-slate-300 hover:bg-gov-surface hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isHighlight ? 'text-emerald-400' : item.isSpecial ? 'text-red-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                      isActive
                        ? 'bg-blue-800 text-blue-100'
                        : item.isHighlight
                        ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700'
                        : item.isSpecial
                        ? 'bg-red-900/80 text-red-200 border border-red-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 m-2 rounded-xl bg-gov-surface border border-gov-border text-xs space-y-2">
        <div className="flex items-center gap-1.5 text-red-400 font-bold text-[11px]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Wayanad Life-Safety Metrics</span>
        </div>
        <div className="space-y-1 text-slate-300 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-400">At-Risk Population:</span>
            <span className="font-mono font-bold text-white">{totalVulnerablePop.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Safe Absorption Cap:</span>
            <span className="font-mono font-bold text-emerald-400">{totalSafeCapacityHH.toLocaleString()} HH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Net Headroom:</span>
            <span className="font-mono font-bold text-blue-400">+{totalSafeCapacityHH - 1365} HH</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
