import { useAppMode } from '@/contexts/AppModeContext';
import { Search, Bell, Menu, Users, Building2, ArrowLeftRight } from 'lucide-react';

export const AppHeader = () => {
  const { mode, toggleMode } = useAppMode();

  return (
    <header className="header-gradient text-primary-foreground relative z-10">
      <div className="relative z-10 px-4 py-3">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <Menu className="h-5 w-5" />
          </button>

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

        {/* Title row with toggle */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              {mode === 'user' ? 'MTR LAE Portal' : 'LAE / AV Dashboard'}
            </h1>
            <p className="text-xs opacity-80">
              {mode === 'user' ? 'Local Aerial Economy Services' : 'Operations & Governance'}
            </p>
          </div>

          {/* Mode Toggle - Segmented Control Style */}
          <button 
            onClick={toggleMode}
            className="group relative flex items-center gap-0 rounded-xl overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            aria-label={`Switch to ${mode === 'user' ? 'Enabler' : 'User'} mode`}
          >
            {/* Background slider */}
            <div 
              className={`absolute top-0 h-full w-1/2 bg-accent transition-all duration-300 ease-out ${
                mode === 'user' ? 'left-0' : 'left-1/2'
              }`}
            />
            
            {/* User option */}
            <div className={`relative flex items-center gap-1.5 px-3 py-1.5 transition-all duration-300 ${
              mode === 'user' ? 'text-accent-foreground' : 'text-white/70'
            }`}>
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">User</span>
            </div>
            
            {/* Switch indicator */}
            <div className="relative flex items-center justify-center w-6">
              <ArrowLeftRight className={`h-3 w-3 transition-all duration-300 ${
                mode === 'user' ? 'text-white/50' : 'text-white/50'
              }`} />
            </div>
            
            {/* Enabler option */}
            <div className={`relative flex items-center gap-1.5 px-3 py-1.5 transition-all duration-300 ${
              mode === 'enabler' ? 'text-accent-foreground' : 'text-white/70'
            }`}>
              <Building2 className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">Enabler</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
