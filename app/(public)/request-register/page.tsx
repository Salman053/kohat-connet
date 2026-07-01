"use client"

import React, { useState } from 'react'
import { Megaphone, Check, DollarSign } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'

const adPlans = [
  {
    name: "Standard Banner",
    price: "PKR 5,000 / month",
    features: [
      "Display on search results page",
      "Standard size responsive banner",
      "Basic impressions monthly report",
      "Supports image or animation formats"
    ],
    tier: "standard"
  },
  {
    name: "Premium Sidebar / Sticky",
    price: "PKR 12,000 / month",
    features: [
      "Display on high traffic main pages",
      "Prominent sidebar placement",
      "Detailed weekly analytics reports",
      "Free banner design support",
      "Direct WhatsApp lead routing link"
    ],
    tier: "premium",
    popular: true
  },
  {
    name: "Sponsored Story / Article",
    price: "PKR 8,500 / post",
    features: [
      "Permanent publication on Connect Blog",
      "Featured on homepage for 1 week",
      "Shared on official social pages",
      "Writing & editing help from our team",
      "Best for brand launches"
    ],
    tier: "post"
  }
]

export default function RequestRegisterPage() {
  const [selectedPlan, setSelectedPlan] = useState("Premium Sidebar / Sticky")
  const [businessName, setBusinessName] = useState("")
  const [advertiserEmail, setAdvertiserEmail] = useState("")
  const [advertiserPhone, setAdvertiserPhone] = useState("")
  const [campaignDetails, setCampaignDetails] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessName || !advertiserEmail || !advertiserPhone) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="ADVERTISE ON KOHAT CONNECT"
        subtitle="Grow your brand presence, attract new clients, and connect with residents of Kohat through targeted digital placements."
        tag="Partner With Us"
      />

      <div className="container mx-auto px-6 mt-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {adPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-card border rounded-3xl p-6 flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-extrabold text-[9px] uppercase tracking-wider px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}
              <div>
                <h3 className="font-extrabold text-base mb-2">{plan.name}</h3>
                <div className="text-xl font-black text-primary mb-6 flex items-center gap-1">
                  <DollarSign className="h-5 w-5 shrink-0" />
                  {plan.price}
                </div>

                <ul className="space-y-3.5 text-xs text-muted-foreground mb-8">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex gap-2 items-start">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan(plan.name)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all ${
                  selectedPlan === plan.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {selectedPlan === plan.name ? "Selected Plan" : "Choose This Plan"}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border p-8 rounded-3xl max-w-3xl mx-auto shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Megaphone className="h-5 w-5 text-primary" />
            <h2 className="font-extrabold text-lg">Request Advertisement Proposal</h2>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-base">Inquiry Submitted Successfully!</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Thank you for your interest in advertising with us. Our sales team will get back to you with ad placement details and booking information within 24 hours.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setBusinessName("")
                  setAdvertiserEmail("")
                  setAdvertiserPhone("")
                  setCampaignDetails("")
                }}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl shadow-md"
              >
                Submit New Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleProposalSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Selected Advertisement Plan</label>
                <input
                  type="text"
                  disabled
                  value={selectedPlan}
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs text-muted-foreground focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Business / Brand Name</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Khyber Sweets Kohat"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={advertiserPhone}
                    onChange={(e) => setAdvertiserPhone(e.target.value)}
                    placeholder="e.g. +92 333 1234567"
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  required
                  value={advertiserEmail}
                  onChange={(e) => setAdvertiserEmail(e.target.value)}
                  placeholder="e.g. info@brand.com"
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Campaign Goals / Details</label>
                <textarea
                  rows={4}
                  value={campaignDetails}
                  onChange={(e) => setCampaignDetails(e.target.value)}
                  placeholder="Tell us about your campaign timeline, preferred banners sizes, or any specific goals..."
                  className="w-full bg-background border border-border rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs py-3.5 rounded-xl transition-all shadow-md shadow-primary/10 mt-2"
              >
                Send Request Proposal
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
