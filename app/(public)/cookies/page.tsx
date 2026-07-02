import React from 'react'
import { Cookie } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Cookie className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
            Cookie Policy
          </h1>
        </div>

        <div className="bg-card border border-border p-8 rounded-3xl space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p className="font-bold text-foreground">Last Updated: July 01, 2026</p>

          <p>
            This Cookie Policy explains how Kohat Connect uses cookies and similar tracking technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">1. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently, as well as to provide reporting information and personalize your experience.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">2. How We Use Cookies</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for the basic functionality of our website, such as page navigation and access to secure areas.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences to provide a personalized experience.</li>
            <li><strong>Functional Cookies:</strong> Enable enhanced functionality such as language preferences and region selection.</li>
          </ul>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">3. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on. These include Google Analytics for traffic analysis and Google Translate for language switching functionality.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">4. Managing Cookies</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted.
          </p>

          <h2 className="font-extrabold text-foreground text-base pt-4 border-t">5. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at salmankhanm859@gmail.com.
          </p>
        </div>
      </div>
    </div>
  )
}
