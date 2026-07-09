"use client"

import React, { useState } from 'react'
import { LifeBuoy, Check, Mail, Phone, ExternalLink } from 'lucide-react'
import { site } from '@/lib/site'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function SupportPage() {
  const [supportName, setSupportName] = useState("")
  const [supportEmail, setSupportEmail] = useState("")
  const [ticketType, setTicketType] = useState("Report Listing Error")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!supportName || !supportEmail || !description) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Page Header */}
      <div className="bg-primary/5 border-b border-border/40 py-16 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-[10px] font-extrabold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase inline-block mb-3">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            HELP &amp; <span className="text-primary">CUSTOMER SUPPORT</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Need help claiming a listing, reporting false data, or troubleshooting account issues? Create a support request.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Quick Help Contacts */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border p-6 rounded-3xl space-y-5">
              <h3 className="font-bold text-sm text-foreground">Direct Access Help</h3>
              <div className="space-y-4 text-xs text-muted-foreground">
                <div>
                  <div className="font-extrabold text-foreground mb-0.5">Helpline Whatsapp</div>
                  <p>{site.watsappNumber}</p>
                </div>
                <div>
                  <div className="font-extrabold text-foreground mb-0.5">Admin Email</div>
                  <p>{site.contactEmail}</p>
                </div>
                <div>
                  <div className="font-extrabold text-foreground mb-0.5">Response Time</div>
                  <p>Usually within 12 - 24 hours.</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 text-xs">
              <h4 className="font-bold text-foreground mb-1">Verify Listings First</h4>
              <p className="text-muted-foreground leading-relaxed">
                Before filing report requests on business info updates, make sure to double-check the shop details or active telephone codes.
              </p>
            </div>
          </div>

          {/* Form Ticket Column */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
              <h2 className="font-extrabold text-base mb-6 flex items-center gap-2">
                <LifeBuoy className="h-5 w-5 text-primary" /> Create Support Ticket
              </h2>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Support Ticket Created!</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                      Thank you. We have logged your request. Our support staff will check your query and email you updates shortly.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setSubmitted(false)
                      setSupportName("")
                      setSupportEmail("")
                      setDescription("")
                    }}
                    className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl shadow-md"
                  >
                    Open New Ticket
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
                        value={supportName}
                        onChange={(e) => setSupportName(e.target.value)}
                        placeholder="e.g. Zahir Shah"
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Email Address</label>
                      <Input
                        type="email"
                        required
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        placeholder="e.g. name@domain.com"
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Ticket Category</label>
                    <Select
                      value={ticketType}
                      onValueChange={(value) => setTicketType(value as string)}
                    >
                      <SelectTrigger className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary/50">
                        <SelectValue placeholder="Select ticket type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Report Listing Error">Report Listing Error / Inaccurate Info</SelectItem>
                        <SelectItem value="Listing Removal Request">Request Listing Deletion</SelectItem>
                        <SelectItem value="Advertising Issue">Billing or Advertisement Issue</SelectItem>
                        <SelectItem value="Technical Glitch">Website Bug / Technical Glitch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Problem Description</label>
                    <Textarea
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detail the issue you are facing, including any business names or links..."
                         />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs py-3.5 rounded-xl transition-all shadow-md shadow-primary/10 mt-2"
                  >
                    Submit Support Ticket
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
