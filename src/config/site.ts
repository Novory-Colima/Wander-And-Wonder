import type { NavLink, LanguageConfig, Language } from '@/types';

/** Primary navigation links */
export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Historias', href: '#around-the-world' },
  { label: 'Experiencias', href: '#experiences' },
  { label: 'Destinos', href: '#destinations' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Contacto', href: '#contact' },
] as const;

/** Supported languages */
export const LANGUAGES: readonly LanguageConfig[] = [
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
] as const;

/** Default language */
export const DEFAULT_LANGUAGE: Language = 'es';

/** CTA button text (never commercial — per CONTENT_GUIDE.md) */
export const CTA_TEXT = 'Comienza tu viaje';
export const CTA_TEXT_EN = 'Start your journey';

/** Navbar height for scroll calculations */
export const NAVBAR_HEIGHT = 80;

/** Maximum content width */
export const MAX_CONTENT_WIDTH = 1440;

/** Site metadata */
export const SITE_CONFIG = {
  name: 'Wander & Wonder',
  tagline: 'Collect stories you\'ll tell forever.',
  taglineEs: 'Colecciona historias que contarás para siempre.',
  url: 'https://wanderandwonder.com',
  locale: 'es',
} as const;
