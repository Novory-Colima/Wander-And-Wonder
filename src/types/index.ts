/** Navigation link definition */
export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
}

/** Supported languages */
export type Language = 'es' | 'en' | 'fr' | 'it' | 'pt' | 'de';

/** Language configuration */
export interface LanguageConfig {
  readonly code: Language;
  readonly label: string;
  readonly nativeLabel: string;
}

/** Page metadata for SEO */
export interface PageMeta {
  readonly title: string;
  readonly description: string;
  readonly canonicalUrl?: string;
  readonly ogImage?: string;
}

/** Destination data */
export interface Destination {
  readonly id: string;
  readonly country: string;
  readonly description: string;
  readonly duration: string;
  readonly season: string;
  readonly image: string;
  readonly alt: string;
}

/** Experience data */
export interface Experience {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: ExperienceCategory;
  readonly image: string;
  readonly alt: string;
}

/** Experience categories */
export type ExperienceCategory =
  | 'adventure'
  | 'culture'
  | 'nature'
  | 'luxury'
  | 'food'
  | 'road-trips';

/** Story/Memory data */
export interface Story {
  readonly id: string;
  readonly location: string;
  readonly quote: string;
  readonly author: string;
  readonly date: string;
  readonly image: string;
  readonly alt: string;
}

/** Statistic item */
export interface Statistic {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}
