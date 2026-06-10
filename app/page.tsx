import Header from "@/components/shared/header";
import Hero from "@/components/landing/hero";
import Emergency from "@/components/sections/emergency";
import Trending from "@/components/sections/trending";
import DealsBanner from "@/components/sections/deals";
import PromotedListings from "@/components/sections/promoted";
import Shops from "@/components/sections/shops";
import Services from "@/components/sections/services";
import Jobs from "@/components/sections/jobs";
import Community from "@/components/sections/community";
import DonateBlood from "@/components/sections/donate-blood";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Emergency />
        <div className="md:grid grid-cols-12  container  mx-auto px-4 ">
          <Trending />
        </div>
        <DealsBanner />
        <PromotedListings />

        <Shops />
        <Services />
        <Jobs />
        <Community />
        <DonateBlood />
      </main>
      <Footer />
    </div>
  );
}
