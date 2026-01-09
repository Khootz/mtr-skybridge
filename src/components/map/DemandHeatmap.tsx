import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Demand hotspots with intensity (0-1)
const demandHotspots = [
  { lat: 22.2855, lng: 114.1577, intensity: 0.95, name: 'Central', requests: 156 },
  { lat: 22.3048, lng: 114.1614, intensity: 0.85, name: 'West Kowloon', requests: 128 },
  { lat: 22.2988, lng: 114.1722, intensity: 0.9, name: 'TST', requests: 142 },
  { lat: 22.3080, lng: 113.9185, intensity: 0.75, name: 'HKIA', requests: 98 },
  { lat: 22.2759, lng: 114.1455, intensity: 0.5, name: 'Victoria Peak', requests: 67 },
  { lat: 22.3874, lng: 114.1952, intensity: 0.6, name: 'Sha Tin', requests: 78 },
  { lat: 22.3153, lng: 114.2649, intensity: 0.45, name: 'TKO', requests: 52 },
  { lat: 22.3700, lng: 114.1130, intensity: 0.55, name: 'Tsuen Wan', requests: 64 },
  { lat: 22.2815, lng: 114.1580, intensity: 0.8, name: 'Admiralty', requests: 112 },
  { lat: 22.3360, lng: 114.1760, intensity: 0.65, name: 'Mong Kok', requests: 85 },
];

// Get color based on intensity
const getHeatColor = (intensity: number) => {
  if (intensity > 0.8) return '#9B1B30'; // Maroon - very high
  if (intensity > 0.6) return '#dc2626'; // Red - high
  if (intensity > 0.4) return '#F2B300'; // Yellow - medium
  return '#22c55e'; // Green - low
};

export const DemandHeatmap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState<typeof demandHotspots[0] | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [22.32, 114.17],
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Light theme map for better heatmap visibility
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    // Add heatmap circles
    demandHotspots.forEach((spot) => {
      const color = getHeatColor(spot.intensity);
      const radius = 1500 + spot.intensity * 2000;

      // Outer glow
      L.circle([spot.lat, spot.lng], {
        radius: radius * 1.3,
        color: 'transparent',
        fillColor: color,
        fillOpacity: 0.1,
        interactive: false,
      }).addTo(map);

      // Main circle
      L.circle([spot.lat, spot.lng], {
        radius: radius,
        color: color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.3,
      }).addTo(map).on('click', () => {
        setSelectedSpot(spot);
      });

      // Inner core
      L.circle([spot.lat, spot.lng], {
        radius: radius * 0.3,
        color: 'transparent',
        fillColor: color,
        fillOpacity: 0.5,
        interactive: false,
      }).addTo(map);

      // Center marker with pulse effect
      const pulseIcon = L.divIcon({
        className: 'pulse-marker',
        html: `
          <div style="position: relative;">
            <div style="
              width: 12px;
              height: 12px;
              background: ${color};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 0 10px ${color};
            "></div>
            <div style="
              position: absolute;
              top: -4px;
              left: -4px;
              width: 20px;
              height: 20px;
              border: 2px solid ${color};
              border-radius: 50%;
              animation: pulse-ring 2s ease-out infinite;
              opacity: 0.6;
            "></div>
          </div>
        `,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      L.marker([spot.lat, spot.lng], { icon: pulseIcon }).addTo(map)
        .bindPopup(`
          <div style="min-width: 120px; text-align: center;">
            <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">${spot.name}</div>
            <div style="font-size: 20px; font-weight: 700; color: ${color};">${spot.requests}</div>
            <div style="font-size: 10px; color: #666;">requests/hr</div>
          </div>
        `);
    });

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-ring {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(2); opacity: 0; }
      }
      .pulse-marker { background: transparent; border: none; }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      map.invalidateSize();
      setIsLoading(false);
    }, 100);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      style.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <MapPin className="h-6 w-6 text-primary animate-pulse" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" style={{ background: '#f8f9fa' }} />
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-background/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-[1000]">
        <p className="text-[10px] font-semibold text-foreground mb-1.5">Demand Level</p>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#9B1B30]" />
            <span className="text-[9px] text-muted-foreground">Very High (&gt;100/hr)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#dc2626]" />
            <span className="text-[9px] text-muted-foreground">High (70-100/hr)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#F2B300]" />
            <span className="text-[9px] text-muted-foreground">Medium (40-70/hr)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
            <span className="text-[9px] text-muted-foreground">Low (&lt;40/hr)</span>
          </div>
        </div>
      </div>

      {/* Live stats */}
      <div className="absolute top-2 right-2 bg-background/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-lg z-[1000]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <div>
            <p className="text-[10px] font-semibold text-foreground">982 Active</p>
            <p className="text-[8px] text-muted-foreground">requests now</p>
          </div>
        </div>
      </div>

      {/* Time indicator */}
      <div className="absolute top-2 left-2 bg-background/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-lg z-[1000]">
        <p className="text-[10px] font-semibold text-foreground">Peak Hour</p>
        <p className="text-[9px] text-accent font-medium">18:00 - 19:00</p>
      </div>
    </div>
  );
};

export default DemandHeatmap;
