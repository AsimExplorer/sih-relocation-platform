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
  const totalSafeCapacityHH = candidateSites
    .filter(s => s.status !== 'REJECTED')
    .reduce((sum, s) => sum + s.calculatedCapacity.netSafeAbsorptionCapacityHH, 0);
  const netMargin = totalSafeCapacityHH - totalHH;

  return (
    <div className="space-y-4">
      {/* Strategic Positioning Header Card */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-blue-700" />
                SURAKSHA — Delhi Disaster Relocation Decision Platform
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                Permanent Resettlement Planning
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              From Yamuna Flood Inundation to Sustainable Permanent Resettlement
            </h2>
            <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
              SURAKSHA fundamentally differentiates <b>Permanent Relocation Planning</b> from temporary relief camps. It establishes habitational unsuitability for active floodplain clusters, determines explainable AI-assisted relocation priority, calculates sustainable carrying capacity across 6 municipal resources (including Sanitation), rejects parcels with fatal bottlenecks, and matches displaced families into safe urban sectors (including the Surajmal Vihar / USAR corridor).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('capacity')}
              className="px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              Carrying Capacity Engine
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 10-Stage Workflow Bar */}
        <div className="mt-4 pt-3 border-t border-slate-200 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[900px] text-[11px] font-bold">
            <span className="text-blue-900 flex items-center gap-1">1. Multi-Hazard</span>
            <span className="text-slate-400">➔</span>
            <span className="text-red-700 flex items-center gap-1">2. Red Zone</span>
            <span className="text-slate-400">➔</span>
            <span className="text-orange-700 flex items-center gap-1">3. Settlements</span>
            <span className="text-slate-400">➔</span>
            <span className="text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
              4. AI Priority
            </span>
            <span className="text-slate-400">➔</span>
            <span className="text-emerald-700 flex items-center gap-1">5. Candidate Sites</span>
            <span className="text-slate-400">➔</span>
            <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
              6. Carrying Capacity (Min-Op)
            </span>
            <span className="text-slate-400">➔</span>
            <span className="text-rose-700 flex items-center gap-1">7. Bottleneck Rejection</span>
            <span className="text-slate-400">➔</span>
            <span className="text-blue-700 flex items-center gap-1">8. Matching</span>
            <span className="text-slate-400">➔</span>
            <span className="text-slate-900 flex items-center gap-1">9. Decision Brief</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          label="Vulnerable Habitations"
          value="5"
          subValue="Yamuna Khadar & Shastri Park"
          icon={Home}
          variant="danger"
        />
        <MetricCard
          label="Population at Risk"
          value={totalPop.toLocaleString()}
          subValue={totalHH.toLocaleString() + ' Total Households'}
          icon={Users}
          variant="warning"
        />
        <MetricCard
          label="Immediate Priority"
          value={immediateCount + ' Clusters'}
          subValue="1,722 Households (8,610 Pop)"
          icon={AlertOctagon}
          variant="danger"
          badgeText="CRITICAL"
        />
        <MetricCard
          label="Candidate Parcels"
          value={candidateSites.length}
          subValue="Karkardooma (USAR), Mandoli, Anand Vihar"
          icon={MapPin}
          variant="info"
        />
        <MetricCard
          label="Safe Absorption Cap"
          value={totalSafeCapacityHH.toLocaleString() + ' HH'}
          subValue={(totalSafeCapacityHH * 4).toLocaleString() + ' Population Capacity'}
          icon={CheckCircle2}
          variant="success"
        />
        <MetricCard
          label="Net Capacity Margin"
          value={'+' + netMargin + ' HH'}
          subValue="100.1% Relocation Coverage"
          icon={Activity}
          variant="success"
          badgeText="BALANCED"
        />
      </div>

      {/* Main Grid: GIS Map + Operational Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Central Map Column */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col h-[560px] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">East Delhi GIS Decision Map</span>
              <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono border border-slate-200">
                Surajmal Vihar / USAR (28.6538° N, 77.3015° E)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-500">Public OpenStreetMap basemap (Zero API key)</span>
              <button
                onClick={() => onNavigate('hazard')}
                className="text-blue-700 hover:text-blue-800 font-semibold"
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
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs space-y-2 shadow-sm">
            <div className="flex items-center justify-between font-bold text-red-900">
              <span className="flex items-center gap-1.5 text-sm">
                <AlertOctagon className="w-4 h-4 text-red-700" />
                Urgent Relocation Directives
              </span>
              <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold border border-red-300">
                Pre-Monsoon Window
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              3 floodplain settlements (Yamuna Khadar East, Garhi Mandu, Bela Estate) lie in unbunded riverbed tracts that submerge whenever Hathnikund discharge exceeds 3 lakh cusecs.
            </p>
            <div className="space-y-1.5 pt-1">
              {settlements.filter(s => s.priority === 'Immediate').map(st => (
                <div 
                  key={st.id} 
                  onClick={() => { onSelectSettlement(st.id); onNavigate('settlements'); }}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 cursor-pointer transition-all shadow-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span>{st.name}</span>
                      <StatusBadge value={st.priority} size="sm" />
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{st.households} HH • {st.population.toLocaleString()} pop</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Flagship Capacity Spotlight */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2 shadow-sm">
            <div className="flex items-center justify-between font-bold text-emerald-900">
              <span className="text-sm">Carrying Capacity Spotlight</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold border border-emerald-300">
                FLAGSHIP
              </span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              Carrying capacity is deterministic: <b className="text-slate-900 font-semibold">min(Land, Water, Roads, Health, Schools)</b>.
            </p>
            <div className="space-y-1.5 pt-1">
              {candidateSites.slice(0, 2).map(site => (
                <div 
                  key={site.id} 
                  onClick={() => { onSelectSite(site.id); onNavigate('capacity'); }}
                  className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 cursor-pointer transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                    <span>{site.name.split('—')[0]}</span>
                    <span className="font-mono text-emerald-700">{site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH Safe</span>
                  </div>
                  <div className="text-[11px] text-amber-800 mt-0.5 font-medium">
                    Binding Factor: {site.calculatedCapacity.bindingConstraint}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav Card */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between shadow-sm">
            <div>
              <span className="font-bold text-slate-900 block">Executive Decision Brief</span>
              <span className="text-[11px] text-slate-500">Stage 8 Relocation Evaluation</span>
            </div>
            <button
              onClick={() => onNavigate('recommendations')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              View Brief
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
