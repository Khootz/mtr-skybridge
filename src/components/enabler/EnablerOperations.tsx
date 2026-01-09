import { mockFlights, mockInfrastructure, mockOperators } from '@/data/mockData';
import { Plane, CheckCircle, Clock, XCircle, AlertTriangle, ChevronRight, Settings, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FlightApprovalCard = ({ flight }: { flight: typeof mockFlights[0] }) => {
  const statusConfig = {
    'on-time': { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
    'boarding': { icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
    'in-flight': { icon: Plane, color: 'text-primary', bg: 'bg-primary/10' },
    'delayed': { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
    'cancelled': { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  };
  const config = statusConfig[flight.status];
  const StatusIcon = config.icon;

  return (
    <div className="card-elevated p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
            <StatusIcon className={`h-5 w-5 ${config.color}`} />
          </div>
          <div>
            <h4 className="font-semibold">{flight.id}</h4>
            <p className="text-xs text-muted-foreground">{flight.operator}</p>
          </div>
        </div>
        <Badge variant="outline" className={config.color}>
          {flight.status.replace('-', ' ')}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2 text-sm mb-2">
        <span>{flight.origin}</span>
        <Plane className="h-4 w-4 text-muted-foreground" />
        <span>{flight.destination}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>ETA: {flight.eta}</span>
        <span>{flight.aircraft}</span>
        <span>{flight.passengers} pax</span>
      </div>
    </div>
  );
};

const OperatorConformanceCard = ({ operator }: { operator: typeof mockOperators[0] }) => {
  const statusColors = {
    'active': 'bg-success',
    'pending': 'bg-warning',
    'suspended': 'bg-destructive',
  };

  return (
    <div className="card-elevated p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${statusColors[operator.status]}`} />
          <div>
            <h4 className="font-semibold">{operator.name}</h4>
            <p className="text-xs text-muted-foreground capitalize">{operator.type.replace('-', ' ')}</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <p className="text-sm font-bold text-success">{operator.safetyScore}%</p>
          <p className="text-xs text-muted-foreground">Safety</p>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <p className="text-sm font-bold">{operator.onTimeRate}%</p>
          <p className="text-xs text-muted-foreground">On-time</p>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <p className="text-sm font-bold">{operator.fleetSize}</p>
          <p className="text-xs text-muted-foreground">Fleet</p>
        </div>
      </div>
    </div>
  );
};

export const EnablerOperations = () => {
  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">Operations Control</h2>
        <p className="text-sm text-muted-foreground">Flight management & monitoring</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['All Flights', 'Approvals', 'Operators', 'Infrastructure'].map((tab, idx) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              idx === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active Flights */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Plane className="h-4 w-4 text-primary" />
          Active Flights
        </h3>
        <div className="space-y-3">
          {mockFlights.map((flight) => (
            <FlightApprovalCard key={flight.id} flight={flight} />
          ))}
        </div>
      </div>

      {/* Operator Conformance */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Operator Conformance
        </h3>
        <div className="space-y-3">
          {mockOperators.filter(o => o.status === 'active').map((operator) => (
            <OperatorConformanceCard key={operator.id} operator={operator} />
          ))}
        </div>
      </div>

      {/* Infrastructure Status */}
      <div className="mb-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Settings className="h-4 w-4 text-primary" />
          Infrastructure Status
        </h3>
        <div className="space-y-2">
          {mockInfrastructure.map((asset) => (
            <div key={asset.id} className="card-elevated p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  asset.status === 'operational' ? 'bg-success' :
                  asset.status === 'maintenance' ? 'bg-warning' : 'bg-destructive'
                }`} />
                <div>
                  <p className="text-sm font-medium">{asset.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{asset.type.replace('-', ' ')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{asset.currentLoad}/{asset.capacity}</p>
                <p className="text-xs text-muted-foreground">Capacity</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
