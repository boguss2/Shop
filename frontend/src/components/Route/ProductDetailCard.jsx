import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { useBackendServer } from "../../contexts/BackendContext";
import Ratings from "../Ratings";

const ProductDetailCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const backend = useBackendServer();

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

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[70%] 800px:w-[60%] h-[70vh] overflow-y-scroll 800px:h-[55vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend.uploads}${data.images[0]}`}
                  alt=""
                  className="w-full h-[300px] object-contain"
                />
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className="productTitle text-[20px]">{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <Ratings rating={data?.ratings} />
                </div>
                <div className="flex pt-3">
                  <h1 className="price">{data.price}</h1>
                </div>

                <div className="flex items-center mt-12 mb-6 justify-between pr-3">
                  <div className="flex items-center">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div
                  className="button mt-6 rounded-[4px] h-11 flex items-center justify-center"
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart
                    <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProductDetailCard;
