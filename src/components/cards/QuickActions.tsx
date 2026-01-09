import { Plane, Package, AlertCircle, Navigation } from 'lucide-react';

interface QuickAction {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  onClick?: () => void;
}

const actions: QuickAction[] = [
  { icon: Plane, label: 'Book LAE', sublabel: 'Air taxi' },
  { icon: Package, label: 'Track', sublabel: 'Delivery' },
  { icon: Navigation, label: 'Nearby', sublabel: 'Services' },
  { icon: AlertCircle, label: 'Report', sublabel: 'Issue' },
];

export const QuickActions = () => {
  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between px-1 mb-3">
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
        <button className="text-xs text-primary font-medium">Customise</button>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="quick-action-btn"
              onClick={action.onClick}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-foreground leading-tight">{action.label}</p>
                {action.sublabel && (
                  <p className="text-[10px] text-muted-foreground">{action.sublabel}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
