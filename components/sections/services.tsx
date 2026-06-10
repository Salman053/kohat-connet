import React from 'react'
import Link from 'next/link'
import { Wrench, Camera, Laptop, Truck, HeartPulse, Zap, ArrowRight, ShieldCheck, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const serviceCategories = [
  { 
    id: 1, 
    icon: Wrench, 
    name: "Plumbing & Carpentry", 
    description: "Expert home repair and maintenance services.",
    color: "bg-blue-500",
    href: "/services/home-repair"
  },
  { 
    id: 2, 
    icon: Camera, 
    name: "Photography", 
    description: "Cinematic wedding and event photography.",
    color: "bg-pink-500",
    href: "/services/photography"
  },
  { 
    id: 3, 
    icon: Laptop, 
    name: "IT & Tech Support", 
    description: "Computer repair and software solutions.",
    color: "bg-purple-500",
    href: "/services/it-tech"
  },
  { 
    id: 4, 
    icon: Truck, 
    name: "Transport & Logistics", 
    description: "Moving, delivery and rent-a-car services.",
    color: "bg-orange-500",
    href: "/services/transport"
  },
  { 
    id: 5, 
    icon: HeartPulse, 
    name: "Healthcare at Home", 
    description: "Home nursing and professional care.",
    color: "bg-red-500",
    href: "/services/healthcare"
  },
  { 
    id: 6, 
    icon: Zap, 
    name: "Electrical Services", 
    description: "Safe and reliable electrical installations.",
    color: "bg-yellow-500",
    href: "/services/electrical"
  }
]

const Services = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6">
            PROFESSIONAL <span className="text-primary">SERVICES</span>
          </h2>
          <p className="text-muted-foreground text-lg italic">
            "Your community experts, just a click away."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((service) => (
            <Link 
              key={service.id}
              href={service.href}
              className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative background number */}
              <div className="absolute -top-4 -right-4 text-8xl font-black text-foreground/5 pointer-events-none group-hover:text-primary/10 transition-colors">
                {service.id}
              </div>

              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500",
                service.color + "/10"
              )}>
                <service.icon className={cn("w-7 h-7", "text-" + service.color.split('-')[1] + "-500")} />
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-t border-border pt-6">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24/7 Available</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Book Expert <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 p-10 bg-foreground/80 text-background flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Can't find what you're looking for?</h3>
            <p className="text-background/60">We have over 500+ verified professionals in Kohat.</p>
          </div>
          <Link 
            href="/services"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-105 transition-transform"
          >
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services
