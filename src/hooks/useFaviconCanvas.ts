import { useState, useEffect, useRef, useCallback } from 'react';
import { EditorState, GeneratedIcon } from '../types/favicon';
import { convertPngBlobsToIco } from '../utils/icoEncoder';
import { sanitizeSvg } from '../utils/svgSanitizer';

const EXPORT_SIZES = [
  { size: 16, name: 'favicon-16x16.png', desc: 'Desktop browser tab', purpose: 'Standard browser tab icon' },
  { size: 32, name: 'favicon-32x32.png', desc: 'Desktop browser & taskbar', purpose: 'High-DPI browser tab & bookmark' },
  { size: 48, name: 'favicon-48x48.png', desc: 'Windows shortcut', purpose: 'Windows desktop shortcut' },
  { size: 180, name: 'apple-touch-icon.png', desc: 'Apple iOS touch icon', purpose: 'iPhone & iPad home screen bookmark' },
  { size: 192, name: 'android-chrome-192x192.png', desc: 'Android Chrome PWA', purpose: 'Android home screen web app' },
  { size: 512, name: 'android-chrome-512x512.png', desc: 'Android PWA Splash', purpose: 'High-res splash screen & store listing' },
];

export function useFaviconCanvas(state: EditorState) {
  const [masterDataUrl, setMasterDataUrl] = useState<string>('');
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [icoBlob, setIcoBlob] = useState<Blob | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(true);
  const [renderError, setRenderError] = useState<string | null>(null);

  const loadedImageRef = useRef<HTMLImageElement | null>(null);
  const loadedSvgImgRef = useRef<HTMLImageElement | null>(null);

  // Load uploaded image if needed
  useEffect(() => {
    if (state.tool === 'image' && state.imageSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        loadedImageRef.current = img;
        renderAll();
      };
      img.onerror = () => {
        loadedImageRef.current = null;
        setRenderError('Could not load image source.');
      };
      img.src = state.imageSrc;
    } else {
      loadedImageRef.current = null;
    }
  }, [state.tool, state.imageSrc]);

  // Load SVG image if tool is SVG
  useEffect(() => {
    if (state.tool === 'svg' && state.svgCode) {
      const { cleanSvg, isValid } = sanitizeSvg(state.svgCode);
      if (isValid) {
        const blob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          loadedSvgImgRef.current = img;
          URL.revokeObjectURL(url);
          renderAll();
        };
        img.onerror = () => {
          loadedSvgImgRef.current = null;
          URL.revokeObjectURL(url);
        };
        img.src = url;
      }
    } else {
      loadedSvgImgRef.current = null;
    }
  }, [state.tool, state.svgCode]);

  // Helper to draw the shape path
  const createShapePath = (ctx: CanvasRenderingContext2D, size: number) => {
    const pad = (state.padding / 100) * (size / 2);
    const x = pad;
    const y = pad;
    const w = size - pad * 2;
    const h = size - pad * 2;

    ctx.beginPath();
    if (state.shape === 'circle') {
      const radius = Math.min(w, h) / 2;
      ctx.arc(x + w / 2, y + h / 2, radius, 0, Math.PI * 2);
    } else if (state.shape === 'rounded') {
      const radius = Math.min(w, h) * (state.borderRadius / 100);
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, radius);
      } else {
        // Fallback for older browsers
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
      }
    } else if (state.shape === 'squircle') {
      // Smooth iOS squircle approximation
      const r = Math.min(w, h) * 0.28;
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
    } else {
      // Square
      ctx.rect(x, y, w, h);
    }
    ctx.closePath();
  };

  // Render on a single canvas context
  const drawIcon = useCallback(
    (canvas: HTMLCanvasElement, size: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = size;
      canvas.height = size;
      ctx.clearRect(0, 0, size, size);

      const scaleRatio = size / 512;

      ctx.save();

      // Setup drop shadow if enabled and not transparent
      if (state.shadow && state.backgroundType !== 'transparent') {
        ctx.shadowColor = state.shadowColor || 'rgba(0,0,0,0.25)';
        ctx.shadowBlur = (state.shadowBlur || 16) * scaleRatio;
        ctx.shadowOffsetY = 6 * scaleRatio;
      }

      // Draw background shape
      createShapePath(ctx, size);

      if (state.backgroundType === 'solid') {
        ctx.fillStyle = state.bgColor;
        ctx.fill();
      } else if (state.backgroundType === 'gradient') {
        let grad: CanvasGradient;
        if (state.bgGradientDirection === 'to-r') {
          grad = ctx.createLinearGradient(0, 0, size, 0);
        } else if (state.bgGradientDirection === 'to-b') {
          grad = ctx.createLinearGradient(0, 0, 0, size);
        } else if (state.bgGradientDirection === 'to-tr') {
          grad = ctx.createLinearGradient(0, size, size, 0);
        } else if (state.bgGradientDirection === 'radial') {
          grad = ctx.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size * 0.7);
        } else {
          // to-br
          grad = ctx.createLinearGradient(0, 0, size, size);
        }
        grad.addColorStop(0, state.bgGradientFrom);
        grad.addColorStop(1, state.bgGradientTo);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw border if set
      if (state.borderWidth > 0 && state.backgroundType !== 'transparent') {
        ctx.strokeStyle = state.borderColor;
        ctx.lineWidth = Math.max(1, state.borderWidth * scaleRatio);
        ctx.stroke();
      }

      // Turn off shadow before clipping and drawing content
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Clip content inside shape
      ctx.clip();

      // Draw Tool-specific content
      if (state.tool === 'text') {
        const text = state.text || 'IF';
        const fontSizePx = Math.round((state.fontSize / 100) * size);
        
        ctx.fillStyle = state.textColor;
        ctx.font = `${state.fontWeight} ${fontSizePx}px "${state.fontFamily}", system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (state.textShadow) {
          ctx.shadowColor = 'rgba(0,0,0,0.3)';
          ctx.shadowBlur = 6 * scaleRatio;
          ctx.shadowOffsetY = 2 * scaleRatio;
        }

        // Center calculation
        const centerX = size / 2;
        // Optical vertical center adjustment
        const centerY = size / 2 + (size * 0.02);

        ctx.fillText(text, centerX, centerY);
      } else if (state.tool === 'image' && loadedImageRef.current) {
        const img = loadedImageRef.current;
        ctx.save();
        ctx.translate(size / 2 + (state.imageOffsetX / 100) * (size / 2), size / 2 + (state.imageOffsetY / 100) * (size / 2));
        ctx.rotate((state.imageRotation * Math.PI) / 180);
        ctx.scale(state.imageScale, state.imageScale);

        let drawW = size;
        let drawH = size;
        const imgAspect = img.width / img.height;

        if (state.imageFit === 'contain') {
          if (imgAspect > 1) {
            drawW = size;
            drawH = size / imgAspect;
          } else {
            drawH = size;
            drawW = size * imgAspect;
          }
        } else if (state.imageFit === 'cover') {
          if (imgAspect > 1) {
            drawH = size;
            drawW = size * imgAspect;
          } else {
            drawW = size;
            drawH = size / imgAspect;
          }
        }

        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
      } else if (state.tool === 'emoji') {
        const emoji = state.emoji || '🚀';
        const emojiSize = Math.round(((state.emojiScale || 75) / 100) * size);
        ctx.font = `${emojiSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, size / 2, size / 2 + size * 0.04);
      } else if (state.tool === 'svg' && loadedSvgImgRef.current) {
        const svgImg = loadedSvgImgRef.current;
        const pad = (state.padding / 100) * size;
        const drawSize = size - pad * 2;
        ctx.drawImage(svgImg, pad, pad, drawSize, drawSize);
      }

      ctx.restore();
    },
    [state]
  );

  // Render all sizes and pack ICO
  const renderAll = useCallback(async () => {
    setIsRendering(true);
    setRenderError(null);

    try {
      const generatedList: GeneratedIcon[] = [];
      const icoSizes: { size: number; blob: Blob }[] = [];

      for (const item of EXPORT_SIZES) {
        const canvas = document.createElement('canvas');
        drawIcon(canvas, item.size);

        const dataUrl = canvas.toDataURL('image/png');
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error(`Failed to convert ${item.size} to blob`));
          }, 'image/png');
        });

        generatedList.push({
          size: item.size,
          name: item.name,
          dataUrl,
          blob,
          description: item.desc,
          purpose: item.purpose,
        });

        // For ICO, pack 16, 32, and 48
        if (item.size === 16 || item.size === 32 || item.size === 48) {
          icoSizes.push({ size: item.size, blob });
        }
      }

      // Set 512 master dataUrl for preview
      const masterIcon = generatedList.find((i) => i.size === 512);
      if (masterIcon) {
        setMasterDataUrl(masterIcon.dataUrl);
      }

      setIcons(generatedList);

      // Generate multi-resolution ICO Blob
      const ico = await convertPngBlobsToIco(icoSizes);
      setIcoBlob(ico);
    } catch (err: any) {
      console.error('Error rendering favicons:', err);
      setRenderError(err.message || 'Error generating icons');
    } finally {
      setIsRendering(false);
    }
  }, [drawIcon]);

  // Re-render whenever state changes
  useEffect(() => {
    // Ensure fonts are loaded if possible
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        renderAll();
      });
    } else {
      renderAll();
    }
  }, [renderAll]);

  return {
    masterDataUrl,
    icons,
    icoBlob,
    isRendering,
    renderError,
    refreshRender: renderAll,
  };
}

