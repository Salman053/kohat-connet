import React from 'react'
import { AlertTriangle, ShieldCheck, Zap, Flame, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const emergencyContacts = [
  { name: "Police", number: "15", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Rescue 1122", number: "1122", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Fire Brigade", number: "1122", icon: Flame, color: "text-red-500", bg: "bg-red-50" },
  { name: "DHQ Hospital", number: "0922-123456", icon: Building2, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "PESCO Complaint", number: "0922-987654", icon: Zap, color: "text-yellow-600", bg: "bg-yellow-50" },
]

const Emergency = () => {
  return (
    <section className="py-12 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tighter uppercase">Emergency Contacts</h2>
            <p className="text-muted-foreground text-sm italic">Immediate assistance in Kohat.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {emergencyContacts.map((contact, i) => (
            <a 
              key={i} 
              href={`tel:${contact.number}`} 
              className="group flex flex-col items-center justify-center gap-3 p-5 bg-card border border-border rounded-3xl hover:border-primary/50 transition-all hover:shadow-md"
            >
              <div className={`p-3  ${contact.bg}`}>
                <contact.icon className={`w-6 h-6 ${contact.color}`} />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-sm leading-tight">{contact.name}</h4>
                <p className="text-lg font-black text-foreground mt-1">{contact.number}</p>
              </div>
              <div className="w-full flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" className=" w-full">Call Now</Button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Emergency
