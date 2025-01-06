import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { Card } from "./components/Card";
import { WeOffer } from "./components/WeOffer";
import { ElectronicsFeature } from "./components/ElectronicsFeature";
import { Testimonial } from "./components/Testimonial";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Card />
      <WeOffer />
      <ElectronicsFeature />
      <Testimonial />
      <Faq />
      <Footer />
    </div>
  );
}
