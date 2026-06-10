import React from 'react'
import Link from 'next/link'
import { MessageSquare, Megaphone, Search, Heart, ArrowRight, Plus, Users2, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

const announcements = [
  {
    id: 1,
    title: "Water Supply Notice",
    description: "Scheduled maintenance in KDA Phase 1 this Sunday.",
    time: "3h ago",
    priority: "low"
  },
  {
    id: 2,
    title: "Blood Needed (O-)",
    description: "Urgent O- blood donor required at DHQ Hospital.",
    time: "45m ago",
    priority: "high"
  }
]

const lostFound = [
  {
    id: 1,
    title: "Black Wallet",
    location: "Main Bazaar",
    type: "Lost"
  },
  {
    id: 2,
    title: "Car Keys",
    location: "KDA Park",
    type: "Found"
  }
]

const Community = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">Community Pulse</h2>
          <p className="text-muted-foreground text-lg max-w-2xl italic">"Empowering Kohat through shared information and collective action."</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Social / Forum Block */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-card border border-border rounded-[2rem] overflow-hidden shadow-sm">
              <div className="p-8 border-b border-border flex items-center justify-between bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Recent Discussions</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Active Now</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:scale-105 transition-transform">
                  <Plus className="w-3.5 h-3.5" /> Start Topic
                </button>
              </div>
              
              <div className="divide-y divide-border">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-6 hover:bg-muted/30 transition-colors cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted shrink-0 border-2 border-background" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                          {i === 1 ? "Best fiber internet provider in Satellite Town?" : i === 2 ? "Registration process for Kohat Cricket League?" : "Historical places to visit in Kohat this weekend?"}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="font-bold text-foreground">Sami Ullah</span>
                          <span>•</span>
                          <span>{i * 2} hours ago</span>
                          <span>•</span>
                          <span className="bg-muted px-2 py-0.5 rounded font-medium">{i === 1 ? "Tech" : i === 2 ? "Sports" : "Travel"}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="text-sm font-bold text-foreground">{i * 12 + 5}</div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Replies</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/forum" className="block p-4 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-colors">
                View All Community Discussions
              </Link>
            </div>
          </div>

          {/* Sidebar / Sidebar Dashboard */}
          <div className="lg:col-span-4 space-y-8">
            {/* Announcements */}
            <div className=" bg-zinc-900 text-background  p-8 shadow-xl relative overflow-hidden group">
              <Megaphone className="absolute -top-6 -right-6 w-32 h-32 text-white/20 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                <Megaphone className="w-5 h-5 text-primary" /> Announcements
              </h3>
              <div className="space-y-4 relative z-10">
                {announcements.map((item) => (
                  <div key={item.id} className={cn(
                    "p-4 rounded-2xl border-l-4 transition-all",
                    item.priority === 'high' ? "bg-red-500/10 border-red-500" : "bg-white/5 border-primary"
                  )}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-tighter",
                        item.priority === 'high' ? "text-red-400" : "text-primary"
                      )}>{item.priority === 'high' ? 'Emergency' : 'Notice'}</span>
                      <span className="text-[10px] ">{item.time}</span>
                    </div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-[11px]  leading-tight">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lost & Found */}
            <div className="bg-card border border-border rounded-[2rem] p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                <Search className="w-5 h-5 text-orange-500" /> Lost & Found
              </h3>
              <div className="space-y-3">
                {lostFound.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border/50 group cursor-pointer hover:border-orange-500/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black",
                        item.type === 'Lost' ? "bg-orange-500/10 text-orange-600" : "bg-green-500/10 text-green-600"
                      )}>{item.type[0]}</div>
                      <div>
                        <h4 className="text-sm font-bold leading-none mb-1">{item.title}</h4>
                        <p className="text-[10px] text-muted-foreground">{item.location}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-orange-500 transition-all" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border-2 border-dashed border-border rounded-2xl text-xs font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                + Report Something
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community
