import React from 'react'
import Link from 'next/link'
import { Wrench, Camera, Laptop, Truck, HeartPulse, Zap, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const serviceCategories = [
  { id: 1, icon: Wrench, name: "Plumbing", color: "bg-blue-500", href: "/services/plumbing" },
  { id: 2, icon: Camera, name: "Photography", color: "bg-pink-500", href: "/services/photography" },
  { id: 3, icon: Laptop, name: "IT Support", color: "bg-purple-500", href: "/services/it-tech" },
  { id: 4, icon: Truck, name: "Logistics", color: "bg-orange-500", href: "/services/transport" },
  { id: 5, icon: HeartPulse, name: "Healthcare", color: "bg-red-500", href: "/services/healthcare" },
  { id: 6, icon: Zap, name: "Electrical", color: "bg-yellow-500", href: "/services/electrical" },
  { id: 7, icon: Wrench, name: "Carpentry", color: "bg-blue-500", href: "/services/carpentry" },
  { id: 8, icon: Camera, name: "Videography", color: "bg-pink-500", href: "/services/videography" }
]

const topRequested = [
  { name: "Computer Repair", count: "1.2k" },
  { name: "Mobile Repair", count: "950" },
  { name: "Car Repair", count: "820" }
]

const Services = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
             <h2 className="text-4xl font-black tracking-tighter text-foreground mb-6">
                PROFESSIONAL <span className="text-primary">SERVICES</span>
             </h2>
             <p className="text-muted-foreground text-sm mb-8 italic">&quot;Your community experts, just a click away.&quot;</p>
             
             <div className="bg-card p-6 rounded-3xl border border-border">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" /> Top Requested
                </h3>
                <div className="space-y-4">
                    {topRequested.map(s => (
                        <div key={s.name} className="flex justify-between items-center text-sm">
                            <span className="font-semibold">{s.name}</span>
                            <span className="font-black text-primary">{s.count}+</span>
                        </div>
                    ))}
                </div>
             </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceCategories.map((service) => (
              <Link 
                key={service.id}
                href={service.href}
                className="group p-5 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
                  service.color + "/10"
                )}>
                  <service.icon className={cn("w-6 h-6", "text-" + service.color.split('-')[1] + "-500")} />
                </div>
                <h3 className="text-sm font-bold group-hover:text-primary transition-colors">{service.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
