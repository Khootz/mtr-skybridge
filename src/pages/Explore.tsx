import { useAppMode } from '@/contexts/AppModeContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { UserExplore } from '@/components/user/UserExplore';
import { EnablerOperations } from '@/components/enabler/EnablerOperations';

const Explore = () => {
  const { mode } = useAppMode();

  return (
    <AppLayout>
      {mode === 'user' ? <UserExplore /> : <EnablerOperations />}
    </AppLayout>
  );
};

export default Explore;
