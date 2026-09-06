import React from 'react';
import { 
  AlertOctagon, 
  Users, 
  Home, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert,
  Compass,
  FileText,
  Activity
} from 'lucide-react';
import { Settlement, CandidateSite, RedZoneVersionData, AllocationAssignment, ActiveTab } from '../../types';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { GisMap } from '../map/GisMap';

interface OverviewModuleProps {
  settlements: Settlement[];
  candidateSites: CandidateSite[];
  activeRedZoneVersion: RedZoneVersionData;
  assignments: AllocationAssignment[];
  onNavigate: (tab: ActiveTab) => void;
  onSelectSettlement: (id: string) => void;
  onSelectSite: (id: string) => void;
  selectedSettlementId: string | null;
  selectedSiteId: string | null;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({
  settlements,
  candidateSites,
  activeRedZoneVersion,
  assignments,
  onNavigate,
  onSelectSettlement,
  onSelectSite,
  selectedSettlementId,
  selectedSiteId,
}) => {
  const totalPop = settlements.reduce((sum, s) => sum + s.population, 0);
  const totalHH = settlements.reduce((sum, s) => sum + s.households, 0);
  const immediateCount = settlements.filter(s => s.priority === 'Immediate').length;
  const totalSafeCapacityHH = candidateSites.reduce((sum, s) => sum + s.calculatedCapacity.netSafeAbsorptionCapacityHH, 0);
  const netMargin = totalSafeCapacityHH - totalHH;

  return (
    <div className="space-y-4">
      {/* Strategic Positioning Header Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-gov-surface via-gov-card to-gov-surface border border-gov-border shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5" />
                Permanent Relocation Decision Engine
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                Wayanad Rehabilitation Directive
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight mt-1">
              From Hazard Detection to Sustainable Permanent Resettlement
            </h2>
            <p className="text-xs text-slate-300 max-w-4xl mt-1 leading-relaxed">
              Standard disaster dashboards show where hazards happen. This platform establishes statutory unsuitability, determines relocation urgency, calculates sustainable site carrying capacity with binding infrastructure constraints, and executes capacity-constrained population matching.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('capacity')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              Explore Carrying Capacity Engine
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 8-Stage Workflow Bar */}
        <div className="mt-4 pt-3 border-t border-gov-border/70 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[760px] text-[11px] font-bold">
            <span className="text-red-400 flex items-center gap-1">1. Multi-Hazard Risk</span>
            <span className="text-slate-500">➔</span>
            <span className="text-red-300 flex items-center gap-1">2. Permanent Red Zone</span>
            <span className="text-slate-500">➔</span>
            <span className="text-orange-400 flex items-center gap-1">3. Vulnerable Settlements</span>
            <span className="text-slate-500">➔</span>
            <span className="text-amber-400 flex items-center gap-1">4. Relocation Priority</span>
            <span className="text-slate-500">➔</span>
            <span className="text-emerald-400 flex items-center gap-1">5. Candidate Sites</span>
            <span className="text-slate-500">➔</span>
            <span className="text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600 flex items-center gap-1">
              6. Carrying Capacity (FLAGSHIP)
            </span>
            <span className="text-slate-500">➔</span>
            <span className="text-blue-400 flex items-center gap-1">7. Allocation Matching</span>
            <span className="text-slate-500">➔</span>
            <span className="text-purple-400 flex items-center gap-1">8. Decision Brief</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          label="Vulnerable Settlements"
          value="5"
          subValue="Chooralmala & Mundakkai Corridor"
          icon={Home}
          variant="danger"
        />
        <MetricCard
          label="Population at Risk"
          value={totalPop.toLocaleString()}
          subValue={totalHH + ' Total Households'}
          icon={Users}
          variant="warning"
        />
        <MetricCard
          label="Immediate Priority"
          value={immediateCount + ' Sites'}
          subValue="990 Households (3,960 Pop)"
          icon={AlertOctagon}
          variant="danger"
          badgeText="CRITICAL"
        />
        <MetricCard
          label="Candidate Sites"
          value={candidateSites.length}
          subValue="Kalpetta, Nedumbala, Pozhuthana"
          icon={MapPin}
          variant="info"
        />
        <MetricCard
          label="Safe Absorption Cap"
          value={totalSafeCapacityHH + ' HH'}
          subValue={(totalSafeCapacityHH * 4).toLocaleString() + ' Population Capacity'}
          icon={CheckCircle2}
          variant="success"
        />
        <MetricCard
          label="Net Capacity Margin"
          value={'+' + netMargin + ' HH'}
          subValue="109.1% Total Relocation Coverage"
          icon={Activity}
          variant="success"
          badgeText="BALANCED"
        />
      </div>

      {/* Main Grid: GIS Map + Operational Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Central Map Column */}
        <div className="lg:col-span-8 bg-gov-dark rounded-xl border border-gov-border p-3 flex flex-col h-[560px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200">Interactive GIS Command Map</span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                Wayanad (11.585° N, 76.140° E)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-400">Click markers to inspect.</span>
              <button
                onClick={() => onNavigate('hazard')}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Layer Details ➔
              </button>
            </div>
          </div>

          <div className="flex-1 w-full h-full relative">
            <GisMap
              settlements={settlements}
              candidateSites={candidateSites}
              activeRedZoneVersion={activeRedZoneVersion}
              assignments={assignments}
              selectedSettlementId={selectedSettlementId}
              selectedSiteId={selectedSiteId}
              onSelectSettlement={onSelectSettlement}
              onSelectSite={onSelectSite}
            />
          </div>
        </div>

        {/* Right Side Operational Summary Column */}
        <div className="lg:col-span-4 space-y-3">
          {/* Urgent Action Banner */}
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-red-300">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Urgent Relocation Actions
              </span>
              <span className="text-[10px] bg-red-900/60 px-1.5 py-0.5 rounded text-red-200">
                Pre-Monsoon 2026
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              3 settlements (Mundakkai, Chooralmala, Punchirimattom) have irreversible crown and runout instability. Formal de-notification under DM Act 2005 recommended immediately.
            </p>
            <div className="space-y-1.5 pt-1">
              {settlements.filter(s => s.priority === 'Immediate').map(st => (
                <div 
                  key={st.id} 
                  onClick={() => { onSelectSettlement(st.id); onNavigate('settlements'); }}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-red-600/50 cursor-pointer transition-colors"
                >
                  <div>
                    <div className="font-bold text-white flex items-center gap-1">
                      <span>{st.name}</span>
                      <StatusBadge value={st.priority} size="sm" />
                    </div>
                    <div className="text-[10px] text-slate-400">{st.households} HH • {st.population} pop</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Flagship Capacity Spotlight */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-emerald-300">
              <span>Site Capacity Spotlight</span>
              <span className="text-[10px] bg-emerald-900 text-emerald-200 px-1.5 py-0.5 rounded font-mono">
                FLAGSHIP
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Carrying capacity is deterministic: <b className="text-white">min(Land, Water, Roads, Health, Schools)</b>.
            </p>
            <div className="space-y-1.5 pt-1">
              {candidateSites.slice(0, 2).map(site => (
                <div 
                  key={site.id} 
                  onClick={() => { onSelectSite(site.id); onNavigate('capacity'); }}
                  className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between font-bold text-white text-[11px]">
                    <span>{site.name.split('—')[0]}</span>
                    <span className="font-mono text-emerald-400">{site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH Safe</span>
                  </div>
                  <div className="text-[10px] text-amber-300 mt-0.5">
                    Binding Factor: {site.calculatedCapacity.bindingConstraint}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav Card */}
          <div className="p-3.5 rounded-xl bg-gov-card border border-gov-border text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Official Decision Report</span>
              <span className="text-[11px] text-slate-400">DDMA Relocation Briefing</span>
            </div>
            <button
              onClick={() => onNavigate('recommendations')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              View Brief
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
