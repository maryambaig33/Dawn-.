import React, { useState } from 'react';
import { ChefHat, Clock, Award, Printer, Loader2, Sparkles } from 'lucide-react';
import { generateRecipe } from '../services/geminiService';
import { Recipe } from '../types';

export const RecipeGen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const result = await generateRecipe(prompt);
      setRecipe(result);
    } catch (err) {
      setError("Couldn't generate recipe. Please check API key configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-cream-100 rounded-full mb-2">
          <ChefHat className="w-8 h-8 text-dawn-600" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-dawn-900">Smart Recipe Generator</h1>
        <p className="text-dawn-600 max-w-lg mx-auto text-lg">
          Describe your vision, and we'll draft a professional bakery formula for you.
        </p>
      </div>

      <div className="bg-white p-3 rounded-2xl shadow-lg shadow-dawn-900/5 border border-cream-200 max-w-2xl mx-auto flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Vegan Lemon Poppyseed Muffins (Yield: 24)"
          className="flex-1 pl-6 py-4 bg-transparent border-none focus:outline-none text-dawn-900 placeholder:text-dawn-300 text-lg"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-8 py-3 bg-dawn-600 hover:bg-dawn-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70 shadow-md shadow-dawn-200"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Draft
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-center max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {recipe && (
        <div className="paper-card rounded-sm shadow-2xl shadow-dawn-900/10 overflow-hidden animate-fade-in transform transition-all rotate-1 max-w-3xl mx-auto relative">
          {/* Decorative tape effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/80 backdrop-blur-sm rotate-1 shadow-sm border border-white/50 z-10"></div>
          
          <div className="p-10 border-b-2 border-dashed border-dawn-200 flex justify-between items-start bg-cream-50/50">
            <div>
              <span className="text-xs font-bold tracking-widest text-dawn-500 uppercase mb-2 block">Dawn Kitchen Tested</span>
              <h2 className="text-4xl font-serif font-bold text-dawn-900 mb-4">{recipe.name}</h2>
              <p className="text-dawn-700 text-lg italic font-serif leading-relaxed">{recipe.description}</p>
            </div>
            <button className="p-3 text-dawn-400 hover:text-dawn-600 hover:bg-dawn-50 rounded-xl transition-all border border-transparent hover:border-dawn-100">
              <Printer className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-10 divide-y md:divide-y-0 md:divide-x-2 divide-dashed divide-dawn-200">
            <div className="p-8 md:col-span-4 bg-cream-50/30">
              <div className="space-y-8">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-dawn-800 bg-white px-3 py-1.5 rounded-lg border border-cream-200 shadow-sm">
                    <Clock className="w-4 h-4 text-dawn-500" />
                    <span className="font-medium text-sm">{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-dawn-800 bg-white px-3 py-1.5 rounded-lg border border-cream-200 shadow-sm">
                    <Award className="w-4 h-4 text-dawn-500" />
                    <span className="font-medium text-sm">{recipe.difficulty}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-serif font-bold text-xl text-dawn-900 mb-6 border-b border-dawn-200 pb-2">Ingredients</h3>
                  <ul className="space-y-4">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-baseline gap-3 text-dawn-800 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-dawn-400 flex-shrink-0 translate-y-1" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 md:col-span-6 bg-white">
              <h3 className="font-serif font-bold text-xl text-dawn-900 mb-6 border-b border-dawn-200 pb-2">Method</h3>
              <div className="space-y-8">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-8 h-8 rounded-full bg-cream-100 text-dawn-600 font-serif font-bold flex items-center justify-center flex-shrink-0 border border-cream-300 group-hover:bg-dawn-600 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-dawn-800 leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-4 bg-cream-50 border border-cream-200 rounded-lg text-center">
                <p className="text-xs text-dawn-400 font-serif italic">Generated by Dawn Intelligent Partner • Validated for professional use</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};