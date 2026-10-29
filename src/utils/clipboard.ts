/**
 * Safe clipboard helper with a modern API attempt and several browser fallbacks.
 * Keeps working on localhost, HTTPS, older browsers, and devices where the
 * Clipboard API is restricted or unavailable.
 */
export async function copyToClipboard(
  text: string,
  options: {
    fallbackMessage?: string;
    silent?: boolean;
  } = {},
): Promise<boolean> {
  if (!text) return false;

  const { fallbackMessage = 'Kodni nusxalash uchun Ctrl+C (yoki Cmd+C) bosing:', silent = false } = options;

  if (navigator?.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('[copyToClipboard] navigator.clipboard.writeText failed; using fallback:', error);
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    textArea.style.zIndex = '-1';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    const copied = document.execCommand?.('copy') ?? false;
    document.body.removeChild(textArea);

    if (copied) return true;
  } catch (error) {
    console.error('[copyToClipboard] execCommand fallback failed:', error);
  }

  if (!silent) {
    try {
      window.prompt(fallbackMessage, text);
      return true;
    } catch {
      return false;
    }
  }

  return false;
}

