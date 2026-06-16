import React from 'react';
import Hero from '../section/Hero';
import StatsBar from '../section/StatsBar';
import FeaturesPreview from '../section/FeaturesPreview';
import HowItWorksPreview from '../section/HowItWorksPreview';
import RolesSection from '../section/RolesSection';
import WasteTypesSection from '../section/WasteTypesSection';
import TestimonialsSection from '../section/TestimonialsSection';
import CtaSection from '../section/CtaSection';

const Home = () => {
  return (
    <div className="inter">
      <Hero />
      <StatsBar />
      <FeaturesPreview />
      <HowItWorksPreview />
      <RolesSection />
      <WasteTypesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default Home;
