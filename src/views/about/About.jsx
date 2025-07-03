import React from 'react';
import Breadcrumb from '../../components/shared/ui/Breadcrumb';
import AboutArea from '../../components/sections/common/AboutArea';
import CounterArea from '../../components/sections/about/CounterArea';
import FaqArea from '../../components/sections/common/FaqArea';
import TestimonialArea from '../../components/sections/common/TestimonialArea';
import TeamArea from '../../components/sections/about/TeamArea';
import PartnerArea from '../../components/sections/common/PartnerArea';

const About = () => {
  return (
    <>
      <Breadcrumb title="About Us" currentPage="About Us" />
      <AboutArea />
      <CounterArea />
      <FaqArea />
      <TestimonialArea />
      <TeamArea />
      <PartnerArea />
    </>
  );
};

export default About;