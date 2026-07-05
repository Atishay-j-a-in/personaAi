import React from "react";
import { Message, senders } from "../hooks/useChat";
import TypingIndicator from "./TypingIndicator";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.senderId === "user";
  const sender = senders.find((s) => s.id === message.senderId);

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} gap-2`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden bg-gray-200 mt-1">
          <img
            src={sender?.avatar}
            alt={sender?.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="max-w-[75%]">
        {!isUser && (
          <p className="text-xs font-semibold text-gray-500 mb-0.5 ml-1">
            {sender?.name}
          </p>
        )}
        <div
          className={`rounded-lg px-3 py-2 shadow-sm ${
            isUser
              ? "bg-[#dcf8c6] text-black rounded-tr-none"
              : "bg-white text-black rounded-tl-none"
          }`}
          style={{
            borderRadius: isUser ? "12px 0 12px 12px" : "0 12px 12px 12px",
          }}
        >
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
          <div
            className={`flex items-center justify-end gap-1 mt-1 ${
              isUser ? "text-[#075E54]" : "text-gray-400"
            }`}
          >
            <span className="text-[10px] opacity-80">{message.time}</span>
            {isUser && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M4.9 12.55l5.28 5.28l10.18-10.18" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MessageListProps {
  messages: Message[];
  typingBot: "hitesh" | "piyush" | null;
}

const MessageList: React.FC<MessageListProps> = ({ messages, typingBot }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-3">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <TypingIndicator senderId={typingBot} />
    </div>
  );
};

export default MessageList;
