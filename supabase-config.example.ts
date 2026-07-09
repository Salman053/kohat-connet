// Supabase Configuration Example
// Copy this file to supabase-config.ts and fill in your values

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-supabase-service-role-key',
}

// Stripe Configuration (for payments)
export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'your-stripe-publishable-key',
  secretKey: process.env.STRIPE_SECRET_KEY || 'your-stripe-secret-key',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'your-stripe-webhook-secret',
}
