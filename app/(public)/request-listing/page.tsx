"use client"

import React, { useState } from 'react'
import { categories } from '@/lib/site'
import { PlusCircle, Check, Info, Store, FileText } from 'lucide-react'
import PageHeader from '@/components/shared/page-header'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function RequestListingPage() {
  const [formData, setFormData] = useState({
    bizName: "",
    bizPhone: "",
    bizEmail: "",
    bizWebsite: "",
    bizAddress: "",
    category: categories[0].name,
    subcategory: categories[0].subcategories[0].name,
    desc: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const selectedCategoryObj = categories.find(c => c.name === formData.category)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.bizName || !formData.bizPhone || !formData.bizAddress) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader
        title="ADD YOUR BUSINESS FOR FREE"
        subtitle="Reach thousands of potential customers in the Kohat district. Join our comprehensive city directory catalog."
        tag="Local Registry"
      />

      <div className=" mx-auto px-6 mt-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border p-6 rounded-3xl space-y-5">
              <h2 className="font-extrabold text-sm text-foreground flex items-center gap-2">
                <Store className="h-4 w-4 text-primary" /> Listing Instructions
              </h2>

              <ul className="space-y-4 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                  <span>Fill in correct contact numbers and physical shop address for verification.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                  <span>Select relevant business categories so users can search your items easily.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                  <span>Once submitted, our team will review the details and make it live on the site.</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex gap-3 items-start">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-foreground mb-1">Need Fast Approval?</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Call our official WhatsApp support after submission to request instant listing activation.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
              <h2 className="font-extrabold text-base mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Business Details Form
              </h2>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Listing Request Submitted!</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                      Thank you. We will verify the details of <strong>{formData.bizName}</strong>. You will receive an SMS and email notification once your profile is verified and active.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        bizName: "",
                        bizPhone: "",
                        bizEmail: "",
                        bizWebsite: "",
                        bizAddress: "",
                        category: categories[0].name,
                        subcategory: categories[0].subcategories[0].name,
                        desc: ""
                      })
                    }}
                    className="px-6 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded-xl shadow-md"
                  >
                    Add Another Business
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Business Name</label>
                    <Input
                      type="text"
                      required
                      value={formData.bizName}
                      onChange={(e) => setFormData({ ...formData, bizName: e.target.value })}
                      placeholder="e.g. Kohat Premium Barber Shop"
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Phone Number</label>
                      <Input
                        type="tel"
                        required
                        value={formData.bizPhone}
                        onChange={(e) => setFormData({ ...formData, bizPhone: e.target.value })}
                        placeholder="e.g. +92 333 1234567"
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Business Email (Optional)</label>
                      <Input
                        type="email"
                        value={formData.bizEmail}
                        onChange={(e) => setFormData({ ...formData, bizEmail: e.target.value })}
                        placeholder="e.g. contact@business.com"
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Primary Category</label>
                      <Select
                        value={formData.category}
                        onValueChange={(catName) => {
                          const catObj = categories.find(c => c.name === catName)
                          setFormData({
                            ...formData,
                            category: catName as any,
                            subcategory: catObj && catObj.subcategories.length > 0 ? catObj.subcategories[0].name : ""
                          })
                        }}
                      >
                        <SelectTrigger className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary/50">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.name} value={c.name}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Subcategory</label>
                      <Select
                        value={formData.subcategory}
                        onValueChange={(value) => setFormData({ ...formData, subcategory: value as any })}
                        disabled={!formData.category} // Optional: disables subcategory if no category is picked
                      >
                        <SelectTrigger className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary/50">
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategoryObj?.subcategories.map((sub) => (
                            <SelectItem key={sub.name} value={sub.name}>
                              {sub.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Shop / Physical Address</label>
                    <Input
                      type="text"
                      required
                      value={formData.bizAddress}
                      onChange={(e) => setFormData({ ...formData, bizAddress: e.target.value })}
                      placeholder="e.g. Shop #42, Main Plaza, KDA Phase 1, Kohat"
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Business Description</label>
                    <Textarea
                      rows={4}
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                      placeholder="Introduce your business, services, opening hours, or special offerings..."
                         />
                  </div>

                  <Button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-primary/10 mt-2"
                  >
                    <PlusCircle className="h-4.5 w-4.5" /> Register Business Listing
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
