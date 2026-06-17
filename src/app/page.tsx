import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Timeline } from "@/components/Timeline";
import { Program } from "@/components/Program";
import { Sponsors } from "@/components/Sponsors";
import { Archive } from "@/components/Archive";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Program />
        <Sponsors />
        <Archive />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
