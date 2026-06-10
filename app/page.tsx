import Header from "@/components/shared/header";
import Hero from "@/components/landing/hero";
import Trending from "@/components/sections/trending";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <div className="md:grid grid-cols-12">
          <Trending />
          {/* <BreakingNews/> */}
         
        </div>
      </main>
    </div>
  );
}
