import Banner from "@/components/ui/Banner";
import OfferSection from "@/components/ui/OfferSection";
import ProjectDemo from "@/components/ui/ProjectDemo";
import HowItWorksPage from "@/components/ui/HowItWorks";
import KeyFeatures from "@/components/ui/KeyFeatures";
import Menus from "@/components/ui/menus";

export default function Home() {
  return (
    <main className="bg-white dark:bg-[#04090f]">
      <Banner />
      <Menus />
      <OfferSection />
      <KeyFeatures />
      <HowItWorksPage />
      <ProjectDemo />
    </main>
  );
}
