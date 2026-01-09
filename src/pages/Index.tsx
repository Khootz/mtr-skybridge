import { useAppMode } from '@/contexts/AppModeContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { UserHome } from '@/components/user/UserHome';
import { EnablerDashboard } from '@/components/enabler/EnablerDashboard';

const Index = () => {
  const { mode } = useAppMode();

  return (
    <AppLayout>
      {mode === 'user' ? <UserHome /> : <EnablerDashboard />}
    </AppLayout>
  );
};

export default Index;
