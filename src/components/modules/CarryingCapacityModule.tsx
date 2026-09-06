import React, { useState } from 'react';
import { 
  Gauge, 
  AlertTriangle, 
  Sliders, 
  Droplet, 
  Road, 
  GraduationCap, 
  HeartPulse, 
  Maximize2, 
  Info, 
  RotateCcw
} from 'lucide-react';
import { CandidateSite } from '../../types';
import { computeSiteCarryingCapacity, CapacitySimulationParams } from '../../engine/capacityEngine';

interface CarryingCapacityModuleProps {
  candidateSites: CandidateSite[];
  selectedSiteId: string | null;
  onSelectSite: (id: string) => void;
}

export const CarryingCapacityModule: React.FC<CarryingCapacityModuleProps> = ({
  candidateSites,
  selectedSiteId,
  onSelectSite,
}) => {
  const activeSite = candidateSites.find(s => s.id === selectedSiteId) || candidateSites[0];

  const [simParams, setSimParams] = useState<CapacitySimulationParams>({
    waterAugmentationLitersPerDay: 0,
    roadExpansionMeters: 0,
    schoolSeatsAdded: 0,
    healthBedsAddedHH: 0,
    minPlotAreaSqMeters: activeSite.rawConstraints.minPlotAreaSqMetersPerHH
  });

  const [showHowCalculated, setShowHowCalculated] = useState<boolean>(true);

  const computed = computeSiteCarryingCapacity(activeSite.name, activeSite.rawConstraints, simParams);

  const resetSimulation = () => {
    setSimParams({
      waterAugmentationLitersPerDay: 0,
      roadExpansionMeters: 0,
      schoolSeatsAdded: 0,
      healthBedsAddedHH: 0,
      minPlotAreaSqMeters: activeSite.rawConstraints.minPlotAreaSqMetersPerHH
    });
  };

  const constraintsList = [
    { name: 'Buildable Land Capacity', cap: computed.landCapacityHH, unit: 'HH', icon: Maximize2, isBinding: computed.bindingConstraint === 'Buildable Land' },
    { name: 'Water Supply (Delhi Jal Board)', cap: computed.waterCapacityHH, unit: 'HH', icon: Droplet, isBinding: computed.bindingConstraint === 'Water Infrastructure' },
    { name: 'Road Access / Evacuation Width', cap: computed.roadCapacityHH, unit: 'HH', icon: Road, isBinding: computed.bindingConstraint === 'Road Access / Evacuation Width' },
    { name: 'Healthcare Capacity (Hedgewar/GTB)', cap: computed.healthCapacityHH, unit: 'HH', icon: HeartPulse, isBinding: computed.bindingConstraint === 'Healthcare Capacity' },
    { name: 'School & Educational Intake', cap: computed.schoolCapacityHH, unit: 'HH', icon: GraduationCap, isBinding: computed.bindingConstraint === 'School & Educational Capacity' },
  ];

  return (
    <div className="space-y-4">
      {/* Flagship Banner */}
      <div className="p-5 rounded-xl bg-white border border-emerald-300 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-700" />
                Flagship Technical Differentiator
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold border border-emerald-300">
                Deterministic Carrying Capacity Engine
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              "How Many Households Can This Sector Safely & Sustainably Accommodate?"
            </h2>
            <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
              Suitability is only an abstract score; carrying capacity is a real, hard numerical threshold. A site cannot absorb more families than its weakest infrastructure allows. Here we identify the exact <b>Binding Constraint</b> and allow real-time policy simulations.
            </p>
          </div>

          {/* Site Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-300 shrink-0">
            {candidateSites.map(s => (
              <button
                key={s.id}
                onClick={() => { onSelectSite(s.id); resetSimulation(); }}
                className={'px-3 py-1.5 rounded-lg text-xs font-bold transition-all ' + (
                  activeSite.id === s.id 
                    ? 'bg-blue-700 text-white shadow-xs' 
                    : 'text-slate-700 hover:text-slate-950'
                )}
              >
                {s.name.split('—')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Flagship Highlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 7 Columns: Giant Capacity & Constraint Bar Meter */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
          <div className="flex items-start justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{activeSite.name}</span>
              <div className="text-xs text-slate-600 mt-0.5">{activeSite.locationName} • Parcel Area: {activeSite.areaHectares} ha</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Overall Suitability</span>
              <span className="text-lg font-mono font-black text-emerald-700">{activeSite.suitabilityScore}/100</span>
            </div>
          </div>

          {/* Giant Safe Absorption Capacity Number */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Estimated Safe Absorption Capacity
            </span>
            <div className="text-5xl font-black font-mono text-emerald-700 tracking-tight">
              {computed.netSafeAbsorptionCapacityHH.toLocaleString()} <span className="text-2xl text-slate-700 font-sans font-semibold">households</span>
            </div>
            <p className="text-xs text-slate-600 pt-1">
              Population absorption capacity: <b className="text-slate-900 font-mono">~{computed.netSafePopulationCapacity.toLocaleString()} people</b> (CPHEEO 4 persons/HH norm)
            </p>
          </div>

          {/* Binding Constraint Callout Banner */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between font-bold text-amber-900">
              <span className="flex items-center gap-1.5 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                BINDING CONSTRAINT: {computed.bindingConstraint.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono bg-amber-100 px-2 py-0.5 rounded text-amber-900 border border-amber-300 font-bold">
                BOTTLENECK
              </span>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed">
              {computed.bindingConstraintExplanation}
            </p>
            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-amber-200">
              <span>Current Bottleneck Capacity: <b className="text-slate-900 font-mono">{computed.limitingBottleneckValue}</b></span>
              <span>Full Land Utilization Needs: <b className="text-amber-900 font-mono">{computed.limitingBottleneckRequired}</b></span>
            </div>
          </div>

          {/* Constraints Visual Comparison */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Multi-Constraint Breakdown (Limiting Factor Analysis)</span>
              <span className="text-[11px] text-slate-500 font-normal">Lowest bar dictates safe capacity</span>
            </div>

            <div className="space-y-2">
              {constraintsList.map((c, i) => {
                const Icon = c.icon;
                const maxCap = Math.max(...constraintsList.map(item => item.cap));
                const pct = Math.round((c.cap / maxCap) * 100);
                return (
                  <div key={i} className={'p-3 rounded-lg border text-xs transition-all ' + (
                    c.isBinding 
                      ? 'bg-amber-50/70 border-amber-400 ring-1 ring-amber-300' 
                      : 'bg-slate-50 border-slate-200'
                  )}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className={'w-4 h-4 ' + (c.isBinding ? 'text-amber-700' : 'text-slate-500')} />
                        <span className={'font-semibold ' + (c.isBinding ? 'text-amber-900 font-bold' : 'text-slate-800')}>
                          {c.name}
                        </span>
                        {c.isBinding && (
                          <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                            BINDING LIMIT
                          </span>
                        )}
                      </div>
                      <span className="font-mono font-bold text-slate-900 text-xs">{c.cap.toLocaleString()} HH</span>
                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={'h-full rounded-full transition-all duration-500 ' + (
                          c.isBinding ? 'bg-amber-600' : 'bg-blue-600'
                        )}
                        style={{ width: pct + '%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Interactive Sensitivity & Policy Simulator */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2 font-bold text-xs text-blue-900">
              <Sliders className="w-4 h-4 text-blue-700" />
              <span>Infrastructure Investment Simulator</span>
            </div>
            <button
              onClick={resetSimulation}
              className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Test how targeted capital expenditure unlocks absorption headroom. Adjust infrastructure sliders to see the binding constraint shift dynamically:
          </p>

          <div className="space-y-3 text-xs">
            {/* Water Slider */}
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="flex justify-between font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-blue-900">
                  <Droplet className="w-3.5 h-3.5 text-blue-700" />
                  Delhi Jal Board Water Pipeline Augmentation
                </span>
                <span className="font-mono text-blue-800 font-bold">
                  +{simParams.waterAugmentationLitersPerDay.toLocaleString()} L/day
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="150000"
                step="10000"
                value={simParams.waterAugmentationLitersPerDay}
                onChange={e => setSimParams(prev => ({ ...prev, waterAugmentationLitersPerDay: Number(e.target.value) }))}
                className="w-full accent-blue-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 L/day (Baseline)</span>
                <span>+150k L/day (+277 HH)</span>
              </div>
            </div>

            {/* Road Widening Slider */}
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="flex justify-between font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-orange-900">
                  <Road className="w-3.5 h-3.5 text-orange-700" />
                  PWD Approach Road / Bridge Widening
                </span>
                <span className="font-mono text-orange-800 font-bold">
                  +{simParams.roadExpansionMeters.toFixed(1)} m
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={simParams.roadExpansionMeters}
                onChange={e => setSimParams(prev => ({ ...prev, roadExpansionMeters: Number(e.target.value) }))}
                className="w-full accent-orange-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>+0m (Baseline)</span>
                <span>+6.0m (Double-lane standard)</span>
              </div>
            </div>

            {/* School Capacity Slider */}
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="flex justify-between font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-purple-900">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
                  Directorate of Education Desks Added
                </span>
                <span className="font-mono text-purple-800 font-bold">
                  +{simParams.schoolSeatsAdded} Seats
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                step="25"
                value={simParams.schoolSeatsAdded}
                onChange={e => setSimParams(prev => ({ ...prev, schoolSeatsAdded: Number(e.target.value) }))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 Seats</span>
                <span>+250 Seats (+208 HH)</span>
              </div>
            </div>

            {/* Healthcare Capacity Slider */}
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div className="flex justify-between font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-rose-900">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-700" />
                  Hedgewar / GTB Hospital Bed Roster
                </span>
                <span className="font-mono text-rose-800 font-bold">
                  +{simParams.healthBedsAddedHH} HH
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="20"
                value={simParams.healthBedsAddedHH}
                onChange={e => setSimParams(prev => ({ ...prev, healthBedsAddedHH: Number(e.target.value) }))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 HH</span>
                <span>+200 HH</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <span className="text-[11px] text-slate-500 uppercase font-bold block">Simulation Outcome:</span>
            <div className="text-slate-900 mt-1">
              Active Absorption: <b className="text-emerald-700 font-mono text-sm">{computed.netSafeAbsorptionCapacityHH.toLocaleString()} HH</b>
              <span className="text-slate-500 text-xs ml-2">
                (Baseline was {activeSite.calculatedCapacity.netSafeAbsorptionCapacityHH.toLocaleString()} HH)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Explanation */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <div 
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={() => setShowHowCalculated(!showHowCalculated)}
        >
          <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
            <Info className="w-4 h-4 text-blue-700" />
            <span>How Was Carrying Capacity Calculated? (Deterministic Min-Operator Formulation)</span>
          </div>
          <span className="text-xs text-blue-700 font-semibold">{showHowCalculated ? 'Collapse ▲' : 'Expand ▼'}</span>
        </div>

        {showHowCalculated && (
          <div className="pt-2 border-t border-slate-200 space-y-2 text-xs text-slate-600">
            <div className="p-3 rounded-lg bg-slate-50 font-mono text-emerald-800 text-xs border border-slate-200">
              Safe_Absorption_Capacity = min( Land_Capacity, Water_Capacity, Road_Capacity, Health_Capacity, School_Capacity ) - Existing_Host_Load
            </div>
            <p className="leading-relaxed text-xs">
              Unlike generic AI scoring, this engine evaluates physical saturation thresholds mandated by national and state benchmarks:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <b className="text-slate-900 block">1. Water Norm (CPHEEO / Delhi Jal Board):</b>
                135 litres per capita per day × 4 persons/HH = 540 L/day per household. Total pipeline allocation divided by 540 yields max households.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <b className="text-slate-900 block">2. Land Plot Norm (DDA / Master Plan):</b>
                Gross 160 sq.m per household, reserving 35% for roads, stormwater drains, and community greens.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <b className="text-slate-900 block">3. Road Evacuation (IRC Urban):</b>
                Clearance flow rate within a 90-minute disaster window. A 7.0m bridge bottlenecks clearance to 780 households.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <b className="text-slate-900 block">4. Social Absorption (UDISE+ / NHM):</b>
                Local school classroom and primary health hospital bed roster thresholds within 3 km catchment.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
