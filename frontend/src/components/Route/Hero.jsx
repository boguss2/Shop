import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.css";

const Hero = () => {
  const heroRef = useRef();
  const [imageWidth, setImageWidth] = useState(null);

  useLayoutEffect(() => {
    const updateImageWidth = () => {
      if (heroRef.current) {
        const newImageWidth = heroRef.current.offsetWidth;
        setImageWidth(newImageWidth);
      }
    };

    window.addEventListener("resize", updateImageWidth);
    updateImageWidth();

    return () => {
      window.removeEventListener("resize", updateImageWidth);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat noramlFlex`}
      style={{
        backgroundImage:
          "url(https://c1.wallpaperflare.com/path/566/351/653/bakery-indoors-bread-shelves-farmer-s-bread-1c7966aa301e5e6a992d1d9bfd94a609.jpg)",
        backgroundSize: `cover`,
        backgroundPosition: `center center`,
        width: imageWidth ? `${imageWidth}px` : "100%", // Set width based on the calculated imageWidth
      }}
    >
      <div className={`section w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-white font-[600] capitalize`}
        >
          Best Supply for <br /> Fresh Bread Delights
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-gray-300">
          Explore our artisanal bread selection, featuring a variety of bread
          rolls, baguettes, <br />
          pastries, and more. Savor the delightful taste of freshly baked
          goodness, crafted <br />
          with passion and expertise. Whether you prefer a crispy baguette or a
          soft pastry, <br />
          our collection promises a journey of exquisite flavors and textures.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`button mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
