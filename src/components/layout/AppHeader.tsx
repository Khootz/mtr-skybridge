import { useAppMode } from '@/contexts/AppModeContext';
import { Switch } from '@/components/ui/switch';
import { Search, Bell, Menu } from 'lucide-react';

export const AppHeader = () => {
  const { mode, toggleMode } = useAppMode();

  return (
    <header className="header-gradient text-primary-foreground relative z-10">
      <div className="relative z-10 px-4 py-3">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
              <span className={`text-xs font-medium transition-opacity ${mode === 'user' ? 'opacity-100' : 'opacity-60'}`}>
                User
              </span>
              <Switch
                checked={mode === 'enabler'}
                onCheckedChange={toggleMode}
                className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-white/30 h-5 w-9"
              />
              <span className={`text-xs font-medium transition-opacity ${mode === 'enabler' ? 'opacity-100' : 'opacity-60'}`}>
                Enabler
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mt-3">
          <h1 className="text-lg font-bold tracking-tight">
            {mode === 'user' ? 'MTR LAE Portal' : 'LAE / AV Dashboard'}
          </h1>
          <p className="text-xs opacity-80">
            {mode === 'user' ? 'Local Aerial Economy Services' : 'Operations & Governance'}
          </p>
        </div>
      </div>
    </header>
  );
};
