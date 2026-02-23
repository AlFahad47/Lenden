import Banner from "@/components/ui/Banner";

import BannerUser from "@/components/ui/BannerUser";
import HowItWorksPage from "@/components/ui/HowItWorks";
import KeyFeaturesGrid from "@/components/ui/KeyFeatures";
import KeyFeatures from "@/components/ui/KeyFeatures";
import Menus from "@/components/ui/menus";



export default function Home() {
  return (
    <main>
      {/* <Banner /> */}
  
      <BannerUser />
          <Menus/>
      <KeyFeatures/>

      <HowItWorksPage />
    </main>
  );
}
