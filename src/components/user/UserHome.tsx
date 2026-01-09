import { StatusCard } from '@/components/cards/StatusCard';
import { QuickActions } from '@/components/cards/QuickActions';
import { TrustCard } from '@/components/cards/TrustCard';
import { PromoCard, LocationCard } from '@/components/cards/PromoCard';
import { ServiceStatusBanner } from '@/components/cards/ServiceStatusBanner';

export const UserHome = () => {
  return (
    <div className="px-4 py-4 space-y-4">
      {/* Promo Banner */}
      <PromoCard />

      {/* Location / Where to Card - Similar to MTR app reference */}
      <LocationCard />

      {/* Service Status Banner */}
      <ServiceStatusBanner />

      {/* Quick Actions Grid */}
      <QuickActions />

      {/* LAE Status Card */}
      <StatusCard />

      {/* Trust & Safety */}
      <TrustCard />
    </div>
  );
};
