import { mockFlights, mockIncidents, mockAnalytics, mockInfrastructure } from '@/data/mockData';
import { Plane, AlertTriangle, Clock, TrendingUp, MapPin, Activity, Users, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const StatTile = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  color = 'primary' 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  color?: 'primary' | 'success' | 'warning' | 'destructive';
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="card-elevated p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="h-4 w-4" />
        </div>
        {trend && (
          <TrendingUp className={`h-4 w-4 ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive rotate-180' : 'text-muted-foreground'}`} />
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

const AlertItem = ({ incident }: { incident: typeof mockIncidents[0] }) => {
  const severityColors = {
    low: 'border-l-warning',
    medium: 'border-l-accent',
    high: 'border-l-destructive',
  };

  return (
    <div className={`bg-card p-3 border-l-4 ${severityColors[incident.severity]} rounded-r-lg`}>
      <div className="flex items-start justify-between mb-1">
        <span className="font-medium text-sm">{incident.title}</span>
        <Badge variant="outline" className="text-xs">
          {incident.severity}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-1">{incident.description}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" />
        {incident.location}
        <span>•</span>
        <Clock className="h-3 w-3" />
        {incident.timestamp}
      </div>
    </div>
  );
};

export const EnablerDashboard = () => {
  const activeFlights = mockFlights.filter(f => f.status === 'in-flight' || f.status === 'boarding');
  const delayedFlights = mockFlights.filter(f => f.status === 'delayed');
  const unresolvedIncidents = mockIncidents.filter(i => !i.resolved);

  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">Real-time Operations</h2>
        <p className="text-sm text-muted-foreground">Hong Kong LAE Network Status</p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatTile 
          icon={Plane} 
          label="Active Flights" 
          value={activeFlights.length}
          color="primary"
        />
        <StatTile 
          icon={Clock} 
          label="Delayed" 
          value={delayedFlights.length}
          color={delayedFlights.length > 0 ? 'warning' : 'success'}
        />
        <StatTile 
          icon={AlertTriangle} 
          label="Incidents" 
          value={unresolvedIncidents.length}
          color={unresolvedIncidents.length > 0 ? 'destructive' : 'success'}
        />
        <StatTile 
          icon={Activity} 
          label="On-time %" 
          value={`${mockAnalytics.onTimePercentage}%`}
          trend={mockAnalytics.reliabilityTrend}
          color="success"
        />
      </div>

      {/* Map Panel Placeholder */}
      <div className="card-elevated h-40 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Flight Corridors Map</p>
            <p className="text-xs text-muted-foreground">Live aircraft positions & routes</p>
          </div>
        </div>
        {/* Simulated flight dots */}
        <div className="absolute top-8 left-12 w-3 h-3 bg-primary rounded-full animate-pulse-soft" />
        <div className="absolute top-16 right-20 w-3 h-3 bg-success rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-12 left-1/3 w-3 h-3 bg-warning rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      {/* Infrastructure Quick View */}
      <div className="card-elevated p-4 mb-4">
        <h3 className="font-semibold mb-3">Infrastructure Status</h3>
        <div className="grid grid-cols-3 gap-2">
          {mockInfrastructure.slice(0, 3).map((asset) => (
            <div key={asset.id} className="text-center p-2 bg-muted/50 rounded-lg">
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                asset.status === 'operational' ? 'bg-success' : 
                asset.status === 'maintenance' ? 'bg-warning' : 'bg-destructive'
              }`} />
              <p className="text-xs font-medium truncate">{asset.name.split(' ')[0]}</p>
              <p className="text-xs text-muted-foreground">{asset.currentLoad}/{asset.capacity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Active Alerts
          </h3>
          <span className="text-xs text-muted-foreground">{unresolvedIncidents.length} active</span>
        </div>
        <div className="space-y-2">
          {unresolvedIncidents.map((incident) => (
            <AlertItem key={incident.id} incident={incident} />
          ))}
        </div>
      </div>
    </div>
  );
};
