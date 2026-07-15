import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(
  request: NextRequest,
  isPrefetch = false
) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          if (isPrefetch) {
            // For prefetches, update request cookies for internal consistency
            // but skip response cookie setting to avoid token rotation race
            // conditions during speculative navigation
          } else {
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) => {
              supabaseResponse.cookies.set(name, value, options)
            })
          }
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  console.log('Middleware - Path:', request.nextUrl.pathname, 'User:', user?.id || 'none')

  // Protected routes
  const protectedPaths = ['/admin', '/dashboard', '/business']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (!user && isProtectedPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/signin'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url, {
      headers: supabaseResponse.headers
    })
  }

  // Admin-only routes
  if (request.nextUrl.pathname.startsWith('/admin') && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url), {
        headers: supabaseResponse.headers
      })
    }
  }

  // Prevent caching of protected pages so stale prefetches aren't served
  if (isProtectedPath) {
    supabaseResponse.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  }

  return supabaseResponse
}
