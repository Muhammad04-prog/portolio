import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ru', 'en', 'tj'],

  // Used when no locale matches
  defaultLocale: 'ru',

  // Locale prefix is always part of the URL (e.g. /ru/projects)
  localePrefix: 'always'
});

// Localized navigation helpers
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
