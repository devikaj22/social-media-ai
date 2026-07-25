import React from 'react';
import { Sparkles, Cpu, Database, Server, Layout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                SocialAI Calendar
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Empowering businesses, creators, and marketers to generate strategic 30-day social media plans with Google Gemini 2.5 Flash AI and store them reliably in Supabase PostgreSQL.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Built With Tech
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-500" />
                <span>Google Gemini 2.5 Flash</span>
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>Supabase PostgreSQL</span>
              </li>
              <li className="flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-500" />
                <span>Node.js & Express API</span>
              </li>
              <li className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-sky-500" />
                <span>React + Vite & Tailwind CSS</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="/" className="hover:text-indigo-500 transition-colors">Home Overview</a>
              </li>
              <li>
                <a href="/generate" className="hover:text-indigo-500 transition-colors">Generate New Plan</a>
              </li>
              <li>
                <a href="/history" className="hover:text-indigo-500 transition-colors">Saved Calendars History</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SocialAI Content Calendar. Production-Ready Hackathon Release.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
