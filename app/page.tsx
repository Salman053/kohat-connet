import Header from "@/components/shared/header";
import Hero from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
