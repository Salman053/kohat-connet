import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const isPrefetch = request.headers.get('purpose') === 'prefetch' || request.headers.get('next-router-prefetch') === '1'

  // Collect cookie updates from token refresh; apply to final response once
  const pendingCookies: { name: string; value: string; options?: any }[] = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          pendingCookies.push(...cookiesToSet)
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userRole = ''
  const requestHeaders = new Headers(request.headers)

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, full_name, business_name')
      .eq('id', user.id)
      .single()

    userRole = profile?.role ?? 'user'

    requestHeaders.set('x-user-id', user.id)
    requestHeaders.set('x-user-email', user.email ?? '')
    requestHeaders.set('x-user-role', userRole)
    if (profile?.full_name) requestHeaders.set('x-user-name', profile.full_name)
    if (profile?.business_name) requestHeaders.set('x-user-business-name', profile.business_name)
  }

  // Skip redirect checks during prefetch — session refresh still happens
  if (!isPrefetch) {
    // Protected routes - require authentication
    const protectedPaths = ['/admin', '/dashboard', '/business']
    const isProtectedPath = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    )

    if (isProtectedPath && !user) {
      const redirectUrl = new URL('/auth/signin', request.url)
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Admin-only routes
    if (request.nextUrl.pathname.startsWith('/admin') && user && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Build final response with modified request headers (visible to server components via headers())
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Apply cookie updates from token refresh to the final response
  for (const { name, value, options } of pendingCookies) {
    response.cookies.set(name, value, options)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
