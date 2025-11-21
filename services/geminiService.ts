import { GoogleGenAI, Type, Schema } from "@google/genai";

// Declare process for TypeScript to avoid "Cannot find name 'process'" build errors
declare const process: {
  env: {
    API_KEY: string;
  }
};

// Initialize the Gemini client
// The API key is expected to be in process.env.API_KEY
// Ensure process.env exists via polyfill in index.html if running in browser
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RECIPE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Name of the recipe" },
    description: { type: Type.STRING, description: "Brief attractive description" },
    ingredients: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of ingredients with quantities"
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Step by step instructions"
    },
    prepTime: { type: Type.STRING, description: "Total preparation and cooking time" },
    difficulty: { type: Type.STRING, description: "Difficulty level: Easy, Medium, or Hard" }
  },
  required: ["name", "description", "ingredients", "instructions", "prepTime", "difficulty"]
};

export const generateRecipe = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a bakery recipe for: ${prompt}. Ensure it is professional bakery scale if possible, or indicate yield.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: RECIPE_SCHEMA,
        systemInstruction: "You are a world-class pastry chef and bakery consultant for Dawn Foods. You provide precise, professional recipes."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No recipe generated");
    return JSON.parse(text);
  } catch (error) {
    console.error("Recipe generation error:", error);
    throw error;
  }
};

export const chatWithAssistant = async (history: {role: string, parts: {text: string}[]}[], newMessage: string) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are Dawn, an intelligent bakery partner assistant. You help bakers with technical advice, troubleshooting dough/batter issues, suggesting product pairings, and analyzing business trends. You are professional, warm, and encouraging.",
      },
      history: history as any // Cast to any to avoid strict type mismatches with SDK Content type during build
    });

    const result = await chat.sendMessage({
      message: newMessage
    });

    return result.text;
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
};

export const analyzeTrends = async (topic: string) => {
  try {
    // Using search grounding for latest trends
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `What are the current trends in ${topic} for 2025 bakeries? Provide a concise summary and 3 key actionable insights.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    // Extract grounding chunks if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text: response.text || "Unable to generate analysis at this time.",
      groundingChunks: groundingChunks
    };
  } catch (error) {
    console.error("Trend analysis error:", error);
    throw error;
  }
}