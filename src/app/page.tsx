import Banner from "@/components/ui/Banner";
import HowItWorksPage from "@/components/ui/HowItWorks";
import AboutPage from "./about/page";
import BannerUser from "@/components/ui/BannerUser";
import KeyFeaturesGrid from "@/components/ui/KeyFeatures";
import KeyFeatures from "@/components/ui/KeyFeatures";

export default function Home() {
  return (
    <main>
      <Banner />
      <BannerUser />

      <HowItWorksPage />
      <KeyFeatures />
    </main>
  );
}
