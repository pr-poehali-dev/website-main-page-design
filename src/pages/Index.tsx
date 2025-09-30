import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TemplatesSection from '@/components/TemplatesSection';
import CalculatorSection from '@/components/CalculatorSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream via-primary-light/20 to-accent-light-blue/30">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <CalculatorSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;