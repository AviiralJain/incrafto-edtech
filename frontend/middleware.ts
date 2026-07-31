import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js Middleware — Route Navigation Guard (Phase 2)
 *
 * PURPOSE: UX / navigation optimization only.
 * Reads the lightweight "role" cookie set by setStoredAuth() in lib/auth.ts
 * to redirect unauthenticated or wrong-role users BEFORE the page renders,
 * eliminating the flash of protected content caused by client-side useEffect guards.
 *
 * SECURITY NOTE:
 * This middleware is NOT a security mechanism. The role cookie is not signed
 * or cryptographically verified here. The backend JWT verification
 * (protect() + authorizeRoles() in authMiddleware.js) remains the single
 * authoritative security boundary for all data access.
 *
 * LAYERED PROTECTION (all three layers remain active):
 *   1. This middleware  → blocks direct URL navigation before page render
 *   2. Client-side guards (useEffect in layout.tsx and dashboard pages) → unchanged
 *   3. Backend JWT authorization → authoritative security boundary
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const role = request.cookies.get('role')?.value

  // ── /admin/* ────────────────────────────────────────────────────────────────
  // Matches: /admin, /admin/dashboard, /admin/students, /admin/teachers,
  // and /admin-dashboard (legacy stub — added explicitly to matcher config).
  // Does NOT match: /admin-login (different path segment, excluded from matcher)
  if (pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }
    return NextResponse.next()
  }

  // ── /student-dashboard ──────────────────────────────────────────────────────
  if (pathname.startsWith('/student-dashboard')) {
    if (role !== 'student') {
      return NextResponse.redirect(new URL('/student-login', request.url))
    }
    return NextResponse.next()
  }

  // ── /teacher-dashboard ──────────────────────────────────────────────────────
  if (pathname.startsWith('/teacher-dashboard')) {
    if (role !== 'teacher') {
      return NextResponse.redirect(new URL('/teacher-login', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

/**
 * Matcher config — limits middleware execution to protected routes only.
 *
 * Explicitly EXCLUDED (middleware does not run on these):
 *   /admin-login       — login page, must always be accessible
 *   /student-login     — login page
 *   /teacher-login     — login page
 *   /login             — role selector page
 *   All public pages   — /, /about, /courses, /placements, /contact
 *   All static assets  — _next/*, images, favicon
 *
 * NOTE: '/admin/:path*' uses Next.js path matching syntax.
 * ':path*' means zero or more additional path segments, so it matches
 * /admin and /admin/dashboard but NOT /admin-login (different segment).
 */
export const config = {
  matcher: [
    '/admin/:path*',
    '/admin-dashboard',
    '/student-dashboard',
    '/student-dashboard/:path+',
    '/teacher-dashboard',
    '/teacher-dashboard/:path+',
  ],
}
