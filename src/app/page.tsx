import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import MeshGradient from "@/components/effects/MeshGradient";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import NoiseOverlay from "@/components/effects/NoiseOverlay";
import HeroSection from "./sections/HeroSection";
import SpecializationStrip from "./sections/SpecializationStrip";
import ServicesSection from "./sections/ServicesSection";
import ToolsSection from "./sections/ToolsSection";
import VenturesSection from "./sections/VenturesSection";
import StatsSection from "./StatsSection";
import PortfolioSection from "./sections/PortfolioSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";

export default function HomePage() {
  return (
    <div className="font-[family-name:var(--font-ibm-plex-mono)] leading-[1.7] overflow-x-hidden relative">
      <ErrorBoundary>
        <MeshGradient />
        <FloatingOrbs />
        <NoiseOverlay />
      </ErrorBoundary>
      <Header />
      <main id="main-content">
        <HeroSection />
        <SpecializationStrip />
        <ServicesSection />
        <ToolsSection />
        <VenturesSection />
        <StatsSection />
        <PortfolioSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
