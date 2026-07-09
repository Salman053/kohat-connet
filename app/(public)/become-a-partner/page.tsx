"use client"

import React, { useState } from 'react'
import { Handshake, ShieldCheck, Target, Award, Users } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import AnimatedGradientOrbs from '@/components/animated/animated-gradient-Orbs'
import AnimatedGridPattern from '@/components/animated/animated-grid-pattern'
import FloatingParticles from '@/components/animated/floating-particles'

export default function BecomeAPartnerPage() {
  const [partnerName, setPartnerName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [partnerEmail, setPartnerEmail] = useState("")
  const [partnerPhone, setPartnerPhone] = useState("")
  const [partnerType, setPartnerType] = useState<string>("Local Franchise")
  const [proposal, setProposal] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!partnerName || !partnerEmail || !partnerPhone) return
    setSubmitted(true)
  }

  const resetStates = () => {
    setSubmitted(false)
    setPartnerName("")
    setCompanyName("")
    setPartnerEmail("")
    setPartnerPhone("")
    setProposal("")
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="BECOME A PARTNER"
        subtitle="Collaborate with Kohat Connect to expand local commerce, sponsor community initiatives, and drive innovation."
        tag="Synergy &amp; Growth"
      />
      <div className="container mx-auto px-6 mt-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border p-6 rounded-3xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-base">Community Outreach</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sponsor local tournaments, food drives, and charity programs to build deep trust with residents.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-base">Franchise &amp; Listing Rights</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Operate local directories or event hubs in sub-districts and share revenue directly.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-base">Elite Verification Badging</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Co-brand your business as a vetted &amp; certified provider by the city directory admin board.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border p-8 rounded-3xl max-w-3xl mx-auto shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Handshake className="h-5 w-5 text-primary" />
            <h2 className="font-extrabold text-lg">Partnership Application Form</h2>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-base">Application Received!</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Thank you for applying. A partnership board representative will review your proposal and respond with collaboration terms within 3-5 business days.
                </p>
              </div>
              <Button
                onClick={resetStates}
                className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl shadow-md"
              >
                Submit Another Application
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Full Name</label>
                  <Input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="e.g. Mohammad Qasim"

                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Company Name (Optional)</label>
                  <Input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Khyber Tech Group"

                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Email Address</label>
                  <Input
                    type="email"
                    required
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="e.g. partner@domain.com"

                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Contact Phone</label>
                  <Input
                    type="tel"
                    required
                    value={partnerPhone}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                    placeholder="e.g. +92 333 1234567"

                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Partnership Type</label>
                <Select
                  value={partnerType}
                  onValueChange={(value) => setPartnerType(value as string)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select partnership type" />
                  </SelectTrigger>
                  <SelectContent>

                    <SelectItem value="Local Franchise">Local Franchise Operator</SelectItem>
                    <SelectItem value="Event Sponsor">Corporate Event Sponsor</SelectItem>
                    <SelectItem value="Developer API integration">Developer / API Partnership</SelectItem>
                    <SelectItem value="Blood Drive Coalition">Blood Drive &amp; Health Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Partnership Proposal / Pitch</label>
                <Textarea
                  required
                  rows={10}
                  value={proposal}
                  className='min-h-28'
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="Outline your collaboration proposal, target audience, expected outcomes, or any background info..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs py-3.5 rounded-xl transition-all shadow-md shadow-primary/10 mt-2"
              >
                Submit Partnership Request
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
