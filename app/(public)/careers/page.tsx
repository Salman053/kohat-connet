"use client"

import React, { useState } from 'react'
import { Briefcase, Check, Sparkles, Send, MapPin, Calendar } from 'lucide-react'

const jobOpenings = [
  {
    title: "Regional Sales Lead",
    department: "Sales & Marketing",
    location: "Kohat, KPK",
    type: "Full-Time",
    salary: "Competitive",
    description: "Lead advertising sales campaigns, secure corporate partnerships, and manage local sales executives in the southern region of KPK."
  },
  {
    title: "Field Listing Agent",
    department: "Operations",
    location: "Kohat Cantonment & KDA",
    type: "Part-Time / Contract",
    salary: "Base + Commission",
    description: "Visit shops, collect business info, photos, and verification proofs to register local merchants on the Kohat Connect directory."
  },
  {
    title: "Frontend Developer (Next.js)",
    department: "Technology",
    location: "Remote / Hybrid (Kohat)",
    type: "Full-Time",
    salary: "Negotiable",
    description: "Maintain and upgrade the Kohat Connect web app, improve user dashboard interfaces, and build interactive map capabilities."
  }
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState("Regional Sales Lead")
  const [candidateName, setCandidateName] = useState("")
  const [candidateEmail, setCandidateEmail] = useState("")
  const [candidatePhone, setCandidatePhone] = useState("")
  const [cvLink, setCvLink] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!candidateName || !candidateEmail || !cvLink) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Page Header */}
      <div className="bg-primary/5 border-b border-border/40 py-16 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-[10px] font-extrabold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase inline-block mb-3">
            Join Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            CAREERS AT <span className="text-primary">KOHAT CONNECT</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Work with a dynamic local team helping to shape the digital economy of Khyber Pakhtunkhwa. Explore open roles.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 max-w-5xl space-y-16">
        {/* Why Join Us */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-center text-foreground flex items-center justify-center gap-2">
            <Sparkles className="h-5.5 w-5.5 text-primary" /> WHY WORK WITH US?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-3xl space-y-2">
              <h3 className="font-extrabold text-sm text-foreground">Local Impact</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Empower small shopkeepers, tailors, mechanics, and professionals to gain visibility and grow their client bases.
              </p>
            </div>
            <div className="bg-card border border-border p-6 rounded-3xl space-y-2">
              <h3 className="font-extrabold text-sm text-foreground">Flexible Culture</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We value performance over desk hours. Enjoy hybrid work schedules, friendly peer support, and autonomy.
              </p>
            </div>
            <div className="bg-card border border-border p-6 rounded-3xl space-y-2">
              <h3 className="font-extrabold text-sm text-foreground">Career Growth</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Develop your capabilities in sales operations, full-stack Next.js coding, regional branding, and database management.
              </p>
            </div>
          </div>
        </div>

        {/* Job Positions List & Apply */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8 border-t border-border/60">
          {/* Job Openings Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-black text-lg text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Active Job Openings
            </h2>

            <div className="space-y-6">
              {jobOpenings.map((job, idx) => (
                <div
                  key={idx}
                  className={`bg-card border rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between ${
                    selectedJob === job.title
                      ? "border-primary shadow-md"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <h3 className="font-bold text-base text-foreground">{job.title}</h3>
                      <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex gap-4 text-xs text-muted-foreground font-semibold">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </span>
                      <span>•</span>
                      <span>{job.department}</span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/40 flex justify-between items-center">
                    <span className="text-xs font-bold text-primary">
                      {job.salary}
                    </span>
                    <button
                      onClick={() => setSelectedJob(job.title)}
                      className="px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-xs rounded-lg transition-all"
                    >
                      {selectedJob === job.title ? "Selected" : "Apply for Role"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Application Column */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-6 rounded-3xl sticky top-24 shadow-sm">
              <h3 className="font-extrabold text-sm mb-4 text-primary">APPLY FOR THIS ROLE</h3>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Application Submitted!</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Thanks for applying. Our HR lead will check your CV link and contact you if there is a match.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setCandidateName("")
                      setCandidateEmail("")
                      setCandidatePhone("")
                      setCvLink("")
                    }}
                    className="w-full py-2 bg-primary text-primary-foreground font-bold text-xs rounded-xl"
                  >
                    Apply for Another Role
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Applying for</label>
                    <input
                      type="text"
                      disabled
                      value={selectedJob}
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs text-muted-foreground focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Full Name</label>
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Amir Yousaf"
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      required
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="e.g. amir@gmail.com"
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      placeholder="e.g. +92 333 1122334"
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold uppercase text-muted-foreground">CV Link (Google Drive, Dropbox, etc.)</label>
                    <input
                      type="url"
                      required
                      value={cvLink}
                      onChange={(e) => setCvLink(e.target.value)}
                      placeholder="e.g. https://drive.google.com/..."
                      className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black text-xs py-3 rounded-xl transition-all shadow-md shadow-primary/10 mt-2"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
