"use client";

import { useChat } from "./hooks/useChat";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

export default function Home() {
  const { messages, typingBot, sendMessage } = useChat();

  return (
    <div className="fixed inset-0 bg-[#128c7e] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full flex flex-col bg-white overflow-hidden relative">
        <ChatHeader />
        <div className="flex-1 bg-[#e5ddd5] flex flex-col min-h-0">
          <MessageList messages={messages} typingBot={typingBot} />
        </div>
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
}
