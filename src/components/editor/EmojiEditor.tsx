import React, { useState } from 'react';
import { EditorState } from '../../types/favicon';
import { Search, History, Sparkles } from 'lucide-react';

interface EmojiEditorProps {
  state: EditorState;
  onChange: (updates: Partial<EditorState>) => void;
}

const EMOJI_CATEGORIES = [
  {
    name: 'Tech & Code',
    emojis: ['🚀', '⚡', '💻', '🔥', '✨', '⚙️', '🤖', '💡', '💎', '🎯', '📦', '🔑', '🛡️', '📊', '🌐', '📡', '📱', '🔋'],
  },
  {
    name: 'Smileys & People',
    emojis: ['😎', '🤩', '🥳', '🤓', '🤖', '👻', '🤠', '👽', '👾', '👑', '🧑‍💻', '🧙‍♂️', '🦸', '🧙‍♀️', '🙌', '✌️', '🤟', '🤙'],
  },
  {
    name: 'Symbols & Shapes',
    emojis: ['⭐', '🌟', '💖', '🔥', '⚡', '💥', '✨', '💫', '☀️', '🌙', '🪐', '🔮', '🎉', '🏆', '🥇', '💯', '🌈', '☘️'],
  },
  {
    name: 'Objects & Tools',
    emojis: ['🎨', '🖋️', '🧪', '🧭', '🔨', '🛠️', '🧲', '🔬', '🔭', '📡', '📷', '🎮', '🕹️', '🏷️', '📌', '💡', '🔔', '📢'],
  },
  {
    name: 'Nature & Animals',
    emojis: ['🦊', '🦁', '🐯', '🦅', '🦉', '🐺', '🦄', '🐲', '🌿', '🌱', '🌸', '🌊', '🌋', '🌲', '🍀', '🍁', '⚡', '🔥'],
  },
  {
    name: 'Food & Drinks',
    emojis: ['☕', '🍵', '🍕', '🍔', '🥑', '🍎', '🍋', '🍇', '🍩', '🍪', '🧁', '🍦', '🍣', '🌮', '🍷', '🥂', '🍿', '🧁'],
  },
];

export const EmojiEditor: React.FC<EmojiEditorProps> = ({ state, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  const [recentEmojis, setRecentEmojis] = useState<string[]>(['🚀', '✨', '⚡', '💎', '🔥']);

  const handleSelectEmoji = (emoji: string) => {
    onChange({ emoji });
    setRecentEmojis((prev) => {
      const filtered = prev.filter((e) => e !== emoji);
      return [emoji, ...filtered].slice(0, 8);
    });
  };

  const allEmojis = EMOJI_CATEGORIES.flatMap((c) => c.emojis);
  const displayEmojis = searchTerm.trim()
    ? allEmojis.filter((e) => e.includes(searchTerm.trim()))
    : EMOJI_CATEGORIES[activeCategory].emojis;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search emojis or enter custom emoji..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
        />
      </div>

      {/* Recents Bar */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-1.5">
          <History className="w-3.5 h-3.5" />
          <span>Recently Used</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {recentEmojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleSelectEmoji(emoji)}
              className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center transition-all ${
                state.emoji === emoji
                  ? 'bg-brand-100 dark:bg-brand-950 border-2 border-brand-500 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 hover:scale-105'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      {!searchTerm && (
        <div className="flex gap-1 overflow-x-auto pb-1 border-b border-slate-100 dark:border-slate-800 text-xs">
          {EMOJI_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(idx)}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                activeCategory === idx
                  ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Emoji Grid */}
      <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
        {displayEmojis.map((emoji, index) => (
          <button
            key={`${emoji}-${index}`}
            type="button"
            onClick={() => handleSelectEmoji(emoji)}
            className={`w-10 h-10 text-xl rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
              state.emoji === emoji
                ? 'bg-brand-100 dark:bg-brand-950 border-2 border-brand-500 shadow-sm'
                : 'bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-xs'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Emoji Size Scale */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Emoji Scale
          </label>
          <span className="text-xs font-mono text-slate-500">{state.emojiScale || 75}%</span>
        </div>
        <input
          type="range"
          min={30}
          max={100}
          value={state.emojiScale || 75}
          onChange={(e) => onChange({ emojiScale: Number(e.target.value) })}
          className="w-full accent-brand-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
};
