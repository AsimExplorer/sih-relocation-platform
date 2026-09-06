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
  ShieldCheck,
  AlertTriangle
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
    { id: 'overview' as ActiveTab, label: 'Overview & Framework', icon: LayoutDashboard, badge: 'Summary' },
    { id: 'hazard' as ActiveTab, label: '1. Multi-Hazard Intelligence', icon: Flame, badge: 'Yamuna Flood' },
    { id: 'redzone' as ActiveTab, label: '2. Permanent Red Zone', icon: Ban, badge: 'v2.0 Active', isSpecial: true },
    { id: 'settlements' as ActiveTab, label: '3. Vulnerable Settlements', icon: Home, badge: '5 Habitations' },
    { id: 'priority' as ActiveTab, label: '4. Relocation Priority', icon: TrendingUp, badge: immediateCount + ' Immediate' },
    { id: 'candidates' as ActiveTab, label: '5. Candidate Resettlement Sites', icon: MapPin, badge: '5 Parcels (1 Rej)' },
    { id: 'capacity' as ActiveTab, label: '6. Carrying Capacity Engine', icon: Gauge, badge: 'Sanitation + Min-Op', isHighlight: true },
    { id: 'allocation' as ActiveTab, label: '7. Population-Site Matching', icon: GitMerge, badge: 'Constrained' },
    { id: 'recommendations' as ActiveTab, label: '8. Explainable Decision Brief', icon: FileCheck, badge: 'Decision Ready' },
    { id: 'audit' as ActiveTab, label: '9. Validation & Audit Trail', icon: History, badge: 'Cross-Source' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none">
      <div className="py-3">
        <div className="px-4 pb-2 mb-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold uppercase tracking-wider text-[11px]">SURAKSHA Pipeline</span>
          <span className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-semibold">9 Core Modules</span>
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
                    ? 'bg-blue-700 text-white shadow-xs border border-blue-800'
                    : item.isHighlight
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                    : item.isSpecial
                    ? 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
                    : 'text-slate-700 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isHighlight ? 'text-emerald-600' : item.isSpecial ? 'text-red-600' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${
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

      {/* Statutory Mandate & Capacity Summary Card */}
      <div className="p-3 m-2 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 shadow-xs">
        <div className="flex items-center justify-between text-blue-900 font-bold text-[11px]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            SURAKSHA Core Principle
          </span>
        </div>
        <p className="text-[11px] text-slate-600 leading-tight">
          <b>Permanent Resettlement</b> — not temporary relief camps. Safe capacity is governed strictly by the resource bottleneck (Water, Road, Sanitation, School, Health).
        </p>
        <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-center text-[10px]">
          <div className="p-1.5 rounded bg-white border border-slate-200">
            <span className="text-slate-500 block uppercase">Habitations</span>
            <span className="font-mono font-bold text-red-700">{immediateCount} Urgent</span>
          </div>
          <div className="p-1.5 rounded bg-white border border-slate-200">
            <span className="text-slate-500 block uppercase">Safe Capacity</span>
            <span className="font-mono font-bold text-emerald-700">{totalSafeCapacityHH} HH</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
