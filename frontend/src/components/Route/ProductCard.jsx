import React, { useMemo } from "react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductDetailsCard from "./ProductDetailCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../Ratings";
import { useBackendServer } from "../../contexts/BackendContext";

const ProductCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const backend = useBackendServer();
  const [count] = useState(1);

  const imageUrl = useMemo(() => {
    return `${backend.uploads}/${data.images[0]}`;
  }, [backend, data.images]);

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[400px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={imageUrl}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500] text-center">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <p className="text-center text-sm">
            {data.description ? data.description.split(".")[0] : null}
          </p>
          <div className="flex justify-center">
            <div className="flex">
              <Ratings rating={data.ratings} />
            </div>
          </div>
          <div className="p-4 flex items-center justify-evenly">
            <div className="flex">
              <h4 className="price">{data.price ? data.price : null}</h4>
            </div>
            <div className="flex">
              <p className="stock text-green-400">
                {data.stock ? `Stock: ${data.stock}` : null}
              </p>
            </div>
          </div>
        </Link>

        <div>
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
