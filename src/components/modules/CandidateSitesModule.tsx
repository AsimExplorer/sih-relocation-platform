import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { CandidateSite } from '../../types';

interface CandidateSitesModuleProps {
  candidateSites: CandidateSite[];
  selectedSiteId: string | null;
  onSelectSite: (id: string) => void;
  onNavigateToCapacity: () => void;
}

export const CandidateSitesModule: React.FC<CandidateSitesModuleProps> = ({
  candidateSites,
  selectedSiteId,
  onSelectSite,
  onNavigateToCapacity,
}) => {
  const selected = candidateSites.find(s => s.id === selectedSiteId) || candidateSites[0];

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-4 rounded-xl bg-gov-card border border-gov-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Candidate Resettlement Sites</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1">
            Site Suitability & Safe Enclave Verification
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl mt-1">
            4 candidate land parcels pre-screened on safer midland/highland plateaus outside landslide runout corridors, evaluated against slope stability, trunk infrastructure, and access.
          </p>
        </div>

        <button
          onClick={onNavigateToCapacity}
          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950 shrink-0"
        >
          <span>Calculate Carrying Capacity</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of 4 Sites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {candidateSites.map(site => {
          const isSelected = site.id === selected?.id;
          return (
            <div
              key={site.id}
              onClick={() => onSelectSite(site.id)}
              className={'p-4 rounded-xl border cursor-pointer transition-all ' + (
                isSelected 
                  ? 'bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-400/40 shadow-xl' 
                  : 'bg-gov-surface border-gov-border hover:border-slate-600'
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">{site.id}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{site.name.split('—')[0]}</h3>
                  <div className="text-[11px] text-slate-400 truncate">{site.panchayat}</div>
                </div>
                <span className="font-mono text-sm font-black px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700">
                  {site.suitabilityScore}/100
                </span>
              </div>

              <div className="my-3 py-2 border-y border-gov-border/60 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Parcel Area</span>
                  <span className="font-mono font-bold text-slate-200">{site.areaHectares} ha</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Mean Slope</span>
                  <span className="font-mono font-bold text-emerald-400">{site.meanSlopeDegrees}° (Gentle)</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Safe Capacity:</span>
                  <span className="font-mono font-bold text-white">{site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Binding Factor:</span>
                  <span className="font-bold text-amber-300 text-[11px] truncate max-w-[130px]">{site.calculatedCapacity.bindingConstraint}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Site Detail Inspection */}
      {selected && (
        <div className="p-4 rounded-xl bg-gov-card border border-gov-border space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gov-border">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Candidate Site In-Depth Profile</span>
              <h3 className="text-lg font-black text-white">{selected.name}</h3>
              <div className="text-xs text-slate-400">{selected.locationName} • Elevation: {selected.elevationMeters}m MSL</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase block">Composite Suitability</span>
              <span className="text-2xl font-mono font-black text-emerald-400">{selected.suitabilityScore} / 100</span>
            </div>
          </div>

          {/* 4 Suitability Factor Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
            <div className="p-2.5 rounded-lg bg-gov-surface border border-gov-border space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Hazard Safety</span>
                <span className="font-mono text-emerald-400">{selected.suitabilityFactors.hazardSafety}/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: selected.suitabilityFactors.hazardSafety + '%' }} />
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-gov-surface border border-gov-border space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Buildable Slope</span>
                <span className="font-mono text-emerald-400">{selected.suitabilityFactors.buildableSlope}/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: selected.suitabilityFactors.buildableSlope + '%' }} />
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-gov-surface border border-gov-border space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Road Connectivity</span>
                <span className="font-mono text-blue-400">{selected.suitabilityFactors.roadConnectivity}/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: selected.suitabilityFactors.roadConnectivity + '%' }} />
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-gov-surface border border-gov-border space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Water Proximity</span>
                <span className="font-mono text-amber-400">{selected.suitabilityFactors.waterProximity}/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: selected.suitabilityFactors.waterProximity + '%' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
