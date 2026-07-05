import React, { useState } from "react";
import { Plus, Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="bg-[#f0f0f0] p-2 flex items-center gap-2 shrink-0 z-10 border-t border-gray-200">
      <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors shrink-0">
        <Plus size={24} />
      </button>

      <input
        type="text"
        placeholder="Message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-800 placeholder:text-gray-400"
      />

      <button
        onClick={handleSend}
        className="p-2.5 bg-[#25d366] text-white rounded-full hover:bg-[#128c7e] transition-colors shrink-0"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
