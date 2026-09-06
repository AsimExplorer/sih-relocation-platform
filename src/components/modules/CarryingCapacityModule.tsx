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
  RotateCcw,
  Layers,
  XCircle,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { CandidateSite } from '../../types';
import { computeSiteCarryingCapacity, CapacitySimulationParams } from '../../engine/capacityEngine';
import { DATA_CONFIDENCE_METRICS } from '../../data/delhiData';

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
    sanitationAugmentationLitersPerDay: 0,
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
      sanitationAugmentationLitersPerDay: 0,
      roadExpansionMeters: 0,
      schoolSeatsAdded: 0,
      healthBedsAddedHH: 0,
      minPlotAreaSqMeters: activeSite.rawConstraints.minPlotAreaSqMetersPerHH
    });
  };

  const constraintsList = [
    { name: 'Buildable Land Capacity', cap: computed.landCapacityHH, unit: 'HH', icon: Maximize2, isBinding: computed.bindingConstraint === 'Buildable Land', color: 'text-slate-700 bg-slate-50' },
    { name: 'Water Supply (Delhi Jal Board WTP)', cap: computed.waterCapacityHH, unit: 'HH', icon: Droplet, isBinding: computed.bindingConstraint === 'Water Infrastructure', color: 'text-blue-900 bg-blue-50' },
    { name: 'Sanitation / STP (Delhi Jal Board)', cap: computed.sanitationCapacityHH, unit: 'HH', icon: Layers, isBinding: computed.bindingConstraint === 'Sanitation & Wastewater Treatment', color: 'text-indigo-900 bg-indigo-50' },
    { name: 'Road Evacuation Width (PWD)', cap: computed.roadCapacityHH, unit: 'HH', icon: Road, isBinding: computed.bindingConstraint === 'Road Access / Evacuation Width', color: 'text-slate-900 bg-slate-50' },
    { name: 'Healthcare Bed Intake (NHM)', cap: computed.healthCapacityHH, unit: 'HH', icon: HeartPulse, isBinding: computed.bindingConstraint === 'Healthcare Capacity', color: 'text-rose-900 bg-rose-50' },
    { name: 'School Desks (UDISE+)', cap: computed.schoolCapacityHH, unit: 'HH', icon: GraduationCap, isBinding: computed.bindingConstraint === 'School & Educational Capacity', color: 'text-amber-900 bg-amber-50' },
  ];

  return (
    <div className="space-y-4">
      {/* Flagship Banner */}
      <div className="p-5 rounded-xl bg-white border border-emerald-300 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-700" />
                SURAKSHA Flagship Differentiator
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold border border-emerald-300">
                Multi-Resource Carrying Capacity & Bottleneck Engine
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              "How Many Households Can This Sector Safely & Sustainably Accommodate?"
            </h2>
            <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
              <b>Fundamental Planning Principle:</b> More available land does NOT equal more relocation capacity. Unweighted averages of resources are mathematically invalid and lead to secondary disasters. The platform computes individual capacities for Land, Water, Sanitation, Roads, Health, and Schools, then applies a strict <b>min-operator</b> to identify the governing bottleneck.
            </p>
          </div>

          {/* Site Selector Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300 shrink-0 overflow-x-auto">
            {candidateSites.map(s => (
              <button
                key={s.id}
                onClick={() => { onSelectSite(s.id); resetSimulation(); }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeSite.id === s.id 
                    ? s.status === 'REJECTED' 
                      ? 'bg-red-700 text-white shadow-xs' 
                      : 'bg-blue-700 text-white shadow-xs' 
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {s.name.split('—')[0]} {s.status === 'REJECTED' ? '(REJ)' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottleneck-Based Rejection Principle Banner */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${
        activeSite.status === 'REJECTED'
          ? 'bg-red-50/80 border-red-300 text-red-950'
          : activeSite.status === 'LIMITED'
          ? 'bg-amber-50/80 border-amber-300 text-amber-950'
          : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
      }`}>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 font-bold text-sm">
            {activeSite.status === 'REJECTED' ? (
              <XCircle className="w-4 h-4 text-red-700" />
            ) : activeSite.status === 'LIMITED' ? (
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            )}
            <span>Site Status: {activeSite.status} — {activeSite.name}</span>
          </div>
          <p className="text-xs font-medium">
            {activeSite.statusReason}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Final Safe Capacity</span>
          <div className="font-mono text-xl font-black">
            {computed.netSafeAbsorptionCapacityHH} HH <span className="text-xs font-normal">({computed.netSafePopulationCapacity} pop)</span>
          </div>
        </div>
      </div>

      {/* Capacity Breakdown Comparison Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {constraintsList.map((item, idx) => (
          <div 
            key={idx}
            className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
              item.isBinding 
                ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-2xs' 
                : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 truncate">
                <item.icon className="w-3.5 h-3.5 text-slate-600" />
                {item.name.split('(')[0]}
              </span>
              {item.isBinding && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-100 text-red-900 border border-red-200 font-bold uppercase">
                  BOTTLENECK
                </span>
              )}
            </div>
            <div className="font-mono text-lg font-black text-slate-900">
              {item.cap} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {item.isBinding ? 'Limits safe absorption' : 'Headroom available'}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Infrastructure Sensitivity Simulator */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Infrastructure Capacity Sensitivity Simulator
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
              Dynamic Bottleneck Shift
            </span>
          </div>
          <button
            onClick={resetSimulation}
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Upgrades
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Simulate municipal interventions (DJB water pipeline expansion, packaged STP installation, PWD road widening) to discover which upgrade unlocks the next tier of safe housing capacity:
        </p>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Water Augmentation */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-blue-900 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-blue-600" />
                DJB Water Pipeline Yield
              </span>
              <span className="font-mono font-bold text-blue-950 text-[11px]">
                +{simParams.waterAugmentationLitersPerDay.toLocaleString()} L/day
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="250000"
              step="25000"
              value={simParams.waterAugmentationLitersPerDay}
              onChange={(e) => setSimParams(prev => ({ ...prev, waterAugmentationLitersPerDay: Number(e.target.value) }))}
              className="w-full accent-blue-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Baseline (0)</span>
              <span>+250k L/day</span>
            </div>
          </div>

          {/* Sanitation STP Augmentation */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-indigo-900 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                DJB STP Sanitation Intake
              </span>
              <span className="font-mono font-bold text-indigo-950 text-[11px]">
                +{simParams.sanitationAugmentationLitersPerDay.toLocaleString()} L/day
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="250000"
              step="25000"
              value={simParams.sanitationAugmentationLitersPerDay}
              onChange={(e) => setSimParams(prev => ({ ...prev, sanitationAugmentationLitersPerDay: Number(e.target.value) }))}
              className="w-full accent-indigo-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Baseline (0)</span>
              <span>+250k L/day</span>
            </div>
          </div>

          {/* Road RoW Expansion */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Road className="w-3.5 h-3.5 text-slate-700" />
                PWD Road Evacuation RoW
              </span>
              <span className="font-mono font-bold text-slate-950 text-[11px]">
                +{simParams.roadExpansionMeters} m
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="7"
              step="0.5"
              value={simParams.roadExpansionMeters}
              onChange={(e) => setSimParams(prev => ({ ...prev, roadExpansionMeters: Number(e.target.value) }))}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Baseline</span>
              <span>+7.0m 2-Lane Added</span>
            </div>
          </div>
        </div>

        {/* Dynamic Simulation Result Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Simulated Outcome</span>
            <div className="text-xs text-slate-800 font-medium">
              Active Limiting Bottleneck: <b className="text-amber-800">{computed.bindingConstraint}</b>
            </div>
            <p className="text-xs text-slate-600">
              {computed.bindingConstraintExplanation}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Simulated Safe Absorption</span>
            <div className="font-mono text-2xl font-black text-emerald-700">
              {computed.netSafeAbsorptionCapacityHH} HH
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              ({computed.netSafePopulationCapacity} persons)
            </span>
          </div>
        </div>
      </div>

      {/* DATA CONFIDENCE & QUALITY SECTION */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span className="font-bold text-slate-900">Utility Infrastructure Confidence:</span>
          <span className="font-mono text-emerald-800 font-bold">{DATA_CONFIDENCE_METRICS.overallConfidencePct}% Assured</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">Water & Sanitation calibrated with DJB Bhagirathi WTP & Kondli STP telemetry registers.</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Governed by CPHEEO & NGT Guidelines
        </div>
      </div>
    </div>
  );
};
