export interface LocalizedString {
  tj: string;
  ru: string;
  en: string;
}

export interface Project {
  slug: string;
  title: LocalizedString;
  tagline: LocalizedString;
  category: LocalizedString;
  tags: string[];
  metrics: string; // e.g., "Prisma 6 · PostgreSQL · 3-month build"
  problem: LocalizedString;
  solution: LocalizedString;
  result: LocalizedString;
  link?: string;
  image: string; // generated preview image or Picsum fallback
}

export type Locale = "tj" | "ru" | "en";
