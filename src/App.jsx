import { Navbar } from "./components/Navbar";
import { HeroVideo } from "./components/HeroVideo";
import { Manifesto } from "./components/Manifesto";
import { ThreeColumnFeature } from "./components/ThreeColumnFeature";
import { Ticker } from "./components/Ticker";
import { ServicesAccordion } from "./components/ServicesAccordion";
import { StudioShowcase } from "./components/StudioShowcase";
import { ClientDossiers } from "./components/ClientDossiers";
import { LocationMap } from "./components/LocationMap";
import { Footer } from "./components/Footer";

export default function App() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      <Navbar onContactClick={scrollToContact} />
      <main className="w-full">
        <HeroVideo />
        <Manifesto />
        <ThreeColumnFeature />
        <Ticker />
        <ServicesAccordion />
        <StudioShowcase />
        <ClientDossiers />
        <LocationMap />
      </main>
      <Footer />
    </div>
  );
}
