import { useAppMode } from '@/contexts/AppModeContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { UserProfile } from '@/components/user/UserProfile';
import { EnablerAdmin } from '@/components/enabler/EnablerAdmin';

const Profile = () => {
  const { mode } = useAppMode();

  return (
    <AppLayout>
      {mode === 'user' ? <UserProfile /> : <EnablerAdmin />}
    </AppLayout>
  );
};

export default Profile;
