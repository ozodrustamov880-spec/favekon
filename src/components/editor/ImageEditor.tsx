import React, { useRef, useState } from 'react';
import { EditorState } from '../../types/favicon';
import { UploadCloud, Image as ImageIcon, RotateCw, ZoomIn, Move, Trash2, AlertCircle } from 'lucide-react';

interface ImageEditorProps {
  state: EditorState;
  onChange: (updates: Partial<EditorState>) => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ state, onChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    setErrorMsg(null);
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];

    if (!validTypes.includes(file.type)) {
      setErrorMsg('Unsupported file type. Please upload a PNG, JPG, JPEG, WebP, or SVG file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds 10MB limit. Please upload a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange({
          imageSrc: e.target.result as string,
          imageScale: 1.0,
          imageRotation: 0,
          imageOffsetX: 0,
          imageOffsetY: 0,
        });
      }
    };
    reader.onerror = () => {
      setErrorMsg('Error reading the selected image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <div className="space-y-5">
      {/* Upload Zone */}
      {!state.imageSrc ? (
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:border-brand-400 dark:hover:border-brand-600'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3 shadow-inner">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Drag & drop your logo or image here
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Supports PNG, JPG, JPEG, WebP (up to 10MB)
            </div>
            <button
              type="button"
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 shadow-xs"
            >
              Browse Files
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Active Image Thumbnail & Remove */}
          <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl checkerboard overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1">
                <img
                  src={state.imageSrc}
                  alt="Uploaded source"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Image Loaded
                </div>
                <div className="text-[11px] text-slate-500">
                  Adjust positioning and scaling below
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange({ imageSrc: null })}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                title="Remove image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />
          </div>

          {/* Fit Mode */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
              Fit Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['contain', 'cover', 'fill'] as const).map((fit) => (
                <button
                  key={fit}
                  type="button"
                  onClick={() => onChange({ imageFit: fit })}
                  className={`py-1.5 text-xs font-semibold rounded-xl border capitalize transition-all ${
                    state.imageFit === fit
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* Scale / Zoom Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Zoom Scale</span>
              </label>
              <span className="text-xs font-mono text-slate-500">{state.imageScale.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={2.5}
              step={0.05}
              value={state.imageScale}
              onChange={(e) => onChange({ imageScale: Number(e.target.value) })}
              className="w-full accent-brand-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Rotation Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rotation</span>
              </label>
              <span className="text-xs font-mono text-slate-500">{state.imageRotation}°</span>
            </div>
            <input
              type="range"
              min={-180}
              max={180}
              step={5}
              value={state.imageRotation}
              onChange={(e) => onChange({ imageRotation: Number(e.target.value) })}
              className="w-full accent-brand-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Position Offsets (X & Y) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-slate-500">Offset X</span>
                <span className="text-xs font-mono text-slate-500">{state.imageOffsetX}%</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={state.imageOffsetX}
                onChange={(e) => onChange({ imageOffsetX: Number(e.target.value) })}
                className="w-full accent-brand-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-slate-500">Offset Y</span>
                <span className="text-xs font-mono text-slate-500">{state.imageOffsetY}%</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={state.imageOffsetY}
                onChange={(e) => onChange({ imageOffsetY: Number(e.target.value) })}
                className="w-full accent-brand-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Error notification */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};

