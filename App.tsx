import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Assistant } from './components/Assistant';
import { RecipeGen } from './components/RecipeGen';
import { TrendAnalysis } from './components/TrendAnalysis';
import { Tab } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.DASHBOARD:
        return <Dashboard />;
      case Tab.ASSISTANT:
        return <Assistant />;
      case Tab.RECIPES:
        return <RecipeGen />;
      case Tab.TRENDS:
        return <TrendAnalysis />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-cream-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <main className="flex-1 h-screen overflow-auto relative">
        {/* Mobile Header */}
        <div className="lg:hidden bg-cream-50/95 backdrop-blur-sm border-b border-cream-200 p-4 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-dawn-600 flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              D
            </div>
            <span className="font-serif font-bold text-xl text-dawn-900">Dawn</span>
          </div>
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-dawn-700 hover:bg-cream-200 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;