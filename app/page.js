import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-paper">
      <Nav />
      <Hero />
      <Trust />
      <Services />
      <HowItWorks />
      <Gallery />
      <Booking />
      <FAQ />
      <Footer />
    </main>
  );
}
