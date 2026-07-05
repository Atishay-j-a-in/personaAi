"use client";

import { useState, useCallback, useRef } from "react";
import { getChoice, getBotResponses } from "../../features/persona/server";
import type { ChatCompletionMessageParam } from "openai/resources";

export interface Message {
  id: number;
  text: string;
  senderId: "user" | "hitesh" | "piyush";
  time: string;
}

export interface SenderProfile {
  id: string;
  name: string;
  avatar: string;
}

export const senders: SenderProfile[] = [
  { id: "hitesh", name: "Hitesh sir", avatar: "/hitesh.webp" },
  { id: "piyush", name: "Piyush sir", avatar: "/piyush.webp" },
];

function toApiMessages(messages: Message[]): ChatCompletionMessageParam[] {
  return messages.map((msg) => {
    if (msg.senderId === "user") {
      return { role: "user" as const, content: msg.text };
    }
    return { role: "assistant" as const, content: msg.text };
  });
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingBot, setTypingBot] = useState<"hitesh" | "piyush" | null>(null);
  const idCounter = useRef(0);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    console.log("=== sendMessage called ===");
    console.log("User text:", text);

    const userMsg: Message = {
      id: idCounter.current++,
      text,
      senderId: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages: Message[] = [];
    setMessages((prev) => {
      const next = [...prev, userMsg];
      updatedMessages.push(...next);
      return next;
    });

    const apiMessages = toApiMessages(updatedMessages);
    console.log("Calling getChoice with", apiMessages.length, "messages...");

    try {
      const choice = await getChoice(apiMessages);
      console.log("Choice received:", choice.choice);

      const botQueue: ("hitesh" | "piyush")[] =
        choice.choice === "BOTH"
          ? ["piyush", "hitesh"]
          : [choice.choice.toLowerCase() as "hitesh" | "piyush"];

      console.log("Bot queue:", botQueue);
      setTypingBot(botQueue[0]);

      console.log("Calling getBotResponses...");
      const responses = await getBotResponses(choice.choice, apiMessages);
      console.log("Responses received:", responses.length);

      for (let i = 0; i < responses.length; i++) {
        const r = responses[i];

        if (i > 0) {
          console.log("Switching typing to", botQueue[i]);
          setTypingBot(botQueue[i]);
          await new Promise((r) => setTimeout(r, 600));
        }

        console.log("Adding bot message from", r.senderId);
        const botMsg: Message = {
          id: idCounter.current++,
          text: r.text,
          senderId: r.senderId,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, botMsg]);
        updatedMessages.push(botMsg);
      }

      setTypingBot(null);
      console.log("=== sendMessage complete ===");
    } catch (err) {
      console.error("Error in sendMessage:", err);
      setTypingBot(null);
    }
  }, []);

  return { messages, typingBot, sendMessage };
}
