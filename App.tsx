import React, { useState } from "react";
import { AppView, Template, Project, User } from "./types";
import { TEMPLATES, MOCK_USER } from "./constants";
import { Card, Button, Badge } from "./components/UI";
import { Generator } from "./pages/Generator";
import { Zap, Github, ExternalLink, CheckSquare, Plus, Code, Box, Rocket } from "lucide-react";

export default function App() {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    // Mock login
    setTimeout(() => setUser(MOCK_USER), 800);
  };

  const handleSelectTemplate = (t: Template) => {
    if (!user) {
      alert("Please login with GitHub first");
      return;
    }
    setSelectedTemplate(t);
    setView(AppView.GENERATOR);
  };

  const handleSuccess = (p: Project) => {
    setCurrentProject(p);
    setView(AppView.SUCCESS);
  };

  return (
    <div className="min-h-screen text-slate-800 pb-20">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full glass border-b border-white/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.LANDING)}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-400 rounded-lg flex items-center justify-center text-white font-bold">
              H
            </div>
            <span className="font-display font-semibold text-lg tracking-tight">Hackpack</span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                 <button onClick={() => setView(AppView.LANDING)} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Templates</button>
                 <div className="h-4 w-px bg-slate-300"></div>
                <img src={user.avatarUrl} className="w-8 h-8 rounded-full border border-white shadow-sm" alt="Profile" />
              </div>
            ) : (
              <Button variant="glass" className="py-2 px-4 text-sm" onClick={handleLogin}>
                <Github className="w-4 h-4" /> Sign in
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="animate-slide-up">
        {view === AppView.LANDING && (
          <>
            {/* Hero */}
            <section className="relative pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
              <Badge>v1.0 Public Beta</Badge>
              <h1 className="mt-6 text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 mb-6">
                Ship your hackathon idea <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  before lunch.
                </span>
              </h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                Instant boilerplate generation. Auto-configured GitHub repos. One-click Vercel deploys. The unfair advantage for builders.
              </p>
              {!user && (
                 <Button className="mx-auto pl-5 pr-6 h-14 text-lg" onClick={handleLogin}>
                  <Github className="w-5 h-5" /> Login with GitHub to Start
                </Button>
              )}
            </section>

            {/* Templates Grid */}
            <section className="px-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-bold text-slate-800">Choose your stack</h3>
                 <div className="text-sm text-slate-500">5 templates available</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEMPLATES.map((t) => (
                  <Card key={t.id} onClick={() => handleSelectTemplate(t)} className="group h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                        {t.icon}
                      </div>
                      <Badge>{t.category}</Badge>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{t.name}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{t.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {t.techStack.map((tech) => (
                        <span key={tech} className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
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
               <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">You're live!</h2>
               <p className="text-xl text-slate-500">
                 <span className="font-semibold text-slate-800">{currentProject.name}</span> has been generated and deployed.
               </p>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
               <Card className="flex flex-col justify-between">
                 <div>
                   <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                     <Box className="w-5 h-5 text-primary" /> Repository
                   </h3>
                   <p className="text-slate-500 text-sm mb-6">Code committed, README generated, Tasks added.</p>
                 </div>
                 <a href={`https://${currentProject.repoUrl}`} target="_blank" rel="noreferrer" className="block">
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
                   <p className="text-slate-600 text-sm mb-6">Your project is live on the edge.</p>
                 </div>
                 <a href={currentProject.deployUrl} target="_blank" rel="noreferrer" className="block">
                   <Button className="w-full">
                     <ExternalLink className="w-4 h-4" /> Visit Live Site
                   </Button>
                 </a>
               </Card>
             </div>

             <div className="mt-10">
               <h3 className="font-bold text-slate-900 mb-4 px-1">Next Steps (Auto-generated Issues)</h3>
               <div className="space-y-3">
                 {currentProject.tasks.map((task) => (
                   <div key={task.id} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.isCompleted ? 'bg-green-500 border-green-500' : 'border-slate-300'}`}>
                        {task.isCompleted && <CheckSquare className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`${task.isCompleted ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>{task.title}</span>
                      {task.isCompleted && <span className="ml-auto text-xs text-green-600 font-bold px-2 py-1 bg-green-50 rounded">DONE</span>}
                   </div>
                 ))}
               </div>
             </div>

             <div className="mt-12 text-center">
                <Button variant="glass" onClick={() => setView(AppView.LANDING)}>Build Another Project</Button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}