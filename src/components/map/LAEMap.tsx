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
        width: 20px;
        height: 20px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

export const LAEMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [22.3193, 114.1694],
      zoom: 11,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add flight corridors
    L.circle([22.295, 114.17], {
      radius: 2000,
      color: '#F2B300',
      fillColor: '#F2B300',
      fillOpacity: 0.1,
      weight: 2,
      dashArray: '5, 10',
    }).addTo(map).bindPopup('<b>Central Corridor</b><br/>Active Flight Zone');

    L.circle([22.35, 114.05], {
      radius: 3000,
      color: '#F2B300',
      fillColor: '#F2B300',
      fillOpacity: 0.1,
      weight: 2,
      dashArray: '5, 10',
    }).addTo(map).bindPopup('<b>Airport Approach</b><br/>Active Flight Zone');

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

    // Force resize after mount
    setTimeout(() => {
      map.invalidateSize();
      setIsLoading(false);
    }, 100);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 z-10">
          <div className="text-center">
            <MapPin className="h-6 w-6 text-primary mx-auto mb-1 animate-pulse" />
            <p className="text-xs text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" style={{ background: '#0B2A45' }} />
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-background/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-[1000]">
        <p className="text-[10px] font-semibold text-foreground mb-1">LAE Nodes</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          {Object.entries(markerColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1">
              <div 
                className="w-2 h-2 rounded-full border border-white"
                style={{ background: color }}
              />
              <span className="text-[9px] text-muted-foreground capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LAEMap;
