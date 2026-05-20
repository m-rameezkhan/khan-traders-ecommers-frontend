import Hero from "../../components/home/Hero";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import Categories from "../../components/home/Categories";
import Testimonials from "../../components/home/Testimonials";
import CallToAction from "../../components/home/CallToAction";
import SpecialOffers from "../../components/home/SpecialOffers";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <SpecialOffers />
      <FeaturedProducts />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Home;
