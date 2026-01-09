import { mockServices, LAEService } from '@/data/mockData';
import { ShieldCheck, Star, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ServiceCard = ({ service }: { service: LAEService }) => {
  const typeColors = {
    'air-taxi': 'bg-primary/10 text-primary',
    'cargo': 'bg-secondary/10 text-secondary',
    'sightseeing': 'bg-accent/10 text-accent-foreground',
  };

  return (
    <div className={`card-elevated p-4 transition-all duration-200 ${!service.available ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{service.name}</h3>
            {service.safetyBadge && (
              <ShieldCheck className="h-4 w-4 text-success" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{service.operator}</p>
        </div>
        <Badge className={typeColors[service.type]} variant="secondary">
          {service.type === 'air-taxi' ? 'Air Taxi' : service.type === 'cargo' ? 'Delivery' : 'Sightseeing'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">ETA</p>
            <p className="text-sm font-medium">{service.etaRange}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">$</span>
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="text-sm font-medium">{service.priceRange}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <p className="text-xs text-muted-foreground truncate">
          {service.pickupNodes.join(' • ')}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-accent fill-accent" />
          <span className="text-sm font-medium">{service.rating}</span>
        </div>
        <button className={`flex items-center gap-1 text-sm font-medium ${service.available ? 'text-primary' : 'text-muted-foreground'}`}>
          {service.available ? 'Book Now' : 'Unavailable'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const UserExplore = () => {
  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">Explore LAE Services</h2>
        <p className="text-sm text-muted-foreground">Discover aerial transport options in Hong Kong</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
        {['All', 'Air Taxi', 'Delivery', 'Sightseeing'].map((filter, idx) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              idx === 0
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="card-elevated h-32 mb-4 flex items-center justify-center bg-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="text-center z-10">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Interactive Map</p>
        </div>
      </div>

      {/* Services list */}
      <div className="space-y-3">
        {mockServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
