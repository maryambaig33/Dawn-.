import React, { useState } from 'react';
import { TrendingUp, Search, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { analyzeTrends } from '../services/geminiService';

export const TrendAnalysis: React.FC = () => {
  const [topic, setTopic] = useState('Vegan Pastries');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const topics = ['Vegan Pastries', 'Sourdough Variations', 'Gluten-Free Desserts', 'Sustainable Packaging'];

  const handleAnalyze = async (selectedTopic: string) => {
    setTopic(selectedTopic);
    setLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeTrends(selectedTopic);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Market Trend Analysis</h1>
          <p className="text-slate-500">Real-time insights powered by Google Search Grounding</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => handleAnalyze(t)}
            className={`p-4 rounded-xl border transition-all text-left ${
              topic === t 
                ? 'bg-dawn-50 border-dawn-200 ring-1 ring-dawn-300' 
                : 'bg-white border-slate-200 hover:border-dawn-200 hover:shadow-sm'
            }`}
          >
            <span className={`text-sm font-medium ${topic === t ? 'text-dawn-700' : 'text-slate-700'}`}>
              {t}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[400px] relative overflow-hidden">
        {!analysis && !loading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
             <TrendingUp className="w-16 h-16 mb-4 opacity-20" />
             <p>Select a topic to analyze market trends</p>
           </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
            <Loader2 className="w-10 h-10 text-dawn-600 animate-spin mb-4" />
            <p className="text-dawn-800 font-medium animate-pulse">Analyzing global market data...</p>
          </div>
        )}

        {analysis && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
              <Globe className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-slate-900">Insight Report: {topic}</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: analysis
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\* (.*?)\n/g, '<li class="ml-4 list-disc">$1</li>') 
                  .replace(/\n/g, '<br />')
              }} />
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-semibold text-blue-800">Source Grounding</p>
                <p className="text-xs text-blue-600">Data verified via Google Search realtime index.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};