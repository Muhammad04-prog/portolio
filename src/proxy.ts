import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;
export const proxy = intlMiddleware;

export const config = {
  // Match all pathnames except for those starting with:
  // - _next (Next.js internal files)
  // - api (API endpoints)
  // - static assets containing file extensions (e.g. logo.png, favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
