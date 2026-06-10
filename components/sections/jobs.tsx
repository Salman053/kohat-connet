import React from 'react'
import Link from 'next/link'
import { Briefcase, MapPin, DollarSign, ArrowRight, Building2 } from 'lucide-react'

const jobs = [
  { id: 1, title: "Senior School Teacher", company: "Kohat International School", location: "KDA, Kohat", salary: "45k-60k", type: "Full-time" },
  { id: 2, title: "Web Developer", company: "TechConnect Solutions", location: "Remote", salary: "80k-120k", type: "Contract" },
  { id: 3, title: "Sales Representative", company: "Samsung Store", location: "Main Bazaar", salary: "25k+", type: "Full-time" }
]

const Jobs = () => {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="mb-12">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Job Opportunities</h2>
            <p className="text-muted-foreground">Build your career in the heart of Kohat.</p>
        </div>

        <div className="space-y-3">
          {jobs.map((job) => (
            <Link 
              key={job.id}
              href={`/jobs/${job.id}`}
              className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{job.title}</h3>
                  <p className="text-xs text-muted-foreground">{job.company} • {job.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{job.salary}</span>
                <span className="bg-muted px-3 py-1 rounded-full">{job.type}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-8 bg-muted/50 rounded-3xl">
          {[
            { label: "Active Jobs", value: "240+" },
            { label: "Companies", value: "85+" },
            { label: "Monthly Hires", value: "120+" },
            { label: "Categories", value: "18" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-black text-primary mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Jobs
