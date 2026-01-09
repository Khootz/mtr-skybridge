import { ShieldCheck, ChevronRight } from 'lucide-react';

export const TrustCard = () => {
  return (
    <div className="card-elevated p-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="h-5 w-5 text-success" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground">Trust & Safety</h4>
          <p className="text-xs text-muted-foreground">All operators are MTR-verified with certified pilots and aircraft</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      </div>
    </div>
  );
};
