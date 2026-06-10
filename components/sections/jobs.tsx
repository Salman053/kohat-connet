import React from 'react'
import Link from 'next/link'
import { Briefcase, MapPin, DollarSign, ArrowRight, Building2, BarChart, Store, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const jobs = [
  { id: 1, title: "Senior School Teacher", company: "Kohat International School", location: "KDA", salary: "45k-60k", type: "Full-time" },
  { id: 2, title: "Web Developer", company: "TechConnect Solutions", location: "Remote", salary: "80k-120k", type: "Contract" },
  { id: 3, title: "Sales Representative", company: "Samsung Store", location: "Main Bazaar", salary: "25k+", type: "Full-time" },
  { id: 4, title: "Accountant", company: "City Financials", location: "University Rd", salary: "35k-50k", type: "Full-time" },
]

const Jobs = () => {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Job Opportunities</h2>
                <p className="text-muted-foreground">Find your next role in Kohat's growing economy.</p>
            </div>
            <Button size="lg" className="rounded-full">Browse All Jobs</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-3">
              {jobs.map((job) => (
                <Link 
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{job.title}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className='w-3 h-3'/> {job.company} • {job.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1"><DollarSign className='w-3 h-3'/> {job.salary}</span>
                    <span className="text-[10px] font-bold uppercase bg-muted px-2 py-1 rounded-md text-muted-foreground">{job.type}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="lg:col-span-4 space-y-6">
                {/* Community Poll */}
                <div className="bg-card p-8 rounded-3xl border border-border">
                    <h4 className='font-bold text-sm mb-4 flex items-center gap-2'><BarChart className='w-4 h-4 text-primary'/> Community Pulse</h4>
                    <p className="text-xs text-muted-foreground mb-6">What is the most needed service in Kohat right now?</p>
                    <div className="space-y-3">
                        {['Public Transport', 'Better Internet', 'More Parks'].map((opt) => (
                            <Button key={opt} variant="outline" className="w-full justify-start rounded-full text-xs">
                                {opt}
                            </Button>
                        ))}
                    </div>
                </div>
                
                {/* Featured Local Business */}
                <div className="bg-primary text-primary-foreground rounded-3xl p-8">
                    <h4 className='font-bold text-sm mb-4 flex items-center gap-2'><Store className='w-4 h-4'/> Featured Local Business</h4>
                    <div className='flex items-center gap-4'>
                        <div className='w-14 h-14 bg-white/20 rounded-2xl'/>
                        <div>
                            <h5 className='font-bold text-sm'>Delicious Bakery</h5>
                            <div className='flex items-center gap-1 text-xs'><Star className='w-3 h-3 fill-white'/> 4.9</div>
                        </div>
                    </div>
                </div>
            </div>
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
