import React from 'react'
import Link from 'next/link'
import { Briefcase, MapPin, DollarSign, ArrowRight, Bookmark, Building2, Layers } from 'lucide-react'

const jobs = [
  {
    id: 1,
    title: "Senior School Teacher (Science)",
    company: "Kohat International School",
    logo: "https://images.unsplash.com/photo-1740803292814-13d2e35924c3?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "KDA, Kohat",
    salary: "Rs. 45,000 - 60,000",
    type: "Full-time",
    category: "Education",
    tags: ["Immediate", "Competitive Salary"]
  },
  {
    id: 2,
    title: "Web Developer (React/Next.js)",
    company: "TechConnect Solutions",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80",
    location: "Remote / Kohat",
    salary: "Rs. 80,000 - 120,000",
    type: "Contract",
    category: "IT",
    tags: ["Remote Friendly", "High Growth"]
  },
  {
    id: 3,
    title: "Sales Representative",
    company: "Samsung Official Store",
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    location: "Main Bazaar, Kohat",
    salary: "Rs. 25,000 + Commission",
    type: "Full-time",
    category: "Sales",
    tags: ["Sales Experience", "Commission Based"]
  }
]

const Jobs = () => {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Opportunities</h2>
            <p className="text-muted-foreground text-lg">Build your career in the heart of Kohat.</p>
          </div>
          <Link href="/jobs" className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all">
            Browse All Jobs
          </Link>
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="group p-6 rounded-3xl bg-card border border-border hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Company Logo */}
                <div className="w-16 h-16 rounded-2xl bg-muted overflow-hidden shrink-0">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/5 uppercase tracking-wider">{job.category}</span>
                    <span className="text-[10px] font-bold text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-muted-foreground">{job.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">{job.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{job.company}</span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground lg:px-8 border-l border-border hidden sm:flex">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-bold text-foreground">{job.salary}</span>
                  </div>
                </div>

                {/* Tags & Action */}
                <div className="flex items-center gap-4 lg:ml-auto">
                  <button className="p-3 rounded-xl border border-border hover:bg-muted text-muted-foreground transition-colors hidden sm:block">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <Link 
                    href={`/jobs/${job.id}`}
                    className="flex-1 lg:flex-none px-8 py-3 bg-secondary text-secondary-foreground font-black text-sm rounded-xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 uppercase tracking-tighter"
                  >
                    Apply <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Mobile Meta Info */}
              <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-4 sm:hidden">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <DollarSign className="w-3.5 h-3.5 text-green-500" />
                  <span className="font-bold text-foreground">{job.salary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { label: "Active Jobs", value: "240+" },
            { label: "Companies", value: "85+" },
            { label: "Monthly Hires", value: "120+" },
            { label: "Categories", value: "18" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Jobs
