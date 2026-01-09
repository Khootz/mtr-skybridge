import { useAppMode } from '@/contexts/AppModeContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { UserTrips } from '@/components/user/UserTrips';
import { EnablerInsights } from '@/components/enabler/EnablerInsights';

const Trips = () => {
  const { mode } = useAppMode();

  return (
    <AppLayout>
      {mode === 'user' ? <UserTrips /> : <EnablerInsights />}
    </AppLayout>
  );
};

export default Trips;
