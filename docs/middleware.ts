export { middleware } from 'nextra/locales'

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|avatars|favicon.ico|icon.svg|apple-icon.png|og-image.svg|robots.txt|sitemap|manifest|_pagefind).*)',
  ],
}
