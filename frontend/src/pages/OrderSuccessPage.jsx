import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  return (
    <div className="justify-center">
      <h5 className="text-center m-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>

      <br />
      <br />

      <div className="text-center">
        <Link to="/" className="text-blue-500">
          Go back to home page
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
