/**
 * Safely sanitizes SVG strings to prevent XSS and malicious script execution
 * when rendering in canvas or preview.
 */

const BLOCKED_TAGS = [
  'script',
  'foreignobject',
  'iframe',
  'object',
  'embed',
  'applet',
  'link',
  'base',
  'form',
  'input',
  'button',
];

const DANGEROUS_ATTRIBUTES = [
  /^on[a-z]+/i, // onclick, onload, onerror, etc.
  /^javascript:/i,
  /^data:/i,
];

export function sanitizeSvg(rawSvg: string): { cleanSvg: string; isValid: boolean; error?: string } {
  if (!rawSvg || !rawSvg.trim()) {
    return { cleanSvg: '', isValid: false, error: 'SVG markup is empty.' };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawSvg, 'image/svg+xml');

    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      return {
        cleanSvg: '',
        isValid: false,
        error: parserError.textContent || 'Malformed SVG XML syntax.',
      };
    }

    const svgElement = doc.documentElement;
    if (svgElement.nodeName.toLowerCase() !== 'svg') {
      return { cleanSvg: '', isValid: false, error: 'Root element must be <svg>.' };
    }

    // Recursively clean elements
    const cleanNode = (node: Element) => {
      // Remove blocked tags
      const tagName = node.tagName.toLowerCase();
      if (BLOCKED_TAGS.includes(tagName)) {
        node.remove();
        return;
      }

      // Remove dangerous attributes
      const attrs = Array.from(node.attributes);
      for (const attr of attrs) {
        const name = attr.name.toLowerCase();
        const value = attr.value.trim().toLowerCase();

        if (DANGEROUS_ATTRIBUTES.some((regex) => regex.test(name) || regex.test(value))) {
          node.removeAttribute(attr.name);
        }

        // Strip javascript: from href or xlink:href
        if ((name === 'href' || name === 'xlink:href') && value.startsWith('javascript:')) {
          node.removeAttribute(attr.name);
        }
      }

      // Clean child elements
      const children = Array.from(node.children);
      for (const child of children) {
        cleanNode(child);
      }
    };

    cleanNode(svgElement);

    // Ensure valid viewBox or width/height
    if (!svgElement.getAttribute('viewBox')) {
      const width = svgElement.getAttribute('width') || '100';
      const height = svgElement.getAttribute('height') || '100';
      svgElement.setAttribute('viewBox', `0 0 ${parseFloat(width) || 100} ${parseFloat(height) || 100}`);
    }

    const serializer = new XMLSerializer();
    const cleanSvg = serializer.serializeToString(svgElement);

    return { cleanSvg, isValid: true };
  } catch (err: any) {
    return { cleanSvg: '', isValid: false, error: err.message || 'Failed to parse SVG' };
  }
}

