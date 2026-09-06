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
      <div className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>Candidate Resettlement Sectors</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Site Suitability & Non-Floodplain Enclave Verification
          </h2>
          <p className="text-xs text-slate-600 max-w-3xl mt-1">
            4 candidate land parcels pre-screened in higher-elevation planned urban zones across East Delhi and NCR fringes (including the Surajmal Vihar / USAR institutional zone and Mandoli Sub-City), evaluated against flood immunity, trunk infrastructure, and access.
          </p>
        </div>

        <button
          onClick={onNavigateToCapacity}
          className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0"
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
                  ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-200 shadow-sm' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">{site.id}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{site.name.split('—')[0]}</h3>
                  <div className="text-[11px] text-slate-500 truncate">{site.panchayat}</div>
                </div>
                <span className="font-mono text-sm font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {site.suitabilityScore}/100
                </span>
              </div>

              <div className="my-3 py-2 border-y border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Parcel Area</span>
                  <span className="font-mono font-bold text-slate-800">{site.areaHectares} ha</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Elevation</span>
                  <span className="font-mono font-bold text-emerald-700">{site.elevationMeters}m MSL</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Safe Capacity:</span>
                  <span className="font-mono font-bold text-slate-900">{site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Binding Factor:</span>
                  <span className="font-bold text-amber-800 text-[11px] truncate max-w-[130px]">{site.calculatedCapacity.bindingConstraint}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Site Detail Inspection */}
      {selected && (
        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Candidate Sector In-Depth Profile</span>
              <h3 className="text-lg font-black text-slate-900">{selected.name}</h3>
              <div className="text-xs text-slate-500">{selected.locationName} • Elevation: {selected.elevationMeters}m MSL (&gt;8m above Yamuna High Flood Level)</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Composite Suitability</span>
              <span className="text-2xl font-mono font-black text-emerald-700">{selected.suitabilityScore} / 100</span>
            </div>
          </div>

          {/* 4 Suitability Factor Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Flood Immunity</span>
                <span className="font-mono text-emerald-700">{selected.suitabilityFactors.hazardSafety}/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600" style={{ width: selected.suitabilityFactors.hazardSafety + '%' }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Urban Slope & Drainage</span>
                <span className="font-mono text-emerald-700">{selected.suitabilityFactors.buildableSlope}/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600" style={{ width: selected.suitabilityFactors.buildableSlope + '%' }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Road Connectivity</span>
                <span className="font-mono text-blue-700">{selected.suitabilityFactors.roadConnectivity}/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: selected.suitabilityFactors.roadConnectivity + '%' }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Water Trunk Feeder</span>
                <span className="font-mono text-amber-800">{selected.suitabilityFactors.waterProximity}/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600" style={{ width: selected.suitabilityFactors.waterProximity + '%' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
