import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, Trash2, Eye, Loader2, Sparkles, AlertCircle, RefreshCw, Copy, Check, Terminal } from 'lucide-react';
import Toast from '../components/Toast';
import { getAllCalendarsAPI, deleteCalendarAPI } from '../services/api';

export default function History() {
  const navigate = useNavigate();

  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  const sqlCode = `create extension if not exists "pgcrypto";

create table if not exists calendars (
    id uuid primary key default gen_random_uuid(),
    business_name text not null,
    business_type text,
    product text,
    audience text,
    platform text,
    goal text,
    tone text,
    days integer,
    calendar jsonb,
    created_at timestamp default now()
);

-- Row Level Security policies for Supabase Anon Key access
alter table calendars enable row level security;
drop policy if exists "Public Read Access" on calendars;
create policy "Public Read Access" on calendars for select using (true);
drop policy if exists "Public Insert Access" on calendars;
create policy "Public Insert Access" on calendars for insert with check (true);
drop policy if exists "Public Delete Access" on calendars;
create policy "Public Delete Access" on calendars for delete using (true);`;

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    showToast('success', 'SQL script copied to clipboard!');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllCalendarsAPI();
      if (res.success && Array.isArray(res.data)) {
        setCalendars(res.data);
      } else {
        setError(res.error || 'Failed to fetch saved calendars.');
      }
    } catch (err) {
      console.error('History Fetch Error:', err);
      setError(err.response?.data?.error || err.message || 'Error connecting to Supabase database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this content calendar?')) return;

    setDeletingId(id);
    try {
      const res = await deleteCalendarAPI(id);
      if (res.success) {
        setCalendars((prev) => prev.filter((item) => item.id !== id));
        showToast('success', 'Calendar deleted successfully from Supabase!');
      } else {
        showToast('error', res.error || 'Failed to delete calendar.');
      }
    } catch (err) {
      console.error('Delete Error:', err);
      showToast('error', err.response?.data?.error || err.message || 'Error deleting calendar.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (item) => {
    navigate('/results', {
      state: {
        calendar: item.calendar || [],
        meta: {
          businessName: item.business_name,
          businessType: item.business_type,
          product: item.product,
          audience: item.audience,
          platform: item.platform,
          goal: item.goal,
          tone: item.tone,
          days: item.days,
        },
      },
    });
  };

  const isTableMissing = error.toLowerCase().includes('schema cache') || error.toLowerCase().includes('not find the table') || error.toLowerCase().includes('relation');

  // Filter & Search Logic
  const filteredCalendars = calendars.filter((item) => {
    const matchesSearch = item.business_name
      ? item.business_name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesPlatform =
      platformFilter === 'All'
        ? true
        : (item.platform || '').toLowerCase() === platformFilter.toLowerCase();
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-200 dark:border-purple-800 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Supabase Database Storage</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Saved Content Calendars
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage, search, and review all previous AI-generated social media campaigns.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Table Missing / Supabase Setup Prompt */}
      {isTableMissing && (
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Supabase Table `calendars` Needs to be Created</h3>
              <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                Supabase PostgreSQL requires creating the table using the SQL Editor in your dashboard.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">Quick Setup Instructions (1 Minute):</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Open your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="underline font-bold text-amber-600 dark:text-amber-400">Supabase Dashboard</a> and select project <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">qlqerzfwqvodvziwruhs</code>.</li>
              <li>Click <strong>SQL Editor</strong> on the left navigation sidebar.</li>
              <li>Click <strong>New Query</strong>, paste the code snippet below, and click <strong>Run</strong> (Ctrl + Enter).</li>
            </ol>
          </div>

          {/* SQL Block with Copy Button */}
          <div className="relative rounded-2xl bg-slate-950 p-4 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto">
            <button
              onClick={copySqlToClipboard}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold transition-colors"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied SQL' : 'Copy SQL'}</span>
            </button>
            <pre className="pr-24">{sqlCode}</pre>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      {!isTableMissing && (
        <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col sm:flex-row items-center gap-4">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Business Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium cursor-pointer"
            >
              <option value="All">All Platforms</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Facebook">Facebook</option>
              <option value="X">X (Twitter)</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>

        </div>
      )}

      {/* Content Area */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            Fetching saved calendars from Supabase...
          </p>
        </div>
      ) : error && !isTableMissing ? (
        <div className="p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h3 className="text-lg font-bold">Database Connection Warning</h3>
          <p className="text-sm max-w-md mx-auto">{error}</p>
        </div>
      ) : filteredCalendars.length === 0 && !isTableMissing ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {calendars.length === 0 ? 'No Saved Calendars Yet' : 'No Calendars Match Search Criteria'}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {calendars.length === 0
              ? 'Generate your first AI calendar and click Save to store it in Supabase.'
              : 'Try clearing your search term or platform filter.'}
          </p>
          {calendars.length === 0 && (
            <button
              onClick={() => navigate('/generate')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-500 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create New Strategy</span>
            </button>
          )}
        </div>
      ) : (
        /* History Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalendars.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {item.business_name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.business_type || 'General Business'}
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800 shrink-0">
                    {item.platform || 'Instagram'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-500">Days Planned:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.days || 7} Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-500">Tone:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.tone || 'Professional'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-500">Saved Date:</span>
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  onClick={() => handleView(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  disabled={deletingId === item.id}
                  className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer disabled:opacity-50"
                  title="Delete Calendar"
                >
                  {deletingId === item.id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
