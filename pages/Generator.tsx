import React, { useState, useEffect, useMemo } from "react";
import { Template, Project } from "../types";
import { Button, Input, Card, useToast } from "../components/UI";
import { ArrowRight, Github, Rocket, CheckCircle, Loader2 } from "lucide-react";

interface GeneratorProps {
  template: Template;
  onSuccess: (project: Project) => void;
  onCancel: () => void;
}

export const Generator: React.FC<GeneratorProps> = ({ template, onSuccess, onCancel }) => {
  const [step, setStep] = useState<"config" | "generating" | "success">("config");
  const [projectName, setProjectName] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const { push } = useToast();

  const slug = useMemo(
    () =>
      projectName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, ""),
    [projectName]
  );

  const isValidName = slug.length >= 3;

  // Simulation of the backend generation process
  const startGeneration = async () => {
    if (!isValidName) {
      push({ title: "Name is too short", description: "Use at least 3 characters", variant: "error" });
      return;
    }
    setStep("generating");
    const logSteps = [
      "Authenticating with GitHub (OAuth PKCE)...",
      `Checking repo availability for ${slug}...`,
      `Cloning template: ${template.name}...`,
      "Scaffolding project structure...",
      "Generating README.md + issues...",
      "Creating initial commit...",
      "Pushing to remote origin...",
      "Triggering deployment hook...",
    ];

    for (const log of logSteps) {
      await new Promise((r) => setTimeout(r, 800)); // Simulated delay
      setLogs((prev) => [...prev, log]);
    }

    // Finish
    await new Promise((r) => setTimeout(r, 500));
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: projectName,
      templateId: template.id,
      repoUrl: `github.com/hackerman_99/${slug}`,
      deployUrl: `https://${slug}.vercel.app`,
      status: "live",
      createdAt: new Date(),
      tasks: [
        { id: "1", title: "Personalize README with your story", isCompleted: false },
        { id: "2", title: "Wire the primary data source", isCompleted: false },
        { id: "3", title: "Ship a real feature in 24h", isCompleted: true },
      ],
    };
    setStep("success");
    onSuccess(newProject);
  };

  if (step === "config") {
    return (
      <div className="max-w-2xl mx-auto pt-10 px-4">
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 mb-6 text-sm font-medium">
          ← Back to Templates
        </button>
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-glass flex items-center justify-center text-3xl mx-auto mb-6">
            {template.icon}
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Configure Project</h2>
          <p className="text-slate-500">Kickstart your {template.name} repository.</p>
        </div>

        <Card>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Project Name</label>
              <Input
                placeholder="my-awesome-hack"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                autoFocus
              />
              <p className="text-xs text-slate-500 mt-2">
                Repo will be created as <span className="font-semibold text-slate-700">{slug || "your-repo"}</span>
              </p>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
               <div className="flex items-center gap-3">
                 <Github className="w-5 h-5 text-slate-700" />
                 <span className="text-sm font-medium text-slate-600">Connected as @hackerman_99</span>
               </div>
               <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">Verified</span>
            </div>

            <Button
              className="w-full"
              onClick={startGeneration}
              disabled={!isValidName}
            >
              Generate Repository <Rocket className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <div className="mt-6 grid md:grid-cols-3 gap-4 text-left text-sm text-slate-600">
          <div className="p-4 bg-white/70 rounded-2xl border border-slate-100">
            <p className="font-semibold text-slate-800 mb-1">What happens</p>
            <p>We clone {template.name}, rename packages, and prep README/issues before first push.</p>
          </div>
          <div className="p-4 bg-white/70 rounded-2xl border border-slate-100">
            <p className="font-semibold text-slate-800 mb-1">You own it</p>
            <p>Repos stay in your GitHub. Tokens never touch our storage in a real build.</p>
          </div>
          <div className="p-4 bg-white/70 rounded-2xl border border-slate-100">
            <p className="font-semibold text-slate-800 mb-1">Deploy fast</p>
            <p>We trigger the template deploy hook so you get a live URL in minutes.</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "generating") {
    return (
      <div className="max-w-xl mx-auto pt-20 px-4 text-center">
        <div className="mb-8 relative">
           <div className="w-20 h-20 bg-white rounded-full shadow-lg mx-auto flex items-center justify-center relative z-10">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
           </div>
           <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-6">Building {projectName}...</h2>
        <Card className="text-left font-mono text-xs text-slate-500 min-h-[200px] flex flex-col justify-end">
          {logs.map((log, i) => (
            <div key={i} className="mb-1 last:text-primary last:font-bold">
              <span className="text-slate-300 mr-2">➜</span>
              {log}
            </div>
          ))}
        </Card>
      </div>
    );
  }

  return null;
};
