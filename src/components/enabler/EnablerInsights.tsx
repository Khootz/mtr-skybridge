import { mockAnalytics } from '@/data/mockData';
import { TrendingUp, MapPin, Clock, Shield, Plane, Users, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MetricCard = ({ 
  label, 
  value, 
  change,
  icon: Icon 
}: { 
  label: string; 
  value: string | number; 
  change?: string;
  icon: React.ElementType;
}) => (
  <div className="card-elevated p-4">
    <div className="flex items-center justify-between mb-2">
      <Icon className="h-5 w-5 text-primary" />
      {change && (
        <span className={`text-xs font-medium ${change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
          {change}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export const EnablerInsights = () => {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Analytics & Insights</h2>
          <p className="text-sm text-muted-foreground">Network performance overview</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Date Range Selector */}
      <div className="flex gap-2 mb-4">
        {['Today', 'Week', 'Month', 'Quarter'].map((period, idx) => (
          <button
            key={period}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              idx === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricCard 
          icon={Plane}
          label="Total Flights Today"
          value={mockAnalytics.totalFlightsToday}
          change="+12%"
        />
        <MetricCard 
          icon={Clock}
          label="On-time Rate"
          value={`${mockAnalytics.onTimePercentage}%`}
          change="+2.1%"
        />
        <MetricCard 
          icon={Users}
          label="Active Operators"
          value={mockAnalytics.activeOperators}
        />
        <MetricCard 
          icon={Shield}
          label="Safety Incidents"
          value={mockAnalytics.safetyIncidents}
          change="0"
        />
      </div>

      {/* Demand Heatmap Placeholder */}
      <div className="card-elevated p-4 mb-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Demand Heatmap
        </h3>
        <div className="h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-success/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium">Interactive Heatmap</p>
            <p className="text-xs text-muted-foreground">Showing demand patterns</p>
          </div>
        </div>
      </div>

      {/* Top Routes */}
      <div className="card-elevated p-4 mb-4">
        <h3 className="font-semibold mb-3">Top Routes</h3>
        <div className="space-y-3">
          {[
            { route: 'Central ↔ Kowloon Bay', trips: 89, change: '+15%' },
            { route: 'HKIA ↔ TST', trips: 67, change: '+8%' },
            { route: 'Sha Tin ↔ Central', trips: 45, change: '+22%' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium">{item.route}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{item.trips} trips</p>
                <p className="text-xs text-success">{item.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peak Times */}
      <div className="card-elevated p-4 mb-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Peak Hours
        </h3>
        <div className="flex gap-1">
          {Array.from({ length: 24 }, (_, i) => {
            const height = Math.random() * 60 + 20;
            const isPeak = i === 8 || i === 18;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t ${isPeak ? 'bg-accent' : 'bg-primary/30'}`}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>00:00</span>
          <span>12:00</span>
          <span>24:00</span>
        </div>
      </div>

      {/* Export Button */}
      <Button className="w-full gap-2 cta-button" size="lg">
        <Download className="h-4 w-4" />
        Generate Weekly Report
      </Button>
    </div>
  );
};
