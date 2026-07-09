"use client"

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Check } from 'lucide-react'
import { site } from '@/lib/site'
import PageHeader from '@/components/shared/page-header'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="CONTACT KOHAT CONNECT"
        subtitle="Have questions about business directories, events list, promotions or advertising options? Drop us a line."
        tag="Get in Touch"
      />

      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border p-6 rounded-3xl space-y-6">
              <h2 className="font-extrabold text-lg text-foreground flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" /> Contact Details
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-muted-foreground uppercase">WhatsApp / Call</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{site.watsappNumber}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-muted-foreground uppercase">Email Address</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">{site.contactEmail}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-muted-foreground uppercase">Main Office</h3>
                    <p className="text-sm font-bold text-foreground mt-0.5">KDA Phase 1 Sector 8, Kohat, KPK, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
              <h3 className="font-bold text-xs text-primary uppercase tracking-wider mb-2">Advertise With Us</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Want to place banner ads, sponsored articles, or featured posts on our site? Please request advertisement through our online request portal.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
              <h2 className="font-extrabold text-lg text-foreground mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Message Sent Successfully!</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                      Thank you for contacting us. A member of our support team will reply to you as soon as possible.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: "", email: "", subject: "", message: "" })
                    }}
                    className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl shadow-md"
                  >
                    Send Another Message
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
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Zahir Shah"
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Email Address</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@domain.com"
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Subject</label>
                    <Input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Business Listing Claim Inquiry"
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Your Message</label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please write your detailed inquiry here..."
                         />
                  </div>

                  <Button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-primary/10 mt-2"
                  >
                    Send Message <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
