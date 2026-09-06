import React, { useState } from 'react';
import { X, Plus, Play, RotateCcw, CheckCircle2, Activity } from 'lucide-react';
import { DisasterScenario, SCENARIO_LIST, createCustomSettlement } from '../../data/scenariosData';
import { Settlement } from '../../types';

interface DataIngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeScenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
  onAddCustomSettlement: (settlement: Settlement) => void;
  onResetToBaseline: () => void;
  activeSettlementsCount: number;
}

export const DataIngestionModal: React.FC<DataIngestionModalProps> = ({
  isOpen,
  onClose,
  activeScenarioId,
  onSelectScenario,
  onAddCustomSettlement,
  onResetToBaseline,
  activeSettlementsCount,
}) => {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'custom'>('scenarios');

  // Custom settlement form state
  const [name, setName] = useState('Bela Estate Floodplain Cluster');
  const [panchayat, setPanchayat] = useState('Preet Vihar Sub-Division, East Delhi');
  const [population, setPopulation] = useState(1750);
  const [households, setHouseholds] = useState(350);
  const [redZoneOverlapPct, setRedZoneOverlapPct] = useState(90);
  const [hazardExposure, setHazardExposure] = useState<'Extreme' | 'Very High' | 'High' | 'Moderate'>('Extreme');
  const [vulnerabilityScore, setVulnerabilityScore] = useState(92);
  const [historicalRecurrence, setHistoricalRecurrence] = useState(88);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([
    'Active Riverbed Inundation (Below CWC Danger Mark)',
    'Unreinforced Marginal Bund Erosion & Scouring',
    'Severe Drainage Regulator Backflow'
  ]);

  if (!isOpen) return null;

  const handlePopulationChange = (val: number) => {
    setPopulation(val);
    setHouseholds(Math.round(val / 5));
  };

  const handleToggleDriver = (driver: string) => {
    if (selectedDrivers.includes(driver)) {
      setSelectedDrivers(selectedDrivers.filter(d => d !== driver));
    } else {
      setSelectedDrivers([...selectedDrivers, driver]);
    }
  };

  const handleLoadPreset = (preset: {
    name: string;
    panchayat: string;
    pop: number;
    hh: number;
    rz: number;
    hazard: 'Extreme' | 'Very High' | 'High' | 'Moderate';
    vuln: number;
    rec: number;
    drivers: string[];
  }) => {
    setName(preset.name);
    setPanchayat(preset.panchayat);
    setPopulation(preset.pop);
    setHouseholds(preset.hh);
    setRedZoneOverlapPct(preset.rz);
    setHazardExposure(preset.hazard);
    setVulnerabilityScore(preset.vuln);
    setHistoricalRecurrence(preset.rec);
    setSelectedDrivers(preset.drivers);
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const newSettlement = createCustomSettlement({
      name,
      panchayat,
      population,
      households,
      redZoneOverlapPct,
      hazardExposure,
      vulnerabilityScore,
      historicalRecurrence,
      primaryDrivers: selectedDrivers
    });
    onAddCustomSettlement(newSettlement);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-xs">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Live Data Ingestion & Disaster Scenario Simulator
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                  Interactive Lab
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Simulate evolving Yamuna riverbed flood hazards or ingest new field-surveyed habitations into SURAKSHA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3 pb-0 border-b border-slate-200 bg-white flex items-center gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={'pb-2.5 transition-all border-b-2 flex items-center gap-1.5 ' + (
              activeTab === 'scenarios'
                ? 'border-blue-700 text-blue-900 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            )}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Pre-Configured Disaster Scenarios ({SCENARIO_LIST.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={'pb-2.5 transition-all border-b-2 flex items-center gap-1.5 ' + (
              activeTab === 'custom'
                ? 'border-blue-700 text-blue-900 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ingest Custom Habitation Data</span>
          </button>

          <div className="ml-auto text-slate-500 text-[11px] font-medium hidden sm:block">
            Currently Loaded: <span className="font-bold text-slate-800">{activeSettlementsCount} Habitations</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'scenarios' ? (
            <div className="space-y-3">
              <div className="text-xs text-slate-600 leading-relaxed bg-blue-50/70 p-3 rounded-lg border border-blue-200">
                <b>Demonstration Guide:</b> Select any scenario below to observe how the entire platform reacts in real-time. The active flood envelope updates, settlements escalate in priority, the <b>AI-Assisted Priority Engine</b> re-evaluates all habitations, and the <b>Capacity Matching Solver</b> instantly reallocates populations across candidate resettlement sites.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {SCENARIO_LIST.map((sc: DisasterScenario) => {
                  const isActive = sc.id === activeScenarioId;
                  return (
                    <div
                      key={sc.id}
                      className={'p-4 rounded-xl border transition-all flex flex-col justify-between ' + (
                        isActive
                          ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                      )}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-sm text-slate-900 leading-snug">
                            {sc.name}
                          </span>
                          <span className={'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ' + (
                            sc.severity === 'Catastrophic'
                              ? 'bg-red-100 text-red-900 border border-red-300'
                              : sc.severity === 'Severe'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-blue-100 text-blue-900 border border-blue-300'
                          )}>
                            {sc.severity}
                          </span>
                        </div>

                        {/* Hydrological Metrics Strip */}
                        <div className="grid grid-cols-2 gap-2 text-xs py-1.5 px-2.5 rounded-lg bg-slate-100/70 border border-slate-200">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Yamuna Water Level</span>
                            <span className="font-mono font-bold text-blue-950">{sc.waterLevelMeters} m MSL</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Hathnikund Release</span>
                            <span className="font-mono font-bold text-slate-900">{(sc.hathnikundDischargeCusecs / 100000).toFixed(2)} Lakh Cusecs</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {sc.incidentSummary}
                        </p>

                        <div className="space-y-1 pt-1 border-t border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Key Triggers & Impacts:</span>
                          {sc.keyHydrologicalTriggers.slice(0, 3).map((trig, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                              <span className="w-1 h-1 rounded-full bg-blue-700 shrink-0" />
                              <span>{trig}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500">
                          {sc.settlements.length} Habitations exposed
                        </span>
                        {isActive ? (
                          <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-1.5 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            Active Scenario
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              onSelectScenario(sc.id);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                          >
                            <Play className="w-3 h-3" />
                            Activate Scenario
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitCustom} className="space-y-4">
              {/* Quick Presets Strip */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                  Quick Demo Sample Presets:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleLoadPreset({
                      name: 'Bela Estate Floodplain Cluster',
                      panchayat: 'Preet Vihar Sub-Division, East Delhi',
                      pop: 1750,
                      hh: 350,
                      rz: 92,
                      hazard: 'Extreme',
                      vuln: 94,
                      rec: 90,
                      drivers: [
                        'Active Riverbed Inundation (Below CWC Danger Mark)',
                        'Unprotected Riverbed Habitation without Dyke',
                        'Total Sewage Regulator Backflow'
                      ]
                    })}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-300 hover:bg-blue-50 hover:border-blue-300 text-slate-700 font-medium"
                  >
                    Preset A: Bela Estate (350 HH, 92% Red Zone)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLoadPreset({
                      name: 'Majnu Ka Tilla North Reach Pocket',
                      panchayat: 'Civil Lines / Trans-Yamuna Reach',
                      pop: 2400,
                      hh: 480,
                      rz: 95,
                      hazard: 'Extreme',
                      vuln: 91,
                      rec: 95,
                      drivers: [
                        'Direct Himalayan Flash Wave Surge',
                        'Embankment Scour & Saturated Liquefaction',
                        'Single 4.2m Submerged Evacuation Road'
                      ]
                    })}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-300 hover:bg-blue-50 hover:border-blue-300 text-slate-700 font-medium"
                  >
                    Preset B: Majnu Ka Tilla (480 HH, 95% Red Zone)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLoadPreset({
                      name: 'Chilla Khadar Marginal Pocket',
                      panchayat: 'Mayur Vihar Sub-Division',
                      pop: 1100,
                      hh: 220,
                      rz: 70,
                      hazard: 'High',
                      vuln: 74,
                      rec: 75,
                      drivers: [
                        'Secondary Drainage Ponding',
                        'Low-lying agricultural worker dwellings',
                        'Restricted culvert outflow'
                      ]
                    })}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-300 hover:bg-blue-50 hover:border-blue-300 text-slate-700 font-medium"
                  >
                    Preset C: Chilla Khadar (220 HH, 70% Red Zone)
                  </button>
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Habitation Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                    placeholder="e.g. Bela Estate Riverbed Pocket"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Revenue Jurisdiction / Sub-Division
                  </label>
                  <input
                    type="text"
                    value={panchayat}
                    onChange={e => setPanchayat(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                    placeholder="e.g. Gandhi Nagar Sub-Division"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Exposed Population (Residents)
                  </label>
                  <input
                    type="number"
                    value={population}
                    onChange={e => handlePopulationChange(Number(e.target.value))}
                    min={50}
                    max={25000}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Automatically computes households: ~{households} HH (5 persons/family)
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Multi-Hazard Exposure Category
                  </label>
                  <select
                    value={hazardExposure}
                    onChange={e => setHazardExposure(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                  >
                    <option value="Extreme">Extreme (Unbunded Active Riverbed)</option>
                    <option value="Very High">Very High (Marginal Lowland Inundation)</option>
                    <option value="High">High (Secondary Backwater Buffer)</option>
                    <option value="Moderate">Moderate (Depression Ponding)</option>
                  </select>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Red Zone Overlap:</span>
                    <span className="text-rose-700 font-mono font-bold">{redZoneOverlapPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={redZoneOverlapPct}
                    onChange={e => setRedZoneOverlapPct(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                  <span className="text-[10px] text-slate-500">Unsuitability envelope</span>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Vulnerability Index:</span>
                    <span className="text-blue-900 font-mono font-bold">{vulnerabilityScore}/100</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={vulnerabilityScore}
                    onChange={e => setVulnerabilityScore(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <span className="text-[10px] text-slate-500">Non-pucca density & socio-economic</span>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Disaster Recurrence:</span>
                    <span className="text-amber-800 font-mono font-bold">{historicalRecurrence}/100</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={historicalRecurrence}
                    onChange={e => setHistoricalRecurrence(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                  <span className="text-[10px] text-slate-500">Historical monsoon flood frequency</span>
                </div>
              </div>

              {/* Hazard Triggers Checkboxes */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-700 block">
                  Select Primary Physical Risk Factors:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Active Riverbed Inundation (Below CWC Danger Mark)',
                    'Unreinforced Marginal Bund Erosion & Scouring',
                    'Severe Drainage Regulator Backflow',
                    'Single 4.2m Submerged Evacuation Road',
                    'High Non-Pucca Informal Housing Density',
                    'Severe Drinking Water Well Contamination'
                  ].map((driver, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer select-none text-slate-800 font-medium"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDrivers.includes(driver)}
                        onChange={() => handleToggleDriver(driver)}
                        className="rounded text-blue-600"
                      />
                      <span>{driver}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Row */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onResetToBaseline}
                  className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 border border-slate-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to 5 Baseline Habitations
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Ingest into Live Stream & Recompute Pipeline
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <span>SURAKSHA Dynamic Decision Pipeline • Automated End-to-End Re-Allocation</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
