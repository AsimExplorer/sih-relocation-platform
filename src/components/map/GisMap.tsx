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

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [11.5850, 76.1400],
      zoom: 12,
      minZoom: 10,
      maxZoom: 16,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Dark-themed high-contrast cartography
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors & CartoDB | KSDMA GeoPortal',
      subdomains: 'abcd',
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

    // 1. Hazard Runout Zone (Orange/Amber corridor)
    if (layers.hazardZones) {
      const hazardPolygonCoords: [number, number][] = [
        [11.5200, 76.1600],
        [11.5300, 76.1650],
        [11.5450, 76.1800],
        [11.5600, 76.2100],
        [11.5640, 76.2200],
        [11.5520, 76.2220],
        [11.5380, 76.2000],
        [11.5220, 76.1750],
        [11.5200, 76.1600]
      ];

      L.polygon(hazardPolygonCoords, {
        color: '#f97316',
        weight: 2,
        dashArray: '4, 4',
        fillColor: '#ea580c',
        fillOpacity: 0.18,
      }).bindTooltip(
        '<div class="text-xs font-bold text-orange-400">GSI High Landslide Susceptibility Zone</div><div class="text-[10px] text-slate-300">Slope >28° • Debris velocity >25 m/s</div>',
        { sticky: true }
      ).addTo(group);
    }

    // 2. Permanent Unsuitability Red Zone
    if (layers.redZone) {
      activeRedZoneVersion.polygonRings.forEach(ring => {
        const redPoly = L.polygon(ring, {
          color: '#ef4444',
          weight: 3,
          fillColor: '#dc2626',
          fillOpacity: 0.35,
        });

        redPoly.bindTooltip(
          `<div class="p-1">
            <div class="text-xs font-black text-red-400 flex items-center gap-1">
              <span>⚠️ PERMANENT UNSUITABILITY RED ZONE</span>
            </div>
            <div class="text-[11px] font-semibold text-white mt-0.5">${activeRedZoneVersion.label}</div>
            <div class="text-[10px] text-slate-300 mt-1">Area: ${activeRedZoneVersion.totalAreaSqKm} sq.km | Section 30(2) DM Act 2005</div>
            <div class="text-[10px] text-amber-300 mt-0.5">Habitations inside: Mundakkai, Chooralmala, Punchirimattom</div>
          </div>`,
          { sticky: true }
        );

        redPoly.addTo(group);
      });
    }

    // 3. Candidate Relocation Sites (Green safe zones)
    if (layers.candidateSites) {
      candidateSites.forEach(site => {
        const isSelected = selectedSiteId === site.id;

        const sitePoly = L.polygon(site.boundaryGeoJson, {
          color: isSelected ? '#10b981' : '#059669',
          weight: isSelected ? 3.5 : 2,
          fillColor: '#10b981',
          fillOpacity: isSelected ? 0.45 : 0.25,
        });

        sitePoly.bindTooltip(
          `<div class="p-1">
            <div class="text-xs font-bold text-emerald-400">${site.name}</div>
            <div class="text-[11px] font-mono text-white mt-0.5">Safe Capacity: <b>${site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH</b> (${site.calculatedCapacity.netSafePopulationCapacity} persons)</div>
            <div class="text-[10px] text-amber-300 mt-0.5">Limiting Constraint: ${site.calculatedCapacity.bindingConstraint}</div>
            <div class="text-[10px] text-slate-300">Suitability: ${site.suitabilityScore}/100 | Slope: ${site.meanSlopeDegrees}°</div>
          </div>`,
          { sticky: true }
        );

        sitePoly.on('click', () => onSelectSite(site.id));
        sitePoly.addTo(group);

        // Marker for site center
        const siteIcon = L.divIcon({
          className: 'custom-site-marker',
          html: `
            <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-110">
              <div class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border ${isSelected ? 'border-emerald-400 ring-2 ring-emerald-400/50' : 'border-emerald-600'} text-[11px] font-bold shadow-lg flex items-center gap-1 font-mono">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>${site.calculatedCapacity.netSafeAbsorptionCapacityHH} HH</span>
              </div>
              <div class="w-1.5 h-1.5 bg-emerald-400 rotate-45 -mt-0.5"></div>
            </div>
          `,
          iconSize: [80, 28],
          iconAnchor: [40, 28],
        });

        const marker = L.marker([site.lat, site.lng], { icon: siteIcon });
        marker.on('click', () => onSelectSite(site.id));
        marker.addTo(group);
      });
    }

    // 4. Relocation Allocation Lines (Desire Corridors)
    if (layers.allocations) {
      assignments.forEach(assign => {
        const st = settlements.find(s => s.id === assign.settlementId);
        const cs = candidateSites.find(s => s.id === assign.siteId);
        if (!st || !cs) return;

        const isRelated = selectedSettlementId === st.id || selectedSiteId === cs.id;

        const line = L.polyline([[st.lat, st.lng], [cs.lat, cs.lng]], {
          color: isRelated ? '#60a5fa' : '#3b82f6',
          weight: isRelated ? 4 : 2.5,
          dashArray: isRelated ? undefined : '6, 6',
          opacity: isRelated ? 1.0 : 0.75,
        });

        line.bindTooltip(
          `<div class="p-1 font-sans">
            <div class="text-xs font-bold text-blue-400">${st.name} ➔ ${cs.name.split('—')[0]}</div>
            <div class="text-[11px] text-white mt-0.5">Relocating: <b>${assign.capacityUtilizedHH} HH</b> (${assign.population} persons)</div>
            <div class="text-[10px] text-slate-300">Distance: ${assign.distanceKm.toFixed(1)} km | Travel: ~${assign.travelTimeMinutes} min</div>
            <div class="text-[10px] text-emerald-300 mt-0.5">Site Capacity Utilization: ${assign.siteUtilizationPct}%</div>
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
            <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-110">
              <div class="px-2 py-0.5 rounded ${
                isImmediate 
                  ? 'bg-red-950 text-red-200 border-red-600' 
                  : 'bg-orange-950 text-orange-200 border-orange-600'
              } border ${isSelected ? 'ring-2 ring-red-400' : ''} text-[11px] font-black shadow-lg flex items-center gap-1 font-mono">
                <span class="w-2 h-2 rounded-full ${isImmediate ? 'bg-red-500 animate-ping' : 'bg-orange-500'}"></span>
                <span>${st.name} (${st.households} HH)</span>
              </div>
              <div class="w-2 h-2 ${isImmediate ? 'bg-red-600' : 'bg-orange-600'} rotate-45 -mt-1"></div>
            </div>
          `,
          iconSize: [120, 28],
          iconAnchor: [60, 28],
        });

        const marker = L.marker([st.lat, st.lng], { icon: stIcon });
        marker.on('click', () => onSelectSettlement(st.id));

        marker.bindTooltip(
          `<div class="p-1 font-sans">
            <div class="text-xs font-black text-red-400">${st.name} (${st.localPanchayat})</div>
            <div class="text-[11px] font-semibold text-white mt-0.5">Priority: <b class="text-red-300">${st.priority.toUpperCase()}</b> | Risk Score: ${st.riskScore}/100</div>
            <div class="text-[10px] text-slate-300 mt-1">Exposed Pop: ${st.population} (${st.households} HH)</div>
            <div class="text-[10px] text-rose-300">Permanent Red Zone Overlap: ${st.redZoneOverlapPct}%</div>
            <div class="text-[10px] text-slate-400">Historical Disasters: ${st.historicalDisasters.length} Catastrophic Events</div>
          </div>`,
          { sticky: true }
        );

        marker.addTo(group);
      });
    }

  }, [settlements, candidateSites, activeRedZoneVersion, assignments, selectedSettlementId, selectedSiteId, layers]);

  // Center on selected settlement or site if changed
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedSettlementId) {
      const st = settlements.find(s => s.id === selectedSettlementId);
      if (st) {
        map.flyTo([st.lat, st.lng], 13.5, { duration: 1.2 });
      }
    } else if (selectedSiteId) {
      const site = candidateSites.find(s => s.id === selectedSiteId);
      if (site) {
        map.flyTo([site.lat, site.lng], 13.5, { duration: 1.2 });
      }
    }
  }, [selectedSettlementId, selectedSiteId, settlements, candidateSites]);

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden rounded-xl border border-slate-700/80 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full" />
      <MapLegend layers={layers} onToggleLayer={handleToggleLayer} />
    </div>
  );
};
