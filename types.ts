export interface Template {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  icon: string;
  repoUrl: string;
  category: "Web" | "Mobile" | "API" | "Data";
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

export interface Project {
  id: string;
  name: string;
  templateId: string;
  repoUrl: string;
  deployUrl?: string;
  status: "generating" | "ready" | "deploying" | "live";
  createdAt: Date;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export enum AppView {
  LANDING = "LANDING",
  GENERATOR = "GENERATOR",
  DASHBOARD = "DASHBOARD",
  SUCCESS = "SUCCESS",
}
