'use server'
import OpenAI from "openai";
import { piyush_promp, hitesh_promp, middle_sys } from "./prompt";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_KEY,
  baseURL: process.env.BASE_URL
});

async function orchestrator(mssgs: ChatCompletionMessageParam[]) {
  const res = await openai.chat.completions.create({
    model: "moonshotai/kimi-k2.6",
    messages: [
      { role: "system", content: middle_sys },
      ...mssgs
    ]
  });
  return res;
}

async function response(sys_promp: string, mssgs: ChatCompletionMessageParam[]) {
  const res = await openai.chat.completions.create({
    model: "moonshotai/kimi-k2.6",
    temperature: 0.7,
    messages: [
      { role: "system", content: sys_promp },
      ...mssgs
    ]
  });
  return res;
}

export interface BotResponse {
  senderId: 'hitesh' | 'piyush';
  text: string;
}

export interface ChoiceResult {
  choice: 'HITESH' | 'PIYUSH' | 'BOTH';
  raw: string;
}

export async function getChoice(mssgs: ChatCompletionMessageParam[]): Promise<ChoiceResult> {
  console.log("=== getChoice called ===");
  console.log("Messages count:", mssgs.length);
  console.log("Last message:", mssgs[mssgs.length - 1]);

  const res = await orchestrator(mssgs);
  const raw = res.choices[0].message.content?.trim().toUpperCase() || '';

  console.log("Orchestrator raw response:", raw);

  if (raw.includes("BOTH")) return { choice: 'BOTH', raw };
  if (raw.includes("HITESH")) return { choice: 'HITESH', raw };
  if (raw.includes("PIYUSH")) return { choice: 'PIYUSH', raw };

  console.log("No match found, defaulting to HITESH");
  return { choice: 'HITESH', raw };
}

export async function getBotResponses(
  choice: 'HITESH' | 'PIYUSH' | 'BOTH',
  mssgs: ChatCompletionMessageParam[]
): Promise<BotResponse[]> {
  console.log("=== getBotResponses called ===");
  console.log("Choice:", choice);
  console.log("Messages count:", mssgs.length);

  const results: BotResponse[] = [];

  if (choice === 'PIYUSH' || choice === 'BOTH') {
    console.log("Calling Piyush AI...");
    const res = await response(piyush_promp, mssgs);
    const text = res.choices[0].message.content || '';
    console.log("Piyush response length:", text.length);
    console.log("Piyush response preview:", text.substring(0, 100));
    results.push({ senderId: 'piyush', text });
  }

  if (choice === 'HITESH' || choice === 'BOTH') {
    console.log("Calling Hitesh AI...");
    const res = await response(hitesh_promp, mssgs);
    const text = res.choices[0].message.content || '';
    console.log("Hitesh response length:", text.length);
    console.log("Hitesh response preview:", text.substring(0, 100));
    results.push({ senderId: 'hitesh', text });
  }

  console.log("Total bot responses:", results.length);
  return results;
}
