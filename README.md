# ChaiAurParty - Group AI Chat

demo video - https://x.com/shay_ik/status/2073786380979961925?s=20
deployed link - https://persona.atishayjain.engineer

A WhatsApp-like group chat interface where you can chat with two AI personas — **Hitesh sir** and **Piyush sir** — powered by NVIDIA AI.

An intelligent orchestrator routes your messages to the right person based on the context of your query.

## Features

- WhatsApp-style chat UI with green bubbles and responsive design
- Two AI bot personas with distinct personalities:
  - **Hitesh sir** — calm, principle-first, teaching fundamentals & career guidance
  - **Piyush sir** — concise, implementation-heavy, deep technical reasoning
- Orchestrator decides who responds (Hitesh, Piyush, or Both)
- Typing indicator showing which bot is responding (with profile picture)
- Full-screen mobile-first layout

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **OpenAI SDK** (NVIDIA API backend)
- **Lucide React** (icons)
- **Moonshot AI / Kimi K2.6** (LLM)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` file in the project root:

```
NVIDIA_KEY=your_nvidia_api_key
BASE_URL=https://integrate.api.nvidia.com/v1
```

## How It Works

1. User sends a message
2. **Orchestrator** reads the message and decides who should answer
3. The chosen bot's profile picture appears with a typing indicator
4. The bot responds with its unique personality and expertise
5. If both are chosen, Piyush responds first, then Hitesh
