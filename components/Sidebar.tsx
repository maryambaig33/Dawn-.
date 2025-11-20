import React from 'react';
import { Tab } from '../types';
import { LayoutDashboard, MessageSquare, BookOpen, TrendingUp, Menu } from 'lucide-react';

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
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-dawn-600 flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="font-bold text-xl text-slate-800">Dawn</span>
          </div>

          <nav className="flex-1 p-4 space-y-2">
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
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-dawn-50 text-dawn-800 ring-1 ring-dawn-200' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-dawn-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-dawn-500 to-dawn-600 rounded-xl p-4 text-white">
              <p className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-1">Pro Tip</p>
              <p className="text-sm">Ask Dawn about substituting seasonal fruits in your muffins!</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};