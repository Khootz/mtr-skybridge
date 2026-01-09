import { useAppMode } from '@/contexts/AppModeContext';
import { Switch } from '@/components/ui/switch';
import { Search, Bell, Menu, Sparkles } from 'lucide-react';

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
            
            {/* Mode Toggle - Glowing */}
            <button 
              onClick={toggleMode}
              className="group relative flex items-center gap-2 rounded-full px-3 py-1.5 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Animated glow background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 opacity-90 blur-[2px] animate-pulse-glow" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 opacity-75" />
              
              {/* Inner content */}
              <div className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full px-3 py-1 shadow-lg">
                <Sparkles className="h-3 w-3 text-amber-900 animate-pulse" />
                <span className={`text-xs font-bold transition-all ${mode === 'user' ? 'text-amber-900' : 'text-amber-900/60'}`}>
                  User
                </span>
                <div className="w-px h-3 bg-amber-900/30" />
                <span className={`text-xs font-bold transition-all ${mode === 'enabler' ? 'text-amber-900' : 'text-amber-900/60'}`}>
                  Enabler
                </span>
                <Sparkles className="h-3 w-3 text-amber-900 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </button>
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
