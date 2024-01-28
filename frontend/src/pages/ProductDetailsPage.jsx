import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/ProductDetails";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const ProductDetailsPage = () => {
  
  const { allProducts } = useSelector((state) => state.product);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i._id === id);
    setData(data);
  }, [allProducts, id]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;