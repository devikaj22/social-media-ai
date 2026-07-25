import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Save, RefreshCw, Download, FileText, Sparkles, Check, ArrowLeft, Building2, Globe, CalendarDays, Sliders, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import CalendarCard from '../components/CalendarCard';
import Toast from '../components/Toast';
import { saveCalendarAPI } from '../services/api';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const calendarData = location.state?.calendar || [];
  const meta = location.state?.meta || {};

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async () => {
    if (saved || saving) return;
    setSaving(true);

    try {
      const payload = {
        businessName: meta.businessName || 'Business',
        businessType: meta.businessType || '',
        product: meta.product || '',
        audience: meta.audience || '',
        platform: meta.platform || 'Instagram',
        goal: meta.goal || '',
        tone: meta.tone || 'Professional',
        days: meta.days || calendarData.length,
        calendar: calendarData,
      };

      const res = await saveCalendarAPI(payload);

      if (res.success) {
        setSaved(true);
        showToast('success', 'Calendar saved successfully to Supabase database!');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        const errStr = res.error || '';
        if (errStr.toLowerCase().includes('schema cache') || errStr.toLowerCase().includes('table')) {
          showToast('error', 'Table `calendars` missing in Supabase! Run the SQL script from History page.');
        } else {
          showToast('error', errStr || 'Failed to save calendar to Supabase.');
        }
      }
    } catch (err) {
      console.error('Save Error:', err);
      const errMsg = err.response?.data?.error || err.message || '';
      if (errMsg.toLowerCase().includes('schema cache') || errMsg.toLowerCase().includes('table')) {
        showToast('error', 'Table `calendars` missing in Supabase! Please execute the SQL setup script in your Supabase SQL Editor.');
      } else {
        showToast('error', errMsg || 'Error saving to Supabase.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ meta, calendar: calendarData }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${meta.businessName || 'calendar'}_social_strategy.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('info', 'JSON Strategy exported successfully!');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  if (!calendarData || calendarData.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Content Calendar Loaded</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Please generate a content calendar first using our AI tool.
        </p>
        <Link
          to="/generate"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Go to Generator</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Popup */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Banner / Actions Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none no-print">
        
        <div className="space-y-2">
          <button
            onClick={() => navigate('/generate')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Form
          </button>
          
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {meta.businessName || 'Your Business'} Calendar
            </h1>
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
              {calendarData.length} Days Strategy
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              {meta.platform}
            </span>
            <span className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              {meta.tone} Tone
            </span>
            {meta.goal && (
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                {meta.goal}
              </span>
            )}
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <button
            onClick={handleSave}
            disabled={saved || saving}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved to Supabase</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Calendar'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => navigate('/generate')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate Again</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title="Export JSON"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrintPDF}
            className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title="Print / Export PDF"
          >
            <FileText className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calendarData.map((dayItem, index) => (
          <CalendarCard
            key={dayItem.day || index}
            dayData={dayItem}
            onShowToast={showToast}
          />
        ))}
      </div>

    </div>
  );
}
