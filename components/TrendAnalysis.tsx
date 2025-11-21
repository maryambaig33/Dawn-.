import React, { useState } from 'react';
import { TrendingUp, Search, Globe, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { analyzeTrends } from '../services/geminiService';

export const TrendAnalysis: React.FC = () => {
  const [topic, setTopic] = useState('Vegan Pastries');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [groundingChunks, setGroundingChunks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const topics = ['Vegan Pastries', 'Sourdough Variations', 'Gluten-Free Desserts', 'Sustainable Packaging'];

  const handleAnalyze = async (selectedTopic: string) => {
    setTopic(selectedTopic);
    setLoading(true);
    setAnalysis(null);
    setGroundingChunks([]);
    
    try {
      const result = await analyzeTrends(selectedTopic);
      setAnalysis(result.text);
      setGroundingChunks(result.groundingChunks || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-dawn-900">Market Insights</h1>
          <p className="text-dawn-600 mt-1">Real-time bakery trends powered by Google Search.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => handleAnalyze(t)}
            className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
              topic === t 
                ? 'bg-dawn-600 text-white border-dawn-600 shadow-md shadow-dawn-200' 
                : 'bg-white border-cream-200 text-dawn-700 hover:border-dawn-300 hover:bg-cream-50'
            }`}
          >
            <span className="text-sm font-bold block">
              {t}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm min-h-[400px] relative overflow-hidden">
        {!analysis && !loading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center text-dawn-300">
             <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mb-4">
                <TrendingUp className="w-10 h-10 text-dawn-400" />
             </div>
             <p className="font-serif text-lg text-dawn-500">Select a topic to analyze market trends</p>
           </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-10">
            <Loader2 className="w-12 h-12 text-dawn-600 animate-spin mb-4" />
            <p className="text-dawn-800 font-serif text-lg animate-pulse flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Scouring the web for insights...
            </p>
          </div>
        )}

        {analysis && (
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-cream-200">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-dawn-900">Insight Report: {topic}</h2>
            </div>
            
            <div className="prose prose-stone prose-headings:font-serif prose-headings:text-dawn-900 prose-p:text-dawn-700 prose-li:text-dawn-700 max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: analysis
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-dawn-900 font-bold">$1</strong>')
                  .replace(/\* (.*?)\n/g, '<li class="ml-4 list-disc marker:text-dawn-500">$1</li>') 
                  .replace(/\n/g, '<br />')
              }} />
            </div>
            
            {/* Grounding Sources */}
            {groundingChunks.length > 0 && (
              <div className="mt-10 p-6 bg-cream-50 rounded-2xl border border-cream-200">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-4 h-4 text-dawn-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-dawn-500">Sources & References</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {groundingChunks.map((chunk, i) => (
                    chunk.web?.uri && (
                      <a 
                        key={i}
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-dawn-700 hover:text-dawn-900 hover:bg-white p-3 rounded-xl transition-all border border-transparent hover:border-cream-200 hover:shadow-sm truncate group"
                      >
                        <div className="w-6 h-6 rounded-full bg-white border border-cream-200 flex items-center justify-center text-[10px] font-bold text-dawn-400 group-hover:text-dawn-600 shrink-0">
                            {i + 1}
                        </div>
                        <span className="truncate font-medium">{chunk.web.title || chunk.web.uri}</span>
                        <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-dawn-400" />
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};