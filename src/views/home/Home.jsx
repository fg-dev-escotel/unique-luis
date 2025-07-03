import HeroSlider from '../../components/sections/home/HeroSlider';
import FindCarForm from '../../components/sections/home/FindCarForm';
import FeatureArea from '../../components/sections/home/FeatureArea';
import AboutArea from '../../components/sections/common/AboutArea';
import CarArea from '../../components/sections/home/CarArea';
import ProcessArea from '../../components/sections/home/ProcessArea';
import ChooseArea from '../../components/sections/home/ChooseArea';
import FaqArea from '../../components/sections/common/FaqArea';
import TestimonialArea from '../../components/sections/common/TestimonialArea';
import PartnerArea from '../../components/sections/common/PartnerArea';
import BlogArea from '../../components/sections/common/BlogArea';

const Home = () => {
  return (
    <>
      <HeroSlider />
      <FindCarForm />
      <FeatureArea />
      <AboutArea />
      <CarArea />
      <ProcessArea />
      <ChooseArea />
      <FaqArea />
      <TestimonialArea />
      <PartnerArea />
      <BlogArea />
    </>
  );
};

export default Home;