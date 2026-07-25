import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, Target, Building2, ShoppingBag, Users, Globe, Sliders, CalendarDays, AlertCircle } from 'lucide-react';
import { generateCalendarAPI } from '../services/api';

export default function Generate({ onGenerated }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    product: '',
    audience: '',
    platform: 'Instagram',
    goal: 'Increase Brand Awareness & Engagement',
    tone: 'Professional',
    days: 7,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'days' ? parseInt(value, 10) || 7 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.businessName.trim()) {
      setError('Please provide your Business Name.');
      return;
    }

    setLoading(true);

    try {
      const response = await generateCalendarAPI(formData);
      if (response.success && response.data) {
        // Pass data upward or navigate to results state
        if (onGenerated) {
          onGenerated({
            calendar: response.data,
            meta: formData,
          });
        }
        navigate('/results', {
          state: {
            calendar: response.data,
            meta: formData,
          },
        });
      } else {
        setError(response.error || 'Failed to generate content calendar.');
      }
    } catch (err) {
      console.error('Generation Error:', err);
      const msg = err.response?.data?.error || err.message || 'Error generating AI calendar. Check server logs and API key.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Gemini 2.5 Flash Strategy Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Generate Content Calendar
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Fill in your campaign criteria to receive a personalized multi-day social media schedule.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
          <div className="flex-1 font-medium">{error}</div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Business Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-500" />
              Business Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. Acme Eco Roasters"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm font-medium"
            />
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-purple-500" />
              Business Type
            </label>
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              placeholder="e.g. Specialty Coffee Shop & SaaS"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm font-medium"
            />
          </div>

          {/* Product / Service */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-pink-500" />
              Product / Service
            </label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="e.g. Organic Coffee Beans & Monthly Subscription"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm font-medium"
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-500" />
              Target Audience
            </label>
            <input
              type="text"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              placeholder="e.g. Coffee Lovers, Remote Workers Gen Z & Millennials"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm font-medium"
            />
          </div>

          {/* Platform Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-sky-500" />
              Social Media Platform
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm font-medium cursor-pointer"
            >
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Facebook">Facebook</option>
              <option value="X">X (Twitter)</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>

          {/* Campaign Goal */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-amber-500" />
              Campaign Goal
            </label>
            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g. Drive Website Sales & Lead Generation"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm font-medium"
            />
          </div>

          {/* Tone Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-500" />
              Tone of Voice
            </label>
            <select
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm font-medium cursor-pointer"
            >
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
              <option value="Funny">Funny</option>
              <option value="Educational">Educational</option>
              <option value="Promotional">Promotional</option>
            </select>
          </div>

          {/* Number of Days */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-rose-500" />
              Number of Days
            </label>
            <select
              name="days"
              value={formData.days}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors text-sm font-medium cursor-pointer"
            >
              <option value={7}>7 Days (1 Week Strategy)</option>
              <option value={14}>14 Days (2 Weeks Strategy)</option>
              <option value={30}>30 Days (Full Month Campaign)</option>
            </select>
          </div>

        </div>

        {/* Submit Button & Loading State */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-60 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <span>Generating AI Strategy with Gemini 2.5 Flash...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate {formData.days}-Day Content Calendar</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
