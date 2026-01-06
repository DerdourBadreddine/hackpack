import React, { useEffect, useMemo, useState } from "react";
import { AppView, Template, Project, User } from "./types";
import { TEMPLATES, MOCK_USER } from "./constants";
import { Card, Button, Badge, Pill, useToast } from "./components/UI";
import { Generator } from "./pages/Generator";
import {
  Zap,
  Github,
  ExternalLink,
  CheckSquare,
  Box,
  Rocket,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Moon,
  SunMedium,
} from "lucide-react";

export default function App() {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<
    Template["category"] | "All"
  >("All");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const { push } = useToast();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogin = () => {
    // Mock login
    setTimeout(() => setUser(MOCK_USER), 800);
    push({
      title: "Signing you in...",
      description: "Fetching your GitHub profile",
      variant: "default",
    });
  };

  const handleSelectTemplate = (t: Template) => {
    if (!user) {
      push({
        title: "Sign in to continue",
        description: "Hackpack needs GitHub to generate your repo and issues",
        variant: "error",
      });
      return;
    }
    setSelectedTemplate(t);
    setView(AppView.GENERATOR);
  };

  const handleSuccess = (p: Project) => {
    setCurrentProject(p);
    setView(AppView.SUCCESS);
  };

  const filteredTemplates = useMemo(() => {
    if (categoryFilter === "All") return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-black relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/30" />
        <div className="absolute right-[-20%] top-10 h-[28rem] w-[28rem] rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-900/20" />
        <div className="absolute left-10 bottom-0 h-64 w-64 rounded-full bg-white shadow-2xl shadow-white/40 dark:bg-slate-900 dark:shadow-slate-900/40" />
      </div>
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-white/60 bg-white/70 dark:bg-slate-900/70 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView(AppView.LANDING)}
          >
            <div className="w-9 h-9 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-slate-900/15 dark:bg-white dark:text-slate-900">
              H
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-semibold text-lg tracking-tight">
                Hackpack
              </span>
              <span className="text-[11px] uppercase tracking-[0.28em] text-slate-400 font-semibold dark:text-slate-500">
                Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="glass"
              className="h-10 px-4 rounded-xl border border-slate-200/60 dark:border-white/10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunMedium className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              {theme === "dark" ? "Light" : "Dark"} mode
            </Button>
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView(AppView.LANDING)}
                  className="text-sm font-medium text-slate-600 hover:text-primary transition-colors dark:text-slate-200"
                >
                  Templates
                </button>
                <div className="h-4 w-px bg-slate-300"></div>
                <img
                  src={user.avatarUrl}
                  className="w-8 h-8 rounded-full border border-white shadow-sm"
                  alt="Profile"
                />
              </div>
            ) : (
              <Button
                variant="secondary"
                className="py-2 px-4 text-sm rounded-xl shadow-none border border-slate-200 hover:border-slate-300"
                onClick={handleLogin}
              >
                <Github className="w-4 h-4" /> Sign in
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="animate-slide-up relative z-10">
        {view === AppView.LANDING && (
          <>
            {/* Hero */}
            <section className="relative pt-20 pb-12 px-6 max-w-6xl mx-auto flex flex-col gap-10">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge>v1.0 Public Beta</Badge>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4" />
                      Private by design
                    </div>
                  </div>
                  <h1 className="mt-6 text-5xl md:text-6xl font-display font-bold tracking-tight text-slate-900 leading-tight dark:text-white">
                    Ship production-ready bases with an Apple-grade polish.
                  </h1>
                  <p className="text-lg text-slate-500 max-w-2xl mt-6 leading-relaxed dark:text-slate-300">
                    Auth, repos, and deploys in one flow. Hackpack assembles
                    your stack, writes the README, and hands you a live URL. No
                    emojis, just crisp UI that feels ready for a client demo.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-8">
                    <Button
                      className="pl-5 pr-6 h-12 text-base"
                      onClick={handleLogin}
                    >
                      <Github className="w-5 h-5" /> Login with GitHub
                    </Button>
                    <Button
                      variant="secondary"
                      className="h-12 px-4 text-base rounded-xl"
                      onClick={() => setCategoryFilter("Web")}
                    >
                      Browse templates <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="glass-panel rounded-3xl p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] border border-white/70 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-400 font-semibold">
                          Live preview
                        </p>
                        <h3 className="text-2xl font-semibold text-slate-900 mt-1">
                          Guided creation
                        </h3>
                      </div>
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                      <div className="flex items-center gap-3 bg-white/80 rounded-2xl p-3 border border-slate-100 dark:bg-white/10 dark:border-white/10">
                        <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center dark:bg-white dark:text-slate-900">
                          <Rocket className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            Provision repo
                          </p>
                          <p className="text-slate-500 text-xs dark:text-slate-400">
                            GitHub OAuth, branch protection, and tasks.
                          </p>
                        </div>
                        <span className="text-[11px] text-green-600 font-semibold px-2 py-1 bg-green-50 rounded-lg">
                          Auto
                        </span>
                      </div>
                      <div className="flex items-center gap-3 bg-white/70 rounded-2xl p-3 border border-slate-100 dark:bg-white/5 dark:border-white/10">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-indigo-500 text-white flex items-center justify-center">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            Deploy instantly
                          </p>
                          <p className="text-slate-500 text-xs dark:text-slate-400">
                            Vercel-ready config with env placeholders.
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="flex items-center gap-3 bg-white/70 rounded-2xl p-3 border border-slate-100 dark:bg-white/5 dark:border-white/10">
                        <div className="h-10 w-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center dark:bg-white/10 dark:text-white">
                          <CheckSquare className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            Launch checklist
                          </p>
                          <p className="text-slate-500 text-xs dark:text-slate-400">
                            Issue queue with the first 3 hours mapped.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-slate-600 dark:text-slate-300">
                {[
                  "Auth & repo wiring",
                  "Production defaults",
                  "Fast handoff",
                  "Client-safe UI",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/70 border border-slate-100 p-3 flex items-center gap-2 shadow-[0_10px_40px_-32px_rgba(15,23,42,0.4)] dark:bg-white/5 dark:border-white/10"
                  >
                    <div className="h-8 w-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-semibold dark:bg-white dark:text-slate-900">
                      ●
                    </div>
                    <span className="font-medium text-slate-800 dark:text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Templates Grid */}
            <section className="px-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400 font-semibold">
                    Template Library
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1 dark:text-white">
                    Pick a mission, not a TODO
                  </h3>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-300">
                  {filteredTemplates.length} shown · {TEMPLATES.length} total
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {["All", "Web", "API", "Data", "Mobile"].map((cat) => (
                  <Pill
                    key={cat}
                    active={categoryFilter === cat}
                    onClick={() =>
                      setCategoryFilter(cat as Template["category"] | "All")
                    }
                  >
                    {cat}
                  </Pill>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((t) => (
                  <Card
                    key={t.id}
                    onClick={() => handleSelectTemplate(t)}
                    className="group h-full flex flex-col border border-white/70 bg-white/80 hover:bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.6)] dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/10 group-hover:-translate-y-1 transition-all dark:bg-white dark:text-slate-900">
                        <t.icon className="w-5 h-5" />
                      </div>
                      <Badge>{t.category}</Badge>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow dark:text-slate-300">
                      {t.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4 dark:text-slate-300">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {t.difficulty}
                      </span>
                      <span>{t.stars}★</span>
                      <span>
                        Updated {new Date(t.updatedAt).toLocaleDateString()}
                      </span>
                      <span className="capitalize">{t.deployTarget}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {[...t.techStack, ...t.tags].slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg dark:bg-white/10 dark:text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View flow</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {view === AppView.GENERATOR && selectedTemplate && (
          <Generator
            template={selectedTemplate}
            onCancel={() => setView(AppView.LANDING)}
            onSuccess={handleSuccess}
          />
        )}

        {view === AppView.SUCCESS && currentProject && (
          <div className="max-w-4xl mx-auto pt-16 px-6">
            <div className="text-center mb-12 animate-bounce-slight">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl shadow-green-500/30">
                <Zap className="w-10 h-10 fill-current" />
              </div>
              <h2 className="text-4xl font-display font-bold text-slate-900 mb-4 dark:text-white">
                You're live!
              </h2>
              <p className="text-xl text-slate-500 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-white">
                  {currentProject.name}
                </span>{" "}
                has been generated and deployed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Box className="w-5 h-5 text-primary" /> Repository
                  </h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Code committed, README generated, Tasks added.
                  </p>
                </div>
                <a
                  href={`https://${currentProject.repoUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <Button variant="secondary" className="w-full">
                    <Github className="w-4 h-4" /> Open GitHub Repo
                  </Button>
                </a>
              </Card>

              <Card className="flex flex-col justify-between border-primary/20 bg-primary/5">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-primary">
                    <Rocket className="w-5 h-5" /> Deployment
                  </h3>
                  <p className="text-slate-600 text-sm mb-6">
                    Your project is live on the edge.
                  </p>
                </div>
                <a
                  href={currentProject.deployUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <Button className="w-full">
                    <ExternalLink className="w-4 h-4" /> Visit Live Site
                  </Button>
                </a>
              </Card>
            </div>

            <div className="mt-10">
              <h3 className="font-bold text-slate-900 mb-4 px-1">
                Next Steps (Auto-generated Issues)
              </h3>
              <div className="space-y-3">
                {currentProject.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm dark:bg-white/5 dark:border-white/10"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        task.isCompleted
                          ? "bg-green-500 border-green-500"
                          : "border-slate-300"
                      }`}
                    >
                      {task.isCompleted && (
                        <CheckSquare className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span
                      className={`${
                        task.isCompleted
                          ? "text-slate-400 line-through"
                          : "text-slate-700 font-medium dark:text-slate-200"
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.isCompleted && (
                      <span className="ml-auto text-xs text-green-600 font-bold px-2 py-1 bg-green-50 rounded">
                        DONE
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button variant="glass" onClick={() => setView(AppView.LANDING)}>
                Build Another Project
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
