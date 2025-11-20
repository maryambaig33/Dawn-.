export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  difficulty: string;
}

export interface SalesData {
  name: string;
  sales: number;
  trend: number;
}

export enum Tab {
  DASHBOARD = 'dashboard',
  ASSISTANT = 'assistant',
  RECIPES = 'recipes',
  TRENDS = 'trends'
}