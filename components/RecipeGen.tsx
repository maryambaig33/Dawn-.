import React, { useState } from 'react';
import { ChefHat, Clock, Award, Printer, Loader2 } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Smart Recipe Generator</h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          Describe what you want to bake, and Dawn will generate a professional formula scaled for your bakery.
        </p>
      </div>

      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Gluten-free Lemon Blueberry Muffins for 24"
          className="flex-1 pl-4 py-3 bg-transparent border-none focus:outline-none text-slate-800 placeholder:text-slate-400"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 bg-dawn-600 hover:bg-dawn-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChefHat className="w-5 h-5" />}
          Generate
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {recipe && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden animate-fade-in">
          <div className="bg-dawn-50 p-8 border-b border-dawn-100 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{recipe.name}</h2>
              <p className="text-slate-600 text-lg">{recipe.description}</p>
            </div>
            <button className="p-2 text-slate-500 hover:text-dawn-600 hover:bg-white rounded-lg transition-all">
              <Printer className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-8 col-span-1 bg-slate-50/30">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-slate-700">
                  <Clock className="w-5 h-5 text-dawn-500" />
                  <span className="font-medium">{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Award className="w-5 h-5 text-dawn-500" />
                  <span className="font-medium">{recipe.difficulty}</span>
                </div>
                
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4">Ingredients</h3>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-dawn-400 mt-2 flex-shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 col-span-2">
              <h3 className="font-bold text-slate-900 mb-6 text-xl">Instructions</h3>
              <div className="space-y-6">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center flex-shrink-0 border border-slate-200">
                      {i + 1}
                    </div>
                    <p className="text-slate-700 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};