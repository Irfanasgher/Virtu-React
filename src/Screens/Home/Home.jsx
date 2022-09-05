import React from "react";
import Navbar from "../../Components/Navbar";
import Banner from "../../Components/Banner";
import AboutVirtu from "../../Components/AboutVirtu";
import Features from "../../Components/Features";
import Slider from "../../Components/Slider";
import Footer from "../../Components/Footer";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <AboutVirtu />
      <Features />
      <Slider />
      <Footer />
    </div>
  );
};
export default Home;
