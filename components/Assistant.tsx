import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Croissant } from 'lucide-react';
import { ChatMessage, MessageRole } from '../types';
import { chatWithAssistant } from '../services/geminiService';

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: MessageRole.MODEL,
      text: "Hello! I'm Dawn, your intelligent bakery partner. Whether you need to adjust a recipe for humidity or track down the latest pastry trends, I'm here to help.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await chatWithAssistant(history, userMessage.text);

      if (responseText) {
        const modelMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: MessageRole.MODEL,
          text: responseText,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, modelMessage]);
      }
    } catch (error) {
      console.error("Failed to get response", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: "I'm sorry, I encountered an issue connecting to the bakery network. Please check your connection or API key.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-cream-200 bg-cream-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dawn-500 to-dawn-600 flex items-center justify-center shadow-lg shadow-dawn-200">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-dawn-900">Bakery Assistant</h2>
            <p className="text-xs text-dawn-600 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
              Always Online
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#fffdfa]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === MessageRole.USER ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`
              w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border shadow-sm
              ${msg.role === MessageRole.USER ? 'bg-dawn-900 border-dawn-900' : 'bg-white border-cream-200'}
            `}>
              {msg.role === MessageRole.USER ? <User className="w-5 h-5 text-white" /> : <Croissant className="w-5 h-5 text-dawn-600" />}
            </div>
            <div className={`
              max-w-[80%] p-6 rounded-3xl shadow-sm text-[15px] leading-relaxed font-light
              ${msg.role === MessageRole.USER 
                ? 'bg-dawn-600 text-white rounded-tr-none shadow-dawn-200' 
                : 'bg-white text-dawn-900 rounded-tl-none border border-cream-200'}
            `}>
               <div className="markdown-body" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-2xl bg-white border border-cream-200 flex items-center justify-center flex-shrink-0">
               <Croissant className="w-5 h-5 text-dawn-600" />
             </div>
             <div className="bg-white px-6 py-4 rounded-3xl rounded-tl-none border border-cream-200 shadow-sm flex items-center gap-3">
               <Loader2 className="w-4 h-4 animate-spin text-dawn-600" />
               <span className="text-sm text-dawn-500 italic">Consulting the recipe books...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 m-4 bg-white border border-cream-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-dawn-500/20 focus-within:border-dawn-500 transition-all">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about dough hydration, scaling recipes, or display tips..."
            className="w-full bg-transparent border-none pl-2 pr-12 py-2 text-dawn-900 placeholder:text-dawn-300/80 focus:outline-none font-medium"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-0 p-2.5 bg-dawn-600 text-white rounded-xl hover:bg-dawn-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-dawn-200 hover:shadow-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};