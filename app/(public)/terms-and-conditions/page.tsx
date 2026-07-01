import React from 'react'
import { FileText } from 'lucide-react'

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
            Terms &amp; Conditions
          </h1>
        </div>

        <div className="bg-card border border-border p-8 rounded-3xl space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p className="font-bold text-foreground">Last Updated: July 01, 2026</p>
          
          <p>
            Welcome to Kohat Connect. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Kohat Connect if you do not agree to all of the terms and conditions stated on this page.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">1. User Eligibility &amp; Accounts</h2>
          <p>
            Business owners submitting listings must provide accurate, current, and complete information. You are solely responsible for keeping your credentials confidential and for all activities that occur under your listing.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">2. Listing &amp; Content Guidelines</h2>
          <p>
            You agree not to list or promote products, services, or locations that are illegal, fraudulent, or harmful under Pakistani law. We reserve the absolute right to modify, suspend, or permanently remove any listings that violate these standards without notice.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">3. Limitation of Liability</h2>
          <p>
            Kohat Connect is a local information directory. We do not guarantee the services, quality, or integrity of the independent service experts or businesses listed. Users engage with providers at their own risk.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">4. Modifications to Terms</h2>
          <p>
            We reserve the right to revise these terms at any time. By continuing to use the platform, you agree to be bound by the updated terms.
          </p>
        </div>
      </div>
    </div>
  )
}
