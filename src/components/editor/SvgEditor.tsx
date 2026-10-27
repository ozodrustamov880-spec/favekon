import React, { useState, useRef } from 'react';
import { EditorState } from '../../types/favicon';
import { sanitizeSvg } from '../../utils/svgSanitizer';
import { Code, UploadCloud, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface SvgEditorProps {
  state: EditorState;
  onChange: (updates: Partial<EditorState>) => void;
}

const DEFAULT_SAMPLE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
</svg>`;

export const SvgEditor: React.FC<SvgEditorProps> = ({ state, onChange }) => {
  const [validationStatus, setValidationStatus] = useState<{ isValid: boolean; message?: string }>({
    isValid: true,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSvgChange = (code: string) => {
    const { isValid, cleanSvg, error } = sanitizeSvg(code);
    if (isValid) {
      setValidationStatus({ isValid: true });
      onChange({ svgCode: cleanSvg });
    } else {
      setValidationStatus({ isValid: false, message: error });
      onChange({ svgCode: code });
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.svg') && file.type !== 'image/svg+xml') {
      setValidationStatus({ isValid: false, message: 'Please select a valid .svg vector file.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleSvgChange(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      {/* Upload button or paste */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <UploadCloud className="w-4 h-4 text-brand-500" />
          <span>Upload .SVG File</span>
        </button>

        <button
          type="button"
          onClick={() => handleSvgChange(DEFAULT_SAMPLE_SVG)}
          className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 text-xs font-medium text-slate-600 dark:text-slate-400"
        >
          Insert Sample
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".svg,image/svg+xml"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
          className="hidden"
        />
      </div>

      {/* SVG Code Input Area */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-brand-500" />
            <span>SVG Vector Markup</span>
          </label>

          {validationStatus.isValid ? (
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Sanitized & Safe
            </span>
          ) : (
            <span className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
              <AlertTriangle className="w-3 h-3" /> Syntax Error
            </span>
          )}
        </div>

        <textarea
          rows={6}
          value={state.svgCode}
          onChange={(e) => handleSvgChange(e.target.value)}
          placeholder="<svg viewBox='0 0 24 24' ...> ... </svg>"
          className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 font-mono text-xs text-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-inner"
        />
      </div>

      {/* Error message */}
      {!validationStatus.isValid && validationStatus.message && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{validationStatus.message}</span>
        </div>
      )}

      {/* Security note */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
        🛡️ <strong>Safety Sandbox:</strong> All scripts, foreign objects, and event handlers are automatically stripped to guarantee safe client-side canvas rendering.
      </div>
    </div>
  );
};
