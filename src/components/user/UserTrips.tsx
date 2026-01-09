import { mockTrips, Trip } from '@/data/mockData';
import { Plane, Package, Camera, Clock, TrendingUp, Calendar, ChevronRight, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TripIcon = ({ type }: { type: Trip['type'] }) => {
  const icons = {
    'air-taxi': Plane,
    'delivery': Package,
    'sightseeing': Camera,
  };
  const Icon = icons[type];
  return <Icon className="h-5 w-5" />;
};

const TripCard = ({ trip }: { trip: Trip }) => {
  const statusColors = {
    'upcoming': 'bg-accent text-accent-foreground',
    'in-progress': 'bg-primary text-primary-foreground animate-pulse-soft',
    'completed': 'bg-success/10 text-success',
    'cancelled': 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="card-elevated p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <TripIcon type={trip.type} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{trip.operator}</h4>
            <p className="text-xs text-muted-foreground">{trip.type === 'air-taxi' ? 'Air Taxi' : trip.type === 'delivery' ? 'Delivery' : 'Sightseeing'}</p>
          </div>
        </div>
        <Badge className={statusColors[trip.status]} variant="secondary">
          {trip.status === 'in-progress' ? 'In Flight' : trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </Badge>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm">
          {trip.origin} → {trip.destination}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">Date</p>
          <p className="text-sm font-medium">{new Date(trip.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">Time</p>
          <p className="text-sm font-medium">{trip.time}</p>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">Duration</p>
          <p className="text-sm font-medium">{trip.duration} min</p>
        </div>
      </div>

      {trip.timeSaved && trip.status === 'completed' && (
        <div className="flex items-center gap-2 p-2 bg-success/10 rounded-lg mb-3">
          <TrendingUp className="h-4 w-4 text-success" />
          <span className="text-sm text-success font-medium">Saved {trip.timeSaved} min vs ground transport</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="font-semibold text-foreground">HK${trip.price}</span>
        <button className="flex items-center gap-1 text-sm font-medium text-primary">
          Details <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const ActiveTripTracker = () => {
  const activeTrip = mockTrips.find(t => t.status === 'upcoming');
  if (!activeTrip) return null;

  return (
    <div className="card-elevated overflow-hidden mb-4 border-2 border-accent">
      <div className="bg-accent p-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-accent-foreground">Upcoming Flight</span>
          <span className="text-sm text-accent-foreground">{activeTrip.time} today</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">From</p>
            <p className="font-semibold">{activeTrip.origin}</p>
          </div>
          <Plane className="h-5 w-5 text-primary" />
          <div className="flex-1 text-right">
            <p className="text-xs text-muted-foreground">To</p>
            <p className="font-semibold">{activeTrip.destination}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm">Booking confirmed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-muted border-2 border-primary" />
            <span className="text-sm text-muted-foreground">Aircraft assigned (pending)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span className="text-sm text-muted-foreground">Ready for boarding</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserTrips = () => {
  const pastTrips = mockTrips.filter(t => t.status === 'completed');
  
  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">Your Trips</h2>
        <p className="text-sm text-muted-foreground">Track flights and view history</p>
      </div>

      {/* Active trip tracker */}
      <ActiveTripTracker />

      {/* Analytics summary */}
      <div className="card-elevated p-4 mb-4">
        <h3 className="font-semibold mb-3">Your Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{pastTrips.length}</p>
            <p className="text-xs text-muted-foreground">Total Trips</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{pastTrips.reduce((acc, t) => acc + (t.timeSaved || 0), 0)}</p>
            <p className="text-xs text-muted-foreground">Mins Saved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">100%</p>
            <p className="text-xs text-muted-foreground">On-time</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Active</button>
        <button className="flex-1 py-2 px-4 bg-muted text-muted-foreground rounded-lg text-sm font-medium">History</button>
      </div>

      {/* Trips list */}
      <div className="space-y-3">
        {mockTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};
