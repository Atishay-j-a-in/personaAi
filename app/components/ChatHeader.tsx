import React from "react";
import { ChevronLeft, Video, Phone } from "lucide-react";

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-[#f0f0f0] flex items-center justify-between px-3 py-3 border-b border-gray-200 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-white">
          <img
            src="/chailogo.webp"
            alt="ChaiAurParty Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-800">ChaiAurParty</span>
          <span className="text-xs text-gray-500">Hitesh sir, Piyush sir, and you</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-gray-600">
        <button className="hover:bg-gray-200 p-1 rounded-full transition-colors">
          <Video size={20} />
        </button>
        <button className="hover:bg-gray-200 p-1 rounded-full transition-colors">
          <Phone size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
