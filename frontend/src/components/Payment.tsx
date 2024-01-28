import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import axios from "axios";
import {useBackendServer} from "../contexts/BackendContext";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Order {
  cart: any;
  shippingAddress: any;
  user: any;
  totalPrice: number | undefined;
  paymentInfo: {
    type: string;
  };
}

const Payment: React.FC = () => {
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const backend = useBackendServer();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder") || "[]");
    setOrderData(orderData);
  }, []);

  const cashOnDeliveryHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const order: Order = {
      cart: orderData?.cart || [],
      shippingAddress: orderData?.shippingAddress || {},
      user: user || {},
      totalPrice: orderData?.totalPrice || 0,
      paymentInfo: {
        type: "Cash On Delivery",
      },
    };

    try {
      await axios.post(`${backend.api}/order/create-order`, order, config);
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

interface PaymentInfoProps {
  cashOnDeliveryHandler: (e: React.FormEvent) => void;
  user: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  cashOnDeliveryHandler,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cashOnDeliveryHandler(e);
  };

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div className=" flex items-center justify-center">
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="Cash On Delivery"
              checked={paymentMethod === "Cash On Delivery"}
              onChange={handlePaymentMethodChange}
            />
          </div>
          <label
            htmlFor="cashOnDelivery"
            className="text-[18px] pl-2 font-[600] text-[#000000b1]"
          >
            Cash on Delivery
          </label>
        </div>

        <div className="w-full flex">
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="submit"
              value="Confirm"
              className={`button !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

interface CartDataProps {
  orderData: any;
}

const CartData: React.FC<CartDataProps> = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
