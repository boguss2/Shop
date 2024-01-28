import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";
import "../../styles/styles.css";

const FeaturedProduct = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <div className='section pt-10'>
        <div className='heading'>
          <h1>Featured Products</h1>
        </div>
        <div className='section'>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {allProducts &&
              allProducts
                .slice(0, 10)
                .map((item, index) => <ProductCard key={index} data={item} />)}
          </div>
          {allProducts && allProducts.length === 0 ? (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
