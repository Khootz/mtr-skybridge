import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// LAE station markers for Hong Kong
const laeStations = [
  { name: 'Central Helipad', lat: 22.2855, lng: 114.1577, type: 'hub', status: 'active' },
  { name: 'West Kowloon Station', lat: 22.3048, lng: 114.1614, type: 'station', status: 'active' },
  { name: 'Tsim Sha Tsui Hub', lat: 22.2988, lng: 114.1722, type: 'hub', status: 'active' },
  { name: 'Hong Kong Airport', lat: 22.3080, lng: 113.9185, type: 'airport', status: 'active' },
  { name: 'Victoria Peak', lat: 22.2759, lng: 114.1455, type: 'scenic', status: 'active' },
  { name: 'Sha Tin Depot', lat: 22.3874, lng: 114.1952, type: 'depot', status: 'maintenance' },
  { name: 'Tseung Kwan O', lat: 22.3153, lng: 114.2649, type: 'station', status: 'active' },
];

// Simulated aerial vehicles with routes
const aerialVehicles = [
  { id: 'AV-001', type: 'air-taxi', from: [22.3080, 113.9185], to: [22.2855, 114.1577], color: '#9B1B30' },
  { id: 'AV-002', type: 'drone', from: [22.2988, 114.1722], to: [22.3874, 114.1952], color: '#0B2A45' },
  { id: 'AV-003', type: 'air-taxi', from: [22.2759, 114.1455], to: [22.3048, 114.1614], color: '#9B1B30' },
  { id: 'AV-004', type: 'cargo-drone', from: [22.3153, 114.2649], to: [22.2988, 114.1722], color: '#F2B300' },
  { id: 'AV-005', type: 'air-taxi', from: [22.3048, 114.1614], to: [22.3080, 113.9185], color: '#9B1B30' },
];

const markerColors: Record<string, string> = {
  hub: '#9B1B30',
  station: '#0B2A45',
  airport: '#F2B300',
  scenic: '#22c55e',
  depot: '#8B0D12',
};

const statusColors: Record<string, string> = {
  active: '#22c55e',
  maintenance: '#F2B300',
  offline: '#8B0D12',
};

// Custom colored icon creator
const createColoredIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// Aircraft icon creator
const createAircraftIcon = (color: string, rotation: number) => {
  return L.divIcon({
    className: 'aircraft-marker',
    html: `
      <div style="
        transform: rotate(${rotation}deg);
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L8 8H4L6 12L4 16H8L12 22L16 16H20L18 12L20 8H16L12 2Z" stroke="white" stroke-width="1"/>
        </svg>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Calculate rotation angle between two points
const calculateBearing = (from: [number, number], to: [number, number]) => {
  const lat1 = from[0] * Math.PI / 180;
  const lat2 = to[0] * Math.PI / 180;
  const dLng = (to[1] - from[1]) * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
};

// Interpolate position along route
const interpolatePosition = (from: [number, number], to: [number, number], progress: number): [number, number] => {
  return [
    from[0] + (to[0] - from[0]) * progress,
    from[1] + (to[1] - from[1]) * progress,
  ];
};

export const LAEMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const vehicleMarkersRef = useRef<L.Marker[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [22.32, 114.17],
      zoom: 11,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Add realistic Hong Kong map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add flight corridors with gradient effect
    const corridors = [
      { from: [22.3080, 113.9185], to: [22.2855, 114.1577], name: 'Airport-Central Corridor' },
      { from: [22.2988, 114.1722], to: [22.3874, 114.1952], name: 'TST-Sha Tin Route' },
      { from: [22.3048, 114.1614], to: [22.3153, 114.2649], name: 'West Kowloon-TKO Route' },
    ];

    corridors.forEach((corridor) => {
      L.polyline([corridor.from as [number, number], corridor.to as [number, number]], {
        color: '#F2B300',
        weight: 3,
        opacity: 0.4,
        dashArray: '10, 10',
      }).addTo(map);
    });

    // Add coverage zones
    L.circle([22.30, 114.17], {
      radius: 8000,
      color: '#9B1B30',
      fillColor: '#9B1B30',
      fillOpacity: 0.05,
      weight: 1,
      dashArray: '5, 5',
    }).addTo(map).bindPopup('<b>LAE Service Zone</b><br/>Primary coverage area');

    // Add station markers
    laeStations.forEach((station) => {
      const marker = L.marker([station.lat, station.lng], {
        icon: createColoredIcon(markerColors[station.type]),
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width: 140px;">
          <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">${station.name}</div>
          <div style="display: flex; align-items: center; gap: 8px; font-size: 11px;">
            <span style="text-transform: capitalize; color: #666;">${station.type}</span>
            <span style="
              padding: 2px 8px;
              border-radius: 10px;
              color: white;
              font-size: 10px;
              background: ${statusColors[station.status]};
            ">${station.status}</span>
          </div>
        </div>
      `);
    });

    // Create animated vehicle markers
    aerialVehicles.forEach((vehicle, idx) => {
      const bearing = calculateBearing(vehicle.from as [number, number], vehicle.to as [number, number]);
      const marker = L.marker(vehicle.from as [number, number], {
        icon: createAircraftIcon(vehicle.color, bearing),
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width: 120px;">
          <div style="font-weight: 600; font-size: 12px;">${vehicle.id}</div>
          <div style="font-size: 11px; color: #666; text-transform: capitalize;">${vehicle.type.replace('-', ' ')}</div>
          <div style="font-size: 10px; color: #22c55e; margin-top: 4px;">● In Flight</div>
        </div>
      `);

      vehicleMarkersRef.current.push(marker);
    });

    // Animate vehicles
    let startTime = Date.now();
    const animateVehicles = () => {
      const elapsed = Date.now() - startTime;
      const cycleDuration = 20000; // 20 seconds per cycle
      
      aerialVehicles.forEach((vehicle, idx) => {
        const offset = (idx * 0.2) % 1; // Stagger vehicles
        const progress = ((elapsed / cycleDuration + offset) % 1);
        
        // Ping-pong movement
        const actualProgress = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
        
        const from = vehicle.from as [number, number];
        const to = vehicle.to as [number, number];
        const pos = interpolatePosition(from, to, actualProgress);
        const bearing = progress < 0.5 
          ? calculateBearing(from, to)
          : calculateBearing(to, from);
        
        const marker = vehicleMarkersRef.current[idx];
        if (marker) {
          marker.setLatLng(pos);
          marker.setIcon(createAircraftIcon(vehicle.color, bearing));
        }
      });

      animationRef.current = requestAnimationFrame(animateVehicles);
    };

    animateVehicles();

    // Force resize after mount
    setTimeout(() => {
      map.invalidateSize();
      setIsLoading(false);
    }, 100);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      map.remove();
      mapInstanceRef.current = null;
      vehicleMarkersRef.current = [];
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <div className="text-center">
            <MapPin className="h-6 w-6 text-primary mx-auto mb-1 animate-pulse" />
            <p className="text-xs text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" style={{ background: '#e8e0d8' }} />
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-background/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-[1000]">
        <p className="text-[10px] font-semibold text-foreground mb-1">Live Status</p>
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#9B1B30]" />
            <span className="text-[9px] text-muted-foreground">Air Taxi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#0B2A45]" />
            <span className="text-[9px] text-muted-foreground">Drone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#F2B300]" />
            <span className="text-[9px] text-muted-foreground">Cargo</span>
          </div>
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-2 right-2 bg-background/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg z-[1000] flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
        <span className="text-[10px] font-medium text-foreground">5 Active</span>
      </div>
    </div>
  );
};

export default LAEMap;
