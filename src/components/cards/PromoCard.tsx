import { Gift, X, ChevronRight, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const PromoCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-accent/20 rounded-2xl p-4 border border-accent/30 animate-slide-up">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -left-2 w-6 h-6 bg-charcoal text-white rounded-full flex items-center justify-center shadow-md"
      >
        <X className="h-3 w-3" />
      </button>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
          <Gift className="h-5 w-5 text-accent-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">First flight 50% off!</p>
          <p className="text-xs text-muted-foreground">New user exclusive offer</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export const LocationCard = () => {
  return (
    <div className="card-elevated overflow-hidden animate-slide-up" style={{ animationDelay: '0.05s' }}>
      <div className="p-4">
        <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">Where to?</span>
        </div>
      </div>

      <div className="px-4 pb-4 space-y-3">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Gift className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Sign up & earn points</p>
              <p className="text-xs text-muted-foreground">for free flights</p>
            </div>
          </div>
          <Button size="sm" className="cta-button h-8 text-xs">Sign up</Button>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <MapPin className="h-4 w-4 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Share location</p>
              <p className="text-xs text-muted-foreground">to find services faster</p>
            </div>
          </div>
          <Button size="sm" variant="secondary" className="h-8 text-xs">Share</Button>
        </div>
      </div>

      <div className="border-t border-border px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold">Next Available</span>
        <button className="text-sm text-primary font-medium flex items-center gap-1">
          Select Station <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
