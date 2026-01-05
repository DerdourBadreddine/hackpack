import { Template } from "./types";

export const TEMPLATES: Template[] = [
  {
    id: "next-starter",
    name: "Next.js SaaS Starter",
    description: "Complete stack with Tailwind, Auth stub, and API routes ready for Vercel.",
    techStack: ["Next.js", "Tailwind", "TypeScript"],
    icon: "⚡️",
    repoUrl: "github.com/hackpack/next-starter",
    category: "Web",
  },
  {
    id: "express-api",
    name: "Express API Micro",
    description: "Lightweight REST API with SQLite setup and Dockerfile included.",
    techStack: ["Express", "Node.js", "Docker"],
    icon: "🚀",
    repoUrl: "github.com/hackpack/express-api",
    category: "API",
  },
  {
    id: "flask-ml",
    name: "Flask ML Lite",
    description: "Python Flask server with Scikit-learn ready for model serving.",
    techStack: ["Python", "Flask", "Scikit-learn"],
    icon: "🤖",
    repoUrl: "github.com/hackpack/flask-ml",
    category: "Data",
  },
  {
    id: "expo-mobile",
    name: "Expo Mobile Stub",
    description: "React Native boilerplate with Navigation and polished UI components.",
    techStack: ["React Native", "Expo", "TypeScript"],
    icon: "📱",
    repoUrl: "github.com/hackpack/expo-stub",
    category: "Mobile",
  },
  {
    id: "supabase-crud",
    name: "Supabase CRUD",
    description: "React frontend with pre-configured Supabase client and Auth UI.",
    techStack: ["React", "Supabase", "Postgres"],
    icon: "🔥",
    repoUrl: "github.com/hackpack/supabase-crud",
    category: "Web",
  },
];

export const MOCK_USER = {
  id: "u1",
  username: "hackerman_99",
  avatarUrl: "https://picsum.photos/200",
};
