import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { sendChatMessage } from '../../services/api';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      isUser: false,
      data: {
        summary: "Welcome to Electra AI!",
        explanation: "I'm here to help you navigate the voting process. Whether you need to check your eligibility, find where to vote, or remember important dates, just ask!",
        followUp: "How can I help you today?"
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { isUser: true, text: userMessage }]);
    setIsLoading(true);

    try {
      // Build brief history for context (last 5 messages)
      const history = messages.slice(-5).map(m => ({
        user: m.isUser ? m.text : '',
        assistant: !m.isUser ? (m.data?.summary || m.text || '') : ''
      })).filter(h => h.user || h.assistant);

      const response = await sendChatMessage(userMessage, history);
      
      setMessages(prev => [...prev, { isUser: false, data: response }]);
    } catch (error) {
      console.error("Failed to send message", error);
      setMessages(prev => [...prev, { 
        isUser: false, 
        text: "I'm sorry, I encountered an error connecting to the server. Please try again later.",
        data: null
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between z-10 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-secondary">Electra AI</h2>
          <p className="text-xs text-textMuted">Your guide to voting and elections</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-500">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} isUser={msg.isUser} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-6">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-3">
              <Loader2 size={16} className="animate-spin text-accent" />
              <span className="text-sm text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-200">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about voting eligibility, locations..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full pl-5 pr-14 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">AI Assistant • Verify official sources</span>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
