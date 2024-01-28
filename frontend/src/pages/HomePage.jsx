import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero";
import FeaturedProduct from "../components/Route/FeaturedProduct";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        <FeaturedProduct />
        <Footer />
    </div>
  )
}

export default HomePage