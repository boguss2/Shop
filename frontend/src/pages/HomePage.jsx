import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero";
import Categories from "../components/Route/Categories";
import FeaturedProduct from "../components/Route/FeaturedProduct";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        <Categories />
        <FeaturedProduct />
        <Footer />
    </div>
  )
}

export default HomePage