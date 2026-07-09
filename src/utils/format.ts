/**
 * Utility functions.
 * Pure functions only — never UI, never DOM manipulation, never side effects.
 * Per IMPLEMENTATION_01_FOUNDATION.md.
 */

/** Format a date string for editorial display */
export function formatEditorialDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
  });
}

/** Generate a CSS class list from conditional classes */
export function cx(
  ...classes: Array<string | undefined | null | false>
): string {
  return classes.filter(Boolean).join(' ');
}
