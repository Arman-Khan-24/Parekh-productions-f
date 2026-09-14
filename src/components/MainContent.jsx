import React from 'react';
import HeroSection from './sections/HeroSection.jsx';
import PartnersSection from './sections/PartnersSection.jsx';
import IntroVideoSection from './sections/IntroVideoSection.jsx';
import AboutSection from './sections/AboutSection.jsx';
import ServicesSection from './sections/ServicesSection.jsx';
import DestinationsSection from './sections/DestinationsSection.jsx';
import WhyOffsiteioSection from './sections/WhyOffsiteioSection.jsx';
import PricingSection from './sections/PricingSection.jsx';
import ReviewSection from './sections/ReviewSection.jsx';
import CTASection2 from './sections/CTASection2.jsx';
import FaqSection from './sections/FaqSection.jsx';

export default function MainContent() {
  return (
    <div className="main-wrapper">
      <HeroSection />
      <PartnersSection />
      <IntroVideoSection />
      <AboutSection />
      <ServicesSection />
      <DestinationsSection />
      <WhyOffsiteioSection />
      <PricingSection />
      <ReviewSection />
      <CTASection2 />
      <FaqSection />
    </div>
  );
}
