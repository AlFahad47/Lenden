import Banner from "@/components/ui/Banner";
import HowItWorksPage from "@/components/ui/HowItWorks";
import AboutPage from "./about/page";
import BannerUser from "@/components/ui/BannerUser";

export default function Home() {
  return (
    <main>
      <Banner />
      <BannerUser />

      <HowItWorksPage />
    </main>
  );
}
