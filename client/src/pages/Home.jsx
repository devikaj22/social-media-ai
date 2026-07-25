import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Zap, Database, ArrowRight, CheckCircle2, ShieldCheck, Share2, Target, BarChart3 } from 'lucide-react';
import { getAllCalendarsAPI } from '../services/api';

export default function Home() {
  const [stats, setStats] = useState({ count: 0, recent: [] });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await getAllCalendarsAPI();
        if (res.success && Array.isArray(res.data)) {
          setStats({
            count: res.data.length,
            recent: res.data.slice(0, 3)
          });
        }
      } catch (err) {
        console.warn('Could not fetch home stats:', err.message);
      } finally {
        setLoadingStats(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse-slow"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
            <span>Powered by Google Gemini 2.5 Flash & Supabase PostgreSQL</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Automate Your <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
              Social Media Strategy
            </span>{' '}
            with AI
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Generate 7 to 30 days of hyper-customized post ideas, captions, 5 high-ranking hashtags, best posting times, and engagement predictions in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/generate"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate Content Calendar</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>

            <Link
              to="/history"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-base transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5 text-indigo-500" />
              <span>View Saved Calendars</span>
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Instagram, LinkedIn, X & YouTube
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Zero Hardcoded Dummy Data
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Instant Supabase Database Sync
            </span>
          </div>

        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Enterprise Feature Suite
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need for Viral Social Media Campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-indigo-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Gemini 2.5 Flash AI Engine
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Dynamically tailors post concepts, captions, 5 targeted hashtags, CTAs, and engagement forecasts built specifically for your niche and target audience.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-purple-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Database className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Supabase PostgreSQL Vault
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Store, search, filter, and delete your historical content calendars effortlessly with instant PostgreSQL persistence and JSONB schema flexibility.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-pink-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 dark:bg-pink-950/80 border border-pink-200 dark:border-pink-800 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6 group-hover:scale-110 transition-transform">
              <Share2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              One-Click Copy & PDF Exports
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Copy captions and hashtags straight to your clipboard, or export full monthly calendar documents for team collaboration and client delivery.
            </p>
          </div>

        </div>
      </section>

      {/* Recent Activity / Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 text-white shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Live Dashboard Stats</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {loadingStats ? 'Loading Vault Stats...' : `${stats.count} Calendars Generated & Saved`}
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Ready to transform your brand content workflow? Create a tailored 7-day to 30-day posting calendar now.
              </p>
            </div>

            <Link
              to="/generate"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-sm hover:bg-slate-100 transition-colors shadow-lg shadow-white/10 shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Start Generator</span>
            </Link>
          </div>

          {/* Preview cards if any */}
          {stats.recent.length > 0 && (
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
              {stats.recent.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <div className="font-bold text-indigo-300 truncate">{item.business_name}</div>
                  <div className="text-slate-400 flex items-center justify-between">
                    <span>{item.platform}</span>
                    <span>{item.days} Days</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
