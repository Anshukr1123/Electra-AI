import React from 'react';
import { MapPin, Calendar, ExternalLink, Bot, User } from 'lucide-react';

const MessageBubble = ({ message, isUser }) => {
  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%] bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <User size={14} className="text-blue-200" />
            <span className="text-xs font-medium text-blue-100">You</span>
          </div>
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  // Assistant Message
  const { summary, explanation, steps, quickAction, actionLink, followUp } = message.data || {};

  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-[85%] bg-white border border-gray-100 text-textMain rounded-2xl rounded-tl-sm px-5 py-4 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-accent/10 p-1.5 rounded-full">
            <Bot size={16} className="text-accent" />
          </div>
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">Electra AI</span>
        </div>
        
        {/* Summary */}
        {summary && <p className="text-sm font-semibold mb-2">{summary}</p>}
        
        {/* Explanation */}
        {explanation && <p className="text-sm text-textMuted mb-3 leading-relaxed">{explanation}</p>}
        
        {/* Steps */}
        {steps && steps.length > 0 && (
          <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wide">Action Steps</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              {steps.map((step, idx) => (
                <li key={idx} className="pl-1">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Quick Action Buttons */}
        {actionLink && quickAction && quickAction !== 'NONE' && (
          <div className="mt-3 mb-4">
            <a 
              href={actionLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
            >
              {quickAction === 'FIND_LOCATION' && <MapPin size={16} />}
              {quickAction === 'ADD_TO_CALENDAR' && <Calendar size={16} />}
              {quickAction === 'CHECK_REGISTRATION' && <ExternalLink size={16} />}
              {quickAction === 'FIND_LOCATION' ? 'View on Google Maps' : 
               quickAction === 'ADD_TO_CALENDAR' ? 'Add to Google Calendar' : 'Visit Vote.gov'}
            </a>
          </div>
        )}

        {/* Follow Up Question */}
        {followUp && (
          <div className="mt-2 text-sm italic text-primary/80 border-t border-gray-100 pt-3">
            {followUp}
          </div>
        )}

        {/* Fallback for simple text messages (e.g., greeting) */}
        {!summary && message.text && (
           <p className="text-sm leading-relaxed">{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
