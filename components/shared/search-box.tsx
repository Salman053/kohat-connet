import { MapPin, Search } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const SearchBox = () => {
    return (
        <div className="w-full max-w-4xl p-2 bg-background/40 backdrop-blur-2xl border border-white/20 shadow-xl flex flex-col md:flex-row gap-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000 fill-mode-both">
            <div className="flex-1 flex items-center px-4 py-4 gap-4 bg-background/20 border border-white/10">
                <Search className="h-6 w-6 text-primary" />
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full bg-transparent outline-none text-base font-semibold placeholder:text-muted-foreground/60"
                />
            </div>
            <div className="h-px md:h-10 w-full md:w-px bg-white/10 my-auto hidden md:block" />
            <div className="flex-1 flex items-center px-4 py-4 gap-4 bg-background/20 border border-white/10">
                <MapPin className="h-6 w-6 text-primary" />
                <input
                    type="text"
                    placeholder="KDA, City, or Cantt"
                    className="w-full bg-transparent outline-none text-base font-semibold placeholder:text-muted-foreground/60"
                />
            </div>
            <Button size="sm" className="h-auto  px-5 font-bold text-xs shadow-xl shadow-primary/20 transition-all">
                Search Now
            </Button>
        </div>
    )
}

export default SearchBox