import { User, CreditCard, MapPin, Bell, Globe, ChevronRight, LogOut, Settings, Shield } from 'lucide-react';
import { useAppMode } from '@/contexts/AppModeContext';
import { Switch } from '@/components/ui/switch';

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">{title}</h3>
    <div className="card-elevated divide-y divide-border">
      {children}
    </div>
  </div>
);

const ProfileItem = ({ 
  icon: Icon, 
  label, 
  value, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  value?: string; 
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
  >
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-sm text-muted-foreground">{value}</span>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  </button>
);

export const UserProfile = () => {
  const { mode, toggleMode } = useAppMode();

  return (
    <div className="px-4 py-4">
      {/* Profile header */}
      <div className="card-elevated p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">Alex Chan</h2>
            <p className="text-sm text-muted-foreground">alex.chan@email.com</p>
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-xs text-success font-medium">Verified Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switch */}
      <div className="card-elevated p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Portal Mode</h3>
            <p className="text-sm text-muted-foreground">
              {mode === 'user' ? 'Passenger / Consumer' : 'Operator / Gov / Investor'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${mode === 'user' ? 'font-semibold' : 'text-muted-foreground'}`}>User</span>
            <Switch
              checked={mode === 'enabler'}
              onCheckedChange={toggleMode}
            />
            <span className={`text-xs ${mode === 'enabler' ? 'font-semibold' : 'text-muted-foreground'}`}>Enabler</span>
          </div>
        </div>
      </div>

      <ProfileSection title="Account">
        <ProfileItem icon={CreditCard} label="Payment Methods" value="2 cards" />
        <ProfileItem icon={MapPin} label="Saved Locations" value="3 places" />
      </ProfileSection>

      <ProfileSection title="Preferences">
        <ProfileItem icon={Bell} label="Notifications" value="On" />
        <ProfileItem icon={Globe} label="Language" value="English" />
        <ProfileItem icon={Settings} label="App Settings" />
      </ProfileSection>

      <ProfileSection title="Support">
        <ProfileItem icon={Shield} label="Safety Information" />
        <button className="w-full flex items-center gap-3 p-4 text-destructive hover:bg-destructive/5 transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </ProfileSection>
    </div>
  );
};
