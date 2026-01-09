import { CheckCircle, AlertTriangle, XCircle, Cloud, Plane, Clock } from 'lucide-react';
import { mockSystemStatus } from '@/data/mockData';

const statusConfig = {
  normal: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', label: 'Normal Service' },
  'minor-issues': { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', label: 'Minor Issues' },
  'major-disruption': { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Disruption' },
};

const weatherConfig = {
  clear: { label: 'Clear', color: 'text-success' },
  moderate: { label: 'Moderate', color: 'text-warning' },
  adverse: { label: 'Adverse', color: 'text-destructive' },
};

const airspaceConfig = {
  open: { label: 'Open', color: 'text-success' },
  restricted: { label: 'Restricted', color: 'text-warning' },
  closed: { label: 'Closed', color: 'text-destructive' },
};

export const StatusCard = () => {
  const status = mockSystemStatus;
  const config = statusConfig[status.overall];
  const StatusIcon = config.icon;

  return (
    <div className="card-elevated p-4 animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Today's LAE Status</h3>
        <span className="text-xs text-muted-foreground">Updated {status.lastUpdated}</span>
      </div>

      {/* Main Status */}
      <div className={`flex items-center gap-3 p-3 rounded-lg ${config.bg} mb-3`}>
        <StatusIcon className={`h-8 w-8 ${config.color}`} />
        <div>
          <p className={`font-semibold ${config.color}`}>{config.label}</p>
          <p className="text-xs text-muted-foreground">All aerial services operating</p>
        </div>
      </div>

      {/* Sub-statuses */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
          <Cloud className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Weather</p>
            <p className={`text-sm font-medium ${weatherConfig[status.weather].color}`}>
              {weatherConfig[status.weather].label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
          <Plane className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Airspace</p>
            <p className={`text-sm font-medium ${airspaceConfig[status.airspace].color}`}>
              {airspaceConfig[status.airspace].label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
