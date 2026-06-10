import React from 'react'
import { Droplet, Plus, MapPin, Phone, AlertCircle, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const donors = [
  { id: 1, name: "Ali Khan", bloodType: "O+", location: "KDA", contact: "0300-1234567" },
  { id: 2, name: "Sara Ahmed", bloodType: "A-", location: "City Center", contact: "0333-7654321" },
  { id: 3, name: "Usman Raza", bloodType: "B+", location: "University Rd", contact: "0312-9988776" },
  { id: 4, name: "Zainab Bibi", bloodType: "AB+", location: "Old Town", contact: "0345-1122334" },
  { id: 5, name: "Bilal Malik", bloodType: "O-", location: "KDA Phase 2", contact: "0301-4455667" },
  { id: 6, name: "Fatima Noor", bloodType: "A+", location: "Main Rd", contact: "0321-7788990" },
]

const urgentNeeds = [
  { hospital: "DHQ Hospital", blood: "O-" },
  { hospital: "City Medical", blood: "A+" }
]

const DonateBlood = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Blood Donor Network</h2>
            <p className="text-muted-foreground text-lg italic mt-2">Connecting donors and recipients in Kohat.</p>
          </div>
          <Button size="lg" className="rounded-full">
            <Plus className="w-4 h-4 mr-2" /> Register as a Donor
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Donor Grid (8 Columns) */}
           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {donors.map(donor => (
                <div key={donor.id} className="bg-card border border-border p-5 rounded-3xl shadow-sm hover:border-primary/50 transition-colors">
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black text-lg'>{donor.bloodType}</div>
                    <div>
                      <h4 className='font-bold text-base leading-tight'>{donor.name}</h4>
                      <div className='text-xs text-muted-foreground flex items-center gap-1 mt-0.5'><MapPin className='w-3 h-3'/> {donor.location}</div>
                    </div>
                  </div>
                  <div className='text-sm font-semibold text-primary flex items-center gap-2 bg-muted/50 p-2 rounded-xl'>
                    <Phone className='w-4 h-4'/> {donor.contact}
                  </div>
                </div>
              ))}
           </div>

           {/* Side Panel (4 Columns) */}
           <div className="lg:col-span-4 space-y-6">
             {/* Urgent Needs */}
             <div className="bg-zinc-900 text-background rounded-3xl p-6">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <AlertCircle className="w-5 h-5 text-red-500" /> Urgent Needs
               </h3>
               <div className="space-y-3">
                 {urgentNeeds.map((need, i) => (
                   <div key={i} className="flex items-center justify-between bg-white/10 p-3 rounded-2xl">
                     <span className="text-sm font-semibold">{need.hospital}</span>
                     <span className="text-sm font-black text-red-400 bg-red-950/50 px-3 py-1 rounded-full">{need.blood}</span>
                   </div>
                 ))}
               </div>
             </div>

             {/* Blood Banks */}
             <div className="bg-card border border-border rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" /> Key Blood Banks
                </h3>
                <p className="text-sm text-muted-foreground">List of certified blood banks in Kohat city providing 24/7 services.</p>
                <Button variant="outline" className="w-full mt-4">View All Banks</Button>
             </div>
           </div>
        </div>
      </div>
    </section>
  )
}

export default DonateBlood
