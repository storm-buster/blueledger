import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  UserCheck, 
  Shield, 
  CheckCircle, 
  Verified,
  Brain,
  MapPin,
  Settings,
  Bell,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface TopNavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/projects' },
  { id: 'map', label: 'Map', icon: MapPin, path: '/map' },
  { id: 'kyc', label: 'KYC', icon: UserCheck, path: '/kyc' },
  { id: 'acva', label: 'ACVA', icon: Shield, path: '/acva' },
  { id: 'validation', label: 'Validation', icon: CheckCircle, path: '/validation' },
  { id: 'verification', label: 'Verification', icon: Verified, path: '/verification' },
  { id: 'xai', label: 'XAI', icon: Brain, path: '/xai' }
];

export default function TopNavbar({ activeSection, onSectionChange }: TopNavbarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleNavigation = (item: typeof menuItems[0]) => {
    navigate(item.path);
    onSectionChange(item.id);
  };

  const handleSettings = () => {
    navigate('/settings');
    onSectionChange('settings');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/50 shadow-lg transition-colors overflow-visible">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Modern Bubble Style */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 min-w-[260px]">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-nee-500 to-nee-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img 
                src="/logo.jpg" 
                alt="NeeLedger" 
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover shadow-xl ring-2 ring-white/50" 
              />
            </div>
            <div className="hidden sm:block truncate">
              <h1 className="text-sm sm:text-base md:text-lg font-bold leading-tight bg-gradient-to-r from-nee-600 to-nee-800 dark:from-nee-400 dark:to-nee-600 bg-clip-text text-transparent">
                NeeLedger
              </h1>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium hidden md:block">Carbon Credit Platform</p>
            </div>
          </div>

          {/* Navigation Items - Bubble Style */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center min-w-0 max-w-[820px] px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`group relative flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 flex-shrink-0 whitespace-nowrap ${
                    isActive 
                      ? 'bg-gradient-to-r from-nee-500 to-nee-600 text-white shadow-lg shadow-nee-500/50 scale-105' 
                      : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:scale-105'
                  }`}
                  title={item.label}
                >
                  {/* Glow effect for active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-nee-400 to-nee-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  )}
                  
                  <Icon className={`relative w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300 group-hover:text-nee-600 dark:group-hover:text-nee-400'} transition-colors`} />
                  <span className={`relative text-xs sm:text-sm font-semibold hidden xl:inline ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200 group-hover:text-nee-600 dark:group-hover:text-nee-400'} transition-colors`}>
                    {item.label}
                  </span>
                  
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              );
            })}
          </div>

          {/* Right Side Actions - Bubble Style */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="relative group p-2 sm:p-3 bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-110"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-nee-600 transition-colors" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-nee-400 transition-colors" />
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 dark:via-gray-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* Notifications */}
            <button className="relative group p-2 sm:p-3 bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-110">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 group-hover:text-nee-600 dark:group-hover:text-nee-400 transition-colors" />
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 dark:via-gray-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* Settings */}
            <button 
              onClick={handleSettings}
              className={`group relative p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                activeSection === 'settings' 
                  ? 'bg-gradient-to-r from-nee-500 to-nee-600 text-white shadow-lg shadow-nee-500/50' 
                  : 'bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg'
              }`}
            >
              {activeSection === 'settings' && (
                <div className="absolute inset-0 bg-gradient-to-r from-nee-400 to-nee-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              )}
              <Settings className={`relative w-4 h-4 sm:w-5 sm:h-5 ${activeSection === 'settings' ? 'text-white' : 'text-gray-600 dark:text-gray-300 group-hover:text-nee-600 dark:group-hover:text-nee-400'} transition-colors`} />
            </button>

            {/* User Profile */}
            <button className="group flex items-center gap-2 sm:gap-3 pl-2 pr-3 sm:pl-4 sm:pr-5 py-2 sm:py-2.5 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:from-white hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-800 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-200/50 dark:border-gray-600/50">
              <div className="relative">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-nee-400 to-nee-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900"></div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 hidden sm:inline group-hover:text-nee-600 dark:group-hover:text-nee-400 transition-colors">
                Admin
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
