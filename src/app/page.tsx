import Banner from "@/components/ui/Banner";
import AboutPage from "./about/page";
import OfferSection from "@/components/ui/OfferSection";
import ProjectDemo from "@/components/ui/ProjectDemo";

import BannerUser from "@/components/ui/BannerUser";
import HowItWorksPage from "@/components/ui/HowItWorks";
import KeyFeatures from "@/components/ui/KeyFeatures";
import Menus from "@/components/ui/menus";



export default function Home() {
  return (
    <main>
      <Banner />
      <OfferSection />
       <ProjectDemo />

      {/* <Banner /> */}
  
      <BannerUser />
          <Menus/>
      <KeyFeatures/>

      <HowItWorksPage />
    </main>
  );
}
