/**
 * Custom text splitting utility to replace GSAP SplitText.
 * This is used for Phase 3 animations to allow animating individual words or characters.
 * It wraps text in spans while maintaining accessibility.
 */

interface SplitOptions {
  type: 'words' | 'chars' | 'lines';
  wrapClass?: string;
}

/**
 * Splits text content of an HTML element into spans.
 * @param element The DOM element containing the text to split
 * @param options Configuration for splitting
 */
export function splitText(element: HTMLElement, options: SplitOptions): void {
  if (!element.textContent) return;

  const text = element.textContent.trim();
  const wrapClass = options.wrapClass || `split-${options.type}`;
  
  // Set aria-label to the full text on the parent for screen readers
  element.setAttribute('aria-label', text);
  
  // Create an inner wrapper that is hidden from screen readers
  const ariaHiddenWrapper = document.createElement('span');
  ariaHiddenWrapper.setAttribute('aria-hidden', 'true');
  
  let splitContent = '';

  if (options.type === 'words') {
    const words = text.split(/\s+/);
    splitContent = words
      .map((word) => `<span class="${wrapClass}" style="display: inline-block;">${word}</span>`)
      .join(' ');
  } else if (options.type === 'chars') {
    const chars = text.split('');
    splitContent = chars
      .map((char) => `<span class="${wrapClass}" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');
  } else if (options.type === 'lines') {
    // Basic line splitting by <br> tags if present, or just wrapping the whole thing if not.
    // Real line splitting based on layout is complex and outside the scope of a simple utility,
    // but we can handle manual line breaks.
    const lines = text.split(/\r?\n/);
    splitContent = lines
      .map((line) => `<span class="${wrapClass}" style="display: block;">${line}</span>`)
      .join('');
  }

  ariaHiddenWrapper.innerHTML = splitContent;
  element.innerHTML = '';
  element.appendChild(ariaHiddenWrapper);
}
