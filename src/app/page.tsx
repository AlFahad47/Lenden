import Banner from "@/components/ui/Banner";
import OfferSection from "@/components/ui/OfferSection";
import ProjectDemo from "@/components/ui/ProjectDemo";
import HowItWorksPage from "@/components/ui/HowItWorks";
import KeyFeatures from "@/components/ui/KeyFeatures";
import Menus from "@/components/ui/menus";

export default function Home() {
  return (
   <main>
      <section id="home">
        <Banner />
      </section>

      <section id="menus">
        <Menus />
      </section>

      <section id="offers">
        <OfferSection />
      </section>

      <section id="features">
        <KeyFeatures />
      </section>

      <section id="how">
        <HowItWorksPage />
      </section>

      <section id="demo">
        <ProjectDemo />
      </section>
    </main>
  );
}
