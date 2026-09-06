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
    { id: 'hazard' as ActiveTab, label: 'Hazard & Multi-Risk', icon: Flame, badge: 'Yamuna Flood' },
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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none">
      <div className="py-3">
        <div className="px-4 pb-2 mb-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold uppercase tracking-wider text-[11px]">Workflow Pipeline</span>
          <span className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-semibold">10 Steps</span>
        </div>
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-sm border border-blue-800'
                    : item.isHighlight
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                    : item.isSpecial
                    ? 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
                    : 'text-slate-700 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isHighlight ? 'text-emerald-600' : item.isSpecial ? 'text-red-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : item.isHighlight
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : item.isSpecial
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
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

      <div className="p-3 m-2 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 shadow-sm">
        <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px]">
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>East Delhi Vulnerability Ledger</span>
        </div>
        <div className="space-y-1 text-slate-600 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Exposed Population:</span>
            <span className="font-mono font-bold text-slate-900">{totalVulnerablePop.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Safe Absorption Cap:</span>
            <span className="font-mono font-bold text-emerald-700">{totalSafeCapacityHH.toLocaleString()} HH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Net Headroom:</span>
            <span className="font-mono font-bold text-blue-700">+{totalSafeCapacityHH - 2448} HH</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
