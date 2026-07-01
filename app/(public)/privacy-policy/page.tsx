import React from 'react'
import { Shield } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Shield className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
            Privacy Policy
          </h1>
        </div>

        <div className="bg-card border border-border p-8 rounded-3xl space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p className="font-bold text-foreground">Last Updated: July 01, 2026</p>
          
          <p>
            At Kohat Connect, we prioritize the privacy of our visitors and registered business owners. This Privacy Policy document contains types of information that is collected and recorded by Kohat Connect and how we use it.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">1. Information We Collect</h2>
          <p>
            When you register on Kohat Connect, request a listing, or submit an advertisement proposal, we may collect personal details such as your name, business name, phone number, email address, and physical location mapping details.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide, operate, and maintain our local city directory.</li>
            <li>To verify your business identity and activate directory listings.</li>
            <li>To communicate with you regarding listings, updates, and customer support.</li>
            <li>To send you transactional SMS/email notifications about your profile.</li>
          </ul>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">3. Publicly Available Data</h2>
          <p>
            Please note that details you submit to be displayed in your public business profile (such as shop address, phone number, operational hours, and gallery images) are publicly visible to all website users. Do not include private or sensitive personal details in your public listings.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">4. Contact Us</h2>
          <p>
            If you have any questions or require more information about our Privacy Policy, do not hesitate to contact us at salmankhanm859@gmail.com.
          </p>
        </div>
      </div>
    </div>
  )
}
