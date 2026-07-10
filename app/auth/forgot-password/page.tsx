'use client'

import { Suspense, useState } from 'react'
import { resetPassword } from '@/lib/auth'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"

function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await resetPassword(email)
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              If an account exists with {email}, you&apos;ll receive a password reset link.
            </p>
            <Link href="/auth/signin" className="text-sm font-medium text-primary hover:text-primary/80">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Reset your password
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 text-sm font-semibold"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <Link href="/auth/signin" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80">
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    }>
      <ForgotPasswordForm />
    </Suspense>
  )
}
