import { MessageSquare, ChevronRight } from 'lucide-react';

export const ServiceStatusBanner = () => {
  return (
    <div className="card-elevated p-3 flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.15s' }}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
          <MessageSquare className="h-4 w-4 text-success" />
        </div>
        <span className="text-sm font-medium">Normal LAE Service</span>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  );
};
