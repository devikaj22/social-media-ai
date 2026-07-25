import React, { useState } from 'react';
import { Copy, Check, Clock, TrendingUp, Sparkles, Hash, MessageSquare, Lightbulb } from 'lucide-react';

export default function CalendarCard({ dayData, onShowToast }) {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const {
    day = 1,
    postIdea = '',
    caption = '',
    hashtags = [],
    bestTime = '',
    cta = '',
    engagementPrediction = 'Medium'
  } = dayData || {};

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    if (onShowToast) onShowToast('success', `Day ${day} caption copied to clipboard!`);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleCopyHashtags = () => {
    const hashtagStr = Array.isArray(hashtags) ? hashtags.join(' ') : hashtags;
    navigator.clipboard.writeText(hashtagStr);
    setCopiedHashtags(true);
    if (onShowToast) onShowToast('success', `Day ${day} hashtags copied to clipboard!`);
    setTimeout(() => setCopiedHashtags(false), 2000);
  };

  // Engagement Prediction Badge styling
  const predictionBadge = () => {
    const level = (engagementPrediction || 'Medium').toLowerCase();
    if (level.includes('high')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <TrendingUp className="w-3.5 h-3.5" />
          High Engagement
        </span>
      );
    }
    if (level.includes('low')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <TrendingUp className="w-3.5 h-3.5" />
          Low Engagement
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
        <TrendingUp className="w-3.5 h-3.5" />
        Medium Engagement
      </span>
    );
  };

  return (
    <div className="print-card rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group">
      <div>
        
        {/* Card Header: Day & Prediction Badge */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-indigo-500/20">
              D{day}
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              Day {day} Content
            </span>
          </div>
          {predictionBadge()}
        </div>

        {/* Post Idea */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Post Concept / Idea</span>
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
            {postIdea}
          </p>
        </div>

        {/* Caption */}
        <div className="mb-4 bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Caption
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
            {caption}
          </p>
        </div>

        {/* Hashtags */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            <Hash className="w-3 h-3" />
            <span>Hashtags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Array.isArray(hashtags) && hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-slate-200 dark:border-slate-700"
              >
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        </div>

        {/* Meta Info: Best Time & CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4 pt-3 border-t border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span><strong className="text-slate-700 dark:text-slate-200">Best Time:</strong> {bestTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span><strong className="text-slate-700 dark:text-slate-200">CTA:</strong> {cta}</span>
          </div>
        </div>

      </div>

      {/* Card Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 no-print">
        <button
          onClick={handleCopyCaption}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
        >
          {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedCaption ? 'Copied' : 'Copy Caption'}</span>
        </button>

        <button
          onClick={handleCopyHashtags}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors"
        >
          {copiedHashtags ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Hash className="w-3.5 h-3.5" />}
          <span>{copiedHashtags ? 'Copied' : 'Copy Tags'}</span>
        </button>
      </div>

    </div>
  );
}
