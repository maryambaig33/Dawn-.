import React, { useState, Suspense, lazy } from 'react';
import { Sidebar } from './components/Sidebar';
import { Tab } from './types';
import { Menu, Loader2, Croissant } from 'lucide-react';

// Lazy load components to enable code splitting and fix large chunk warnings
const Dashboard = lazy(() => import('./components/Dashboard').then(module => ({ default: module.Dashboard })));
const Assistant = lazy(() => import('./components/Assistant').then(module => ({ default: module.Assistant })));
const RecipeGen = lazy(() => import('./components/RecipeGen').then(module => ({ default: module.RecipeGen })));
const TrendAnalysis = lazy(() => import('./components/TrendAnalysis').then(module => ({ default: module.TrendAnalysis })));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center h-[50vh] text-dawn-600">
    <div className="relative mb-4">
      <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center border border-cream-300">
        <Croissant className="w-8 h-8 text-dawn-600" />
      </div>
      <Loader2 className="w-16 h-16 text-dawn-400 absolute top-0 left-0 animate-spin opacity-50" />
    </div>
    <p className="font-serif text-lg text-dawn-800 animate-pulse">Baking fresh content...</p>
  </div>
);

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
      
      <main className="flex-1 h-screen overflow-auto relative scroll-smooth">
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

        <div className="p-6 lg:p-10 max-w-7xl mx-auto min-h-[calc(100vh-5rem)]">
          <Suspense fallback={<LoadingFallback />}>
            {renderContent()}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default App;