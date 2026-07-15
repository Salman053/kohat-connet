'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useAuth } from '@/components/auth/auth-context'

function SignInForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const message = searchParams.get('message')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()

  const routeTo = (role: string) => {
    console.log('SignIn - Routing to role:', role)
    if (role === "admin") {
      router.push("/admin")
    }
    else if (role == "business") router.push("/dashboard")
    else router.push("/")
  }

  useEffect(() => {
    if (user) {
      const fetchRole = async () => {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        routeTo(data?.role || 'user')
      }
      fetchRole()
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    console.log('SignIn - Submitting login for:', email)

    try {
      const res = await signIn(email, password)
      console.log('SignIn - Sign in result:', res?.user?.id || 'none')
      if (res?.user) {
        // Fetch user profile to get role
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', res.user.id)
          .single()
        
        console.log('SignIn - Profile role:', profile?.role || 'none')
        routeTo(profile?.role || 'user')
      }
    } catch (err: unknown) {
      console.error('SignIn - Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Sign in to your Kohat Connect account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {message && (
              <div className="flex items-center gap-2.5 bg-primary/10 border border-primary/20 text-primary text-sm px-4 py-3 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {message}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2.5 bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link href="/auth/forgot-password" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 text-sm font-semibold gap-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}
