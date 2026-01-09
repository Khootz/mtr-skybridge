import { useAppMode } from '@/contexts/AppModeContext';
import { Home, Compass, Map, User, LayoutDashboard, Settings2, BarChart3, Shield } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const userNavItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: Map, label: 'Trips', path: '/trips' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const enablerNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Settings2, label: 'Operations', path: '/operations' },
  { icon: BarChart3, label: 'Insights', path: '/insights' },
  { icon: Shield, label: 'Admin', path: '/admin' },
];

export const BottomNav = () => {
  const { mode } = useAppMode();
  const location = useLocation();
  const navItems = mode === 'user' ? userNavItems : enablerNavItems;

  return (
    <nav className="tab-bar safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 min-w-[64px] ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
