"use client"

import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "How do I add my business listing to Kohat Connect?",
    answer: "You can add your business listing by clicking the 'List Business' button on the top right, filling out the business details form (phone, category, subcategory, address), and submitting it. Our verification team will review and publish it within 24 hours."
  },
  {
    question: "Is listing my business free?",
    answer: "Yes! Creating a basic business directory listing, including your contact details, map location, and a description, is 100% free."
  },
  {
    question: "What advertising opportunities are available?",
    answer: "We offer premium home banner placements, targeted search results ads, sticky sidebars, and sponsored blog posts to showcase your business to thousands of locals monthly."
  },
  {
    question: "How does the Emergency Blood Donor registry work?",
    answer: "Residents of Kohat can sign up as voluntary blood donors on our platform. In case of an emergency, users can view public requests or search donor contact lists to get immediate support."
  },
  {
    question: "How can I update or modify my existing listing details?",
    answer: "To claim or update a business listing, please contact us via the contact form or send a WhatsApp message to our verified helpline with proof of ownership."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center font-bold text-sm text-foreground hover:text-primary transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="h-4.5 w-4.5 shrink-0" /> : <ChevronDown className="h-4.5 w-4.5 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs md:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4 bg-muted/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
