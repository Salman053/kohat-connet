import { cn } from '@/lib/utils'
import { IconMap } from '@/lib/icon-map'
import { Button } from '@/components/ui/button'
import { urgentNeeds, bloodBanks, stats, urgencyColors } from '@/lib/donate-blood-data'
import { Heart, AlertCircle, Clock, Building2, Star, ArrowRight, Zap, Plus, Shield, Users, TrendingUp, Phone, Droplet } from 'lucide-react'
import { DonorList } from './donate-blood-list'

// Sub-components to keep the main component cleaner
const StatisticCard = ({ stat }: { stat: any }) => {
  const Icon = IconMap[stat.icon] || Heart;
  return (
    <div className="relative group bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-red-500/10 flex items-center justify-center mb-3 sm:mb-4">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">{stat.value}</div>
        <div className="text-xs sm:text-sm font-semibold text-foreground mb-1">{stat.label}</div>
        <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1">
          <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
          {stat.change}
        </div>
      </div>
    </div>
  );
};

export default function DonateBlood() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4 sm:mb-6">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
            <span className="text-xs sm:text-sm font-semibold text-red-500">Save Lives Today</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-foreground mb-4 sm:mb-6">
            Blood Donor
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Network
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Connecting donors and recipients across Kohat. Every donation can save up to three lives.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {stats.map((stat, idx) => (
            <StatisticCard key={idx} stat={stat} />
          ))}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Donor List (Client Component) */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <DonorList />
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
            {/* Urgent Needs */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Urgent Needs</h3>
                    <p className="text-[10px] sm:text-xs text-white/70">Immediate response required</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {urgentNeeds.map((need, i) => {
                    const urgency = urgencyColors[need.urgency as keyof typeof urgencyColors]
                    return (
                      <div 
                        key={i} 
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-white/15 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-white mb-1 truncate">{need.hospital}</div>
                            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-white/70 flex-wrap">
                              <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>{need.patients} patient{need.patients > 1 ? 's' : ''}</span>
                              <span className="hidden sm:inline">•</span>
                              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>{need.time}</span>
                            </div>
                          </div>
                          <div className={cn(
                            "px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold border ml-2 whitespace-nowrap",
                            urgency.bg, urgency.text, urgency.border
                          )}>
                            {need.urgency.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="text-[10px] sm:text-xs text-white/60">Blood Type Needed</span>
                          <span className="text-base sm:text-lg font-black text-white bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg">
                            {need.blood}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Button className="w-full mt-4 bg-white text-red-600 hover:bg-white/90 font-bold gap-2 text-sm sm:text-base">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Respond Now
                </Button>
              </div>
            </div>

            {/* Blood Banks */}
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">Certified Blood Banks</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">24/7 services available</p>
                </div>
              </div>

              <div className="space-y-3">
                {bloodBanks.map((bank, i) => (
                  <div 
                    key={i}
                    className="group p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50 hover:bg-muted border border-transparent hover:border-border transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                        {bank.name}
                      </h4>
                      <div className="flex items-center gap-1 bg-yellow-50 px-1.5 sm:px-2 py-0.5 rounded self-start sm:self-auto">
                        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] sm:text-xs font-bold">{bank.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>{bank.phone}</span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="truncate">{bank.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 gap-2 text-sm sm:text-base">
                View All Banks
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                How It Works
              </h3>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Register", desc: "Sign up as a donor" },
                  { step: "2", title: "Get Matched", desc: "We find recipients near you" },
                  { step: "3", title: "Donate", desc: "Save lives at certified centers" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-foreground">{item.title}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-3 sm:mb-4">
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">Become a Hero</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 leading-tight">
                Register as a Donor Today
              </h3>
              <p className="text-white/80 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                Join thousands of life-savers in Kohat. Your single donation can save up to three lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 font-bold px-6 sm:px-8 gap-2 text-sm sm:text-base">
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Register Now
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-bold px-6 sm:px-8 text-sm sm:text-base">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Heart className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 text-white fill-white animate-pulse" />
                </div>
                <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Droplet className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Users className="w-7 sm:w-10 h-7 sm:h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}