import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from "react";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "Product 1",
      description: "test",
      price: 100,
    },
    {
      name: "Product 2",
      description: "test",
      price: 150,
    },
    {
      name: "Product 3",
      description: "test",
      price: 130,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between">
        <div>
          <div className="flex w-full justify-end pt-5 pr-3">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>

        <div className="px-5 mb-3">
          <Link to="/checkout">
            <div className="bg-[#e44343] rounded-[5px] w-100% h-[45px] flex items-center justify-center cursor-pointer">
              <h1 className="text-[#fff] font-[600] text-[18px]">
                Checkout (USD$1080)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} />
          </div>
          <span className="pl-[10px] items-center justify-center">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] justify-center cursor-pointer flex items-center"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src="https://www.skleptonsil.pl/img/products/17/27/2_max.jpg"
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            {data.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] text-[#d02222] font-Roboto">
            {" "}
            US${totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer ml-auto" size={25} />
      </div>
    </div>
  );
};
export default Cart;
