export type SkillLevel = "S" | "A" | "I" | "B";

export interface Tool {
  icon: string;
  name: string;
  level: SkillLevel;
}

export interface ToolCategory {
  label: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    label: "AI & Automation",
    tools: [
      { icon: "Brain", name: "OpenAI Platform", level: "I" },
      { icon: "Bot", name: "LLMs (ChatGPT, Gemini, Claude)", level: "I" },
      { icon: "Terminal", name: "Claude Code", level: "I" },
      { icon: "Zap", name: "Cursor", level: "I" },
      { icon: "RefreshCw", name: "n8n Workflows", level: "I" },
      { icon: "Sparkles", name: "AI Prompt Engineering", level: "A" },
      { icon: "Wand2", name: "Midjourney / DALL-E", level: "I" },
    ],
  },
  {
    label: "Web & Dev",
    tools: [
      { icon: "Code", name: "HTML / CSS / JS", level: "I" },
      { icon: "GitBranch", name: "GitHub / Git", level: "I" },
      { icon: "Rocket", name: "Vercel / Netlify", level: "I" },
      { icon: "Database", name: "Supabase", level: "B" },
      { icon: "Palette", name: "Framer", level: "I" },
      { icon: "FileText", name: "WordPress", level: "I" },
      { icon: "Cloud", name: "Google Cloud API", level: "I" },
    ],
  },
  {
    label: "Design & Creative",
    tools: [
      { icon: "Image", name: "Adobe Photoshop", level: "I" },
      { icon: "PenTool", name: "Adobe Illustrator", level: "I" },
      { icon: "Clapperboard", name: "Adobe Premiere Pro", level: "B" },
      { icon: "Video", name: "DaVinci Resolve", level: "B" },
      { icon: "Layout", name: "Canva", level: "I" },
      { icon: "Ruler", name: "AutoCAD", level: "A" },
      { icon: "Box", name: "SketchUp", level: "A" },
    ],
  },
  {
    label: "Broadcast & Esports",
    tools: [
      { icon: "Monitor", name: "vMix (Broadcast/Overlay)", level: "S" },
      { icon: "Radio", name: "OBS Studio", level: "A" },
      { icon: "Trophy", name: "Tournament Platforms", level: "A" },
      { icon: "Gamepad2", name: "Roblox Studio", level: "B" },
    ],
  },
  {
    label: "Business & Ops",
    tools: [
      { icon: "File", name: "Google Workspace", level: "A" },
      { icon: "LayoutGrid", name: "Notion", level: "A" },
      { icon: "MessageCircle", name: "WhatsApp Business", level: "I" },
      { icon: "Megaphone", name: "Meta Business Suite", level: "I" },
      { icon: "MessageSquare", name: "Discord", level: "I" },
      { icon: "Hash", name: "Slack", level: "I" },
      { icon: "TrendingUp", name: "SEO / Growth Strategy", level: "I" },
      { icon: "BarChart2", name: "Google Analytics", level: "I" },
      { icon: "CreditCard", name: "Stripe", level: "B" },
    ],
  },
];

export const skillLevelConfig: Record<
  SkillLevel,
  { label: string; gradient: string }
> = {
  B: { label: "Basic", gradient: "from-[#666] to-[#888]" },
  I: { label: "Intermediate", gradient: "from-[#00d4ff] to-[#0099ff]" },
  A: { label: "Advanced", gradient: "from-accent-primary to-accent-secondary" },
  S: { label: "Super", gradient: "from-[#ff41ff] to-accent-tertiary" },
};
