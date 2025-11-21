import React from 'react';
import { Tab } from '../types';
import { LayoutDashboard, MessageSquare, BookOpen, TrendingUp, Croissant } from 'lucide-react';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
  const menuItems = [
    { id: Tab.DASHBOARD, label: 'Overview', icon: LayoutDashboard },
    { id: Tab.ASSISTANT, label: 'Dawn AI Assistant', icon: MessageSquare },
    { id: Tab.RECIPES, label: 'Smart Recipes', icon: BookOpen },
    { id: Tab.TRENDS, label: 'Market Trends', icon: TrendingUp },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-20 bg-dawn-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white/80 backdrop-blur-md border-r border-cream-200 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static shadow-xl lg:shadow-none
      `}>
        <div className="h-full flex flex-col">
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dawn-600 to-dawn-700 flex items-center justify-center text-white shadow-md shadow-dawn-200 transform -rotate-3">
              <Croissant className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif font-bold text-2xl text-dawn-900 block leading-none">Dawn</span>
              <span className="text-[10px] uppercase tracking-widest text-dawn-600 font-medium">Bakery OS</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-cream-200 text-dawn-900 shadow-sm' 
                      : 'text-dawn-700 hover:bg-cream-100 hover:text-dawn-800'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-dawn-600' : 'text-wheat-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 m-4 bg-wheat-100 rounded-2xl border border-wheat-200 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-wheat-200 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
            <div className="relative z-10">
              <p className="font-serif font-bold text-dawn-800 mb-1">Seasonal Tip</p>
              <p className="text-xs text-dawn-700 leading-relaxed">Try adding cardamom to your cinnamon rolls for a Nordic twist this winter.</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};