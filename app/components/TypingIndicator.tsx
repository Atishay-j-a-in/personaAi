import React from "react";

interface TypingIndicatorProps {
  senderId: 'hitesh' | 'piyush' | null;
}

const senderData: Record<string, { name: string; avatar: string }> = {
  hitesh: { name: 'Hitesh sir', avatar: '/hitesh.webp' },
  piyush: { name: 'Piyush sir', avatar: '/piyush.webp' },
};

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ senderId }) => {

  if (!senderId) return null;

  const data = senderData[senderId];

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden bg-gray-200">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white rounded-full px-4 py-2.5 shadow-sm flex items-center gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export default TypingIndicator;
