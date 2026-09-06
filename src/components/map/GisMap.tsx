import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Settlement, CandidateSite, RedZoneVersionData, AllocationAssignment } from '../../types';
import { MapLegend } from './MapLegend';

interface GisMapProps {
  settlements: Settlement[];
  candidateSites: CandidateSite[];
  activeRedZoneVersion: RedZoneVersionData;
  assignments: AllocationAssignment[];
  selectedSettlementId: string | null;
  selectedSiteId: string | null;
  onSelectSettlement: (id: string) => void;
  onSelectSite: (id: string) => void;
}

export const GisMap: React.FC<GisMapProps> = ({
  settlements,
  candidateSites,
  activeRedZoneVersion,
  assignments,
  selectedSettlementId,
  selectedSiteId,
  onSelectSettlement,
  onSelectSite,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const [layers, setLayers] = useState<Record<string, boolean>>({
    redZone: true,
    candidateSites: true,
    settlements: true,
    allocations: true,
    hazardZones: true,
  });

  const handleToggleLayer = (id: string) => {
    setLayers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Initialize Map with clean OpenStreetMap tiles (ZERO API KEY, ZERO WATERMARKS)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on East Delhi / Surajmal Vihar / USAR area
    const map = L.map(mapContainerRef.current, {
      center: [28.6538, 77.3015],
      zoom: 12,
      minZoom: 10,
      maxZoom: 17,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Official OpenStreetMap standard public tiles - 100% free, reliable, no API key required, zero watermarks!
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Delhi Disaster Management Authority (DDMA)',
      maxZoom: 19,
    }).addTo(map);

    const group = L.layerGroup().addTo(map);
    layerGroupRef.current = group;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Layers when data or toggles change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = layerGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // 1. Yamuna Flood Inundation Envelope (Blue Translucent Polygon)
    if (layers.hazardZones) {
      const floodCoords: [number, number][] = [
        [28.6400, 77.2420],
        [28.6620, 77.2480],
        [28.6850, 77.2400],
        [28.7150, 77.2450],
        [28.7250, 77.2550],
        [28.7050, 77.2650],
        [28.6750, 77.2680],
        [28.6500, 77.2620],
        [28.6400, 77.2420]
      ];

      L.polygon(floodCoords, {
        color: '#0284c7',
        weight: 2,
        dashArray: '5, 5',
        fillColor: '#38bdf8',
        fillOpacity: 0.22,
      }).bindTooltip(
        '<div class="p-1"><div class="text-xs font-bold text-blue-900">Yamuna Peak Flood Inundation Envelope</div><div class="text-[11px] text-slate-700">Level: >208.66m (Crossed Danger Mark 205.33m) • Alluvial Silt Scour</div></div>',
        { sticky: true }
      ).addTo(group);
    }

    // 2. Statutory Permanent Unsuitability Red Zone (NGT Riverbed "O" Zone)
    if (layers.redZone) {
      activeRedZoneVersion.polygonRings.forEach(ring => {
        const redPoly = L.polygon(ring, {
          color: '#b91c1c',
          weight: 2.5,
          fillColor: '#ef4444',
          fillOpacity: 0.3,
        });

        redPoly.bindTooltip(
          `<div class="p-1 font-sans">
            <div class="text-xs font-bold text-red-700 flex items-center gap-1">
              <span>⚠️ STATUTORY PERMANENT UNSUITABILITY RED ZONE</span>
            </div>
            <div class="text-xs font-semibold text-slate-900 mt-0.5">${activeRedZoneVersion.label}</div>
            <div class="text-[11px] text-slate-600 mt-0.5">Area: ${activeRedZoneVersion.totalAreaSqKm} sq.km | Section 30(2) DM Act 2005 / NGT "O" Zone</div>
            <div class="text-[11px] text-red-800 font-semibold mt-0.5">Habitations inside: Yamuna Khadar East, Garhi Mandu, Bela Estate</div>
          </div>`,
          { sticky: true }
        );

        redPoly.addTo(group);
      });
    }

    // 3. Candidate Relocation Sites (Emerald Planned Sectors)
    if (layers.candidateSites) {
      candidateSites.forEach(site => {
        const isSelected = selectedSiteId === site.id;

        const sitePoly = L.polygon(site.boundaryGeoJson, {
          color: isSelected ? '#15803d' : '#16a34a',
          weight: isSelected ? 3.5 : 2,
          fillColor: '#22c55e',
          fillOpacity: isSelected ? 0.35 : 0.2,
        });

        sitePoly.bindTooltip(
          `<div class="p-1 font-sans">
            <div class="text-xs font-bold text-emerald-800">${site.name}</div>
            <div class="text-xs text-slate-900 mt-0.5">Safe Capacity: <b>${site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH</b> (${site.calculatedCapacity.netSafePopulationCapacity} persons)</div>
            <div class="text-[11px] text-amber-800 font-semibold mt-0.5">Limiting Constraint: ${site.calculatedCapacity.bindingConstraint}</div>
            <div class="text-[11px] text-slate-600">Suitability: ${site.suitabilityScore}/100 | Elevation: ${site.elevationMeters}m MSL</div>
          </div>`,
          { sticky: true }
        );

        sitePoly.on('click', () => onSelectSite(site.id));
        sitePoly.addTo(group);

        // Marker for site center
        const siteIcon = L.divIcon({
          className: 'custom-site-marker',
          html: `
            <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
              <div class="px-2 py-0.5 rounded bg-white text-emerald-800 border ${isSelected ? 'border-emerald-600 ring-2 ring-emerald-300' : 'border-emerald-500'} text-[11px] font-bold shadow-md flex items-center gap-1 font-mono">
                <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>${site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH</span>
              </div>
              <div class="w-1.5 h-1.5 bg-emerald-600 rotate-45 -mt-0.5"></div>
            </div>
          `,
          iconSize: [85, 28],
          iconAnchor: [42, 28],
        });

        const marker = L.marker([site.lat, site.lng], { icon: siteIcon });
        marker.on('click', () => onSelectSite(site.id));
        marker.addTo(group);
      });
    }

    // 4. Relocation Allocation Corridors (Desire Lines)
    if (layers.allocations) {
      assignments.forEach(assign => {
        const st = settlements.find(s => s.id === assign.settlementId);
        const cs = candidateSites.find(s => s.id === assign.siteId);
        if (!st || !cs) return;

        const isRelated = selectedSettlementId === st.id || selectedSiteId === cs.id;

        const line = L.polyline([[st.lat, st.lng], [cs.lat, cs.lng]], {
          color: isRelated ? '#1d4ed8' : '#3b82f6',
          weight: isRelated ? 4 : 2.5,
          dashArray: isRelated ? undefined : '5, 5',
          opacity: isRelated ? 1.0 : 0.7,
        });

        line.bindTooltip(
          `<div class="p-1 font-sans">
            <div class="text-xs font-bold text-blue-900">${st.name} ➔ ${cs.name.split('—')[0]}</div>
            <div class="text-xs text-slate-800 mt-0.5">Relocating: <b>${assign.capacityUtilizedHH} HH</b> (${assign.population} persons)</div>
            <div class="text-[11px] text-slate-600">Distance: ${assign.distanceKm.toFixed(1)} km | Travel: ~${assign.travelTimeMinutes} min</div>
            <div class="text-[11px] text-emerald-800 font-semibold mt-0.5">Site Capacity Utilization: ${assign.siteUtilizationPct}%</div>
          </div>`,
          { sticky: true }
        );

        line.addTo(group);
      });
    }

    // 5. Vulnerable Settlements Markers
    if (layers.settlements) {
      settlements.forEach(st => {
        const isSelected = selectedSettlementId === st.id;
        const isImmediate = st.priority === 'Immediate';

        const stIcon = L.divIcon({
          className: 'custom-settlement-marker',
          html: `
            <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
              <div class="px-2 py-0.5 rounded bg-white ${
                isImmediate 
                  ? 'text-red-700 border-red-500' 
                  : 'text-orange-700 border-orange-500'
              } border ${isSelected ? 'ring-2 ring-red-400' : ''} text-[11px] font-bold shadow-md flex items-center gap-1 font-mono">
                <span class="w-2 h-2 rounded-full ${isImmediate ? 'bg-red-600' : 'bg-orange-500'}"></span>
                <span>${st.name.split('(')[0].trim()} (${st.households} HH)</span>
              </div>
              <div class="w-2 h-2 ${isImmediate ? 'bg-red-600' : 'bg-orange-600'} rotate-45 -mt-1"></div>
            </div>
          `,
          iconSize: [140, 28],
          iconAnchor: [70, 28],
        });

        const marker = L.marker([st.lat, st.lng], { icon: stIcon });
        marker.on('click', () => onSelectSettlement(st.id));

        marker.bindTooltip(
          `<div class="p-1 font-sans">
            <div class="text-xs font-bold text-red-800">${st.name}</div>
            <div class="text-[11px] text-slate-600">${st.localPanchayat}</div>
            <div class="text-xs text-slate-900 mt-1">Priority: <b class="text-red-700">${st.priority.toUpperCase()}</b> | Risk Score: ${st.riskScore}/100</div>
            <div class="text-[11px] text-slate-700 mt-0.5">Exposed: ${st.population.toLocaleString()} pop (${st.households} HH)</div>
            <div class="text-[11px] text-red-700 font-semibold">Red Zone Overlap: ${st.redZoneOverlapPct}%</div>
          </div>`,
          { sticky: true }
        );

        marker.addTo(group);
      });
    }

  }, [settlements, candidateSites, activeRedZoneVersion, assignments, selectedSettlementId, selectedSiteId, layers]);

  // Fly to selected point
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedSettlementId) {
      const st = settlements.find(s => s.id === selectedSettlementId);
      if (st) {
        map.flyTo([st.lat, st.lng], 13.5, { duration: 1.0 });
      }
    } else if (selectedSiteId) {
      const site = candidateSites.find(s => s.id === selectedSiteId);
      if (site) {
        map.flyTo([site.lat, site.lng], 13.5, { duration: 1.0 });
      }
    }
  }, [selectedSettlementId, selectedSiteId, settlements, candidateSites]);

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden rounded-xl border border-slate-300 shadow-sm bg-slate-50">
      <div ref={mapContainerRef} className="w-full h-full" />
      <MapLegend layers={layers} onToggleLayer={handleToggleLayer} />
    </div>
  );
};
