// Mock data for MTR LAE Portal

export interface Flight {
  id: string;
  operator: string;
  route: string;
  origin: string;
  destination: string;
  status: 'on-time' | 'delayed' | 'cancelled' | 'boarding' | 'in-flight';
  eta: string;
  aircraft: string;
  passengers: number;
  delay?: number;
}

export interface Incident {
  id: string;
  type: 'safety' | 'weather' | 'technical' | 'airspace';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  timestamp: string;
  location: string;
  resolved: boolean;
}

export interface InfrastructureAsset {
  id: string;
  name: string;
  type: 'station-pad' | 'depot' | 'control-center' | 'vertiport';
  status: 'operational' | 'maintenance' | 'offline';
  capacity: number;
  currentLoad: number;
  location: string;
}

export interface Operator {
  id: string;
  name: string;
  type: 'air-taxi' | 'cargo' | 'sightseeing';
  verified: boolean;
  safetyScore: number;
  fleetSize: number;
  onTimeRate: number;
  status: 'active' | 'pending' | 'suspended';
}

export interface Trip {
  id: string;
  type: 'air-taxi' | 'delivery' | 'sightseeing';
  origin: string;
  destination: string;
  date: string;
  time: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  operator: string;
  price: number;
  duration: number;
  timeSaved?: number;
}

export interface LAEService {
  id: string;
  name: string;
  type: 'air-taxi' | 'cargo' | 'sightseeing';
  operator: string;
  etaRange: string;
  priceRange: string;
  safetyBadge: boolean;
  pickupNodes: string[];
  rating: number;
  available: boolean;
}

// Mock Flights
export const mockFlights: Flight[] = [
  { id: 'FL001', operator: 'SkyLink HK', route: 'Central → Kowloon', origin: 'Central Station Pad', destination: 'Kowloon Bay Vertiport', status: 'in-flight', eta: '14:25', aircraft: 'eVTOL-200', passengers: 4 },
  { id: 'FL002', operator: 'AeroCab', route: 'Airport → Tsim Sha Tsui', origin: 'HKIA Terminal 1', destination: 'TST Rooftop', status: 'boarding', eta: '14:45', aircraft: 'AirTaxi-X1', passengers: 2 },
  { id: 'FL003', operator: 'DroneEx', route: 'Depot → Sheung Wan', origin: 'Cargo Depot Alpha', destination: 'Sheung Wan Hub', status: 'on-time', eta: '15:00', aircraft: 'Cargo-D500', passengers: 0 },
  { id: 'FL004', operator: 'Vista Air', route: 'Victoria Harbour Tour', origin: 'IFC Pad', destination: 'IFC Pad', status: 'delayed', eta: '15:30', aircraft: 'TourPod-8', passengers: 6, delay: 15 },
  { id: 'FL005', operator: 'SkyLink HK', route: 'Sha Tin → Central', origin: 'Sha Tin Vertiport', destination: 'Central Station Pad', status: 'on-time', eta: '15:15', aircraft: 'eVTOL-200', passengers: 3 },
];

// Mock Incidents
export const mockIncidents: Incident[] = [
  { id: 'INC001', type: 'weather', severity: 'medium', title: 'Strong crosswinds at HKIA sector', description: 'Wind speed exceeding 25 knots. Approach adjustments in effect.', timestamp: '13:45', location: 'HKIA Approach', resolved: false },
  { id: 'INC002', type: 'technical', severity: 'low', title: 'Charging station maintenance', description: 'Bay 3 charging station under routine maintenance until 16:00.', timestamp: '12:00', location: 'Kowloon Bay Vertiport', resolved: false },
  { id: 'INC003', type: 'airspace', severity: 'high', title: 'Temporary flight restriction', description: 'VIP movement. Restricted zone active over Victoria Park area.', timestamp: '14:00', location: 'Victoria Park Zone', resolved: false },
];

// Mock Infrastructure
export const mockInfrastructure: InfrastructureAsset[] = [
  { id: 'INF001', name: 'Central Station Pad', type: 'station-pad', status: 'operational', capacity: 4, currentLoad: 2, location: 'Central' },
  { id: 'INF002', name: 'Kowloon Bay Vertiport', type: 'vertiport', status: 'operational', capacity: 8, currentLoad: 5, location: 'Kowloon Bay' },
  { id: 'INF003', name: 'Cargo Depot Alpha', type: 'depot', status: 'operational', capacity: 20, currentLoad: 12, location: 'Kwai Chung' },
  { id: 'INF004', name: 'TST Rooftop Pad', type: 'station-pad', status: 'maintenance', capacity: 2, currentLoad: 0, location: 'Tsim Sha Tsui' },
  { id: 'INF005', name: 'LAE Control Center', type: 'control-center', status: 'operational', capacity: 100, currentLoad: 45, location: 'Tung Chung' },
];

// Mock Operators
export const mockOperators: Operator[] = [
  { id: 'OP001', name: 'SkyLink HK', type: 'air-taxi', verified: true, safetyScore: 98, fleetSize: 12, onTimeRate: 94, status: 'active' },
  { id: 'OP002', name: 'AeroCab', type: 'air-taxi', verified: true, safetyScore: 96, fleetSize: 8, onTimeRate: 91, status: 'active' },
  { id: 'OP003', name: 'DroneEx', type: 'cargo', verified: true, safetyScore: 99, fleetSize: 45, onTimeRate: 97, status: 'active' },
  { id: 'OP004', name: 'Vista Air', type: 'sightseeing', verified: true, safetyScore: 97, fleetSize: 6, onTimeRate: 89, status: 'active' },
  { id: 'OP005', name: 'QuickDrone', type: 'cargo', verified: false, safetyScore: 0, fleetSize: 15, onTimeRate: 0, status: 'pending' },
];

// Mock Trips (User history)
export const mockTrips: Trip[] = [
  { id: 'TR001', type: 'air-taxi', origin: 'Central', destination: 'Kowloon Bay', date: '2025-01-08', time: '09:15', status: 'completed', operator: 'SkyLink HK', price: 280, duration: 8, timeSaved: 25 },
  { id: 'TR002', type: 'delivery', origin: 'Online Store', destination: 'Sheung Wan Office', date: '2025-01-07', time: '14:30', status: 'completed', operator: 'DroneEx', price: 45, duration: 12, timeSaved: 40 },
  { id: 'TR003', type: 'sightseeing', origin: 'IFC Pad', destination: 'Victoria Harbour Tour', date: '2025-01-05', time: '16:00', status: 'completed', operator: 'Vista Air', price: 580, duration: 25 },
  { id: 'TR004', type: 'air-taxi', origin: 'Sha Tin', destination: 'Central', date: '2025-01-09', time: '18:30', status: 'upcoming', operator: 'AeroCab', price: 320, duration: 10 },
];

// Mock LAE Services
export const mockServices: LAEService[] = [
  { id: 'SVC001', name: 'SkyLink Express', type: 'air-taxi', operator: 'SkyLink HK', etaRange: '5-12 min', priceRange: 'HK$180-380', safetyBadge: true, pickupNodes: ['Central Pad', 'Admiralty Pad', 'Kowloon Bay'], rating: 4.8, available: true },
  { id: 'SVC002', name: 'AeroCab Premium', type: 'air-taxi', operator: 'AeroCab', etaRange: '8-15 min', priceRange: 'HK$220-450', safetyBadge: true, pickupNodes: ['HKIA', 'TST Rooftop', 'Central Pad'], rating: 4.6, available: true },
  { id: 'SVC003', name: 'DroneEx Rapid', type: 'cargo', operator: 'DroneEx', etaRange: '15-30 min', priceRange: 'HK$35-120', safetyBadge: true, pickupNodes: ['Any registered address'], rating: 4.9, available: true },
  { id: 'SVC004', name: 'Vista Harbour Tour', type: 'sightseeing', operator: 'Vista Air', etaRange: '25 min tour', priceRange: 'HK$480-680', safetyBadge: true, pickupNodes: ['IFC Pad', 'ICC Pad'], rating: 4.7, available: false },
];

// System Status
export interface SystemStatus {
  overall: 'normal' | 'minor-issues' | 'major-disruption';
  weather: 'clear' | 'moderate' | 'adverse';
  airspace: 'open' | 'restricted' | 'closed';
  lastUpdated: string;
}

export const mockSystemStatus: SystemStatus = {
  overall: 'normal',
  weather: 'clear',
  airspace: 'open',
  lastUpdated: '14:30',
};

// Analytics data for Enabler mode
export interface AnalyticsData {
  totalFlightsToday: number;
  onTimePercentage: number;
  activeOperators: number;
  safetyIncidents: number;
  peakHour: string;
  topRoute: string;
  demandTrend: 'up' | 'down' | 'stable';
  reliabilityTrend: 'up' | 'down' | 'stable';
}

export const mockAnalytics: AnalyticsData = {
  totalFlightsToday: 247,
  onTimePercentage: 93.2,
  activeOperators: 4,
  safetyIncidents: 0,
  peakHour: '08:00-09:00',
  topRoute: 'Central ↔ Kowloon Bay',
  demandTrend: 'up',
  reliabilityTrend: 'stable',
};
