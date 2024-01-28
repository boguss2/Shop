import React, { useState } from "react";
import { Country, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Formik, Field, Form } from "formik";
import "../../styles/styles.css";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shipping] = useState(10);
  const [price] = useState(0);
  const [selectedShippingOption, setSelectedShippingOption] = useState(10);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleShippingOptionChange = (shippingCost) => {
    setSelectedShippingOption(shippingCost);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSubTotalPrice(
      cart.reduce((acc, item) => acc + item.qty * item.price, 0)
    );
  }, [cart]);

  const paymentSubmit = () => {
    if (address1 === "" || zipCode === null || country === "" || city === "") {
      toast.error("Please choose your delivery address!");
    } else if (user && !user.email) {
      toast.error("Please provide your email, full name, and phone number!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        price,
        shippingAddress,
        user,
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const totalPrice = (subTotalPrice + selectedShippingOption).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            handleShippingOptionChange={handleShippingOptionChange}
            selectedShippingOption={selectedShippingOption}
          />
        </div>
      </div>
      <div className="800px:w-[280px] mt-10" onClick={paymentSubmit}>
        <h5 className="button text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <Formik
        initialValues={{
          zipCode: zipCode,
          country: country,
          city: city,
          address1: address1,
          address2: address2,
        }}
        onSubmit={(values) => {
          setAddress1(values.address1);
          setAddress2(values.address2);
          setZipCode(values.zipCode);
          setCountry(values.country);
          setCity(values.city);
        }}
      >
        <Form>
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Full Name</label>
              <Field
                type="text"
                name="fullName"
                value={user && user.name}
                className="input !w-[95%]"
                disabled
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Email Address</label>
              <Field
                type="email"
                name="email"
                value={user && user.email}
                className="input !w-[95%]"
                disabled
              />
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <Field
                type="number"
                required
                value={user && user.phoneNumber}
                className="input !w-[95%]"
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Zip Code</label>
              <Field
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                className="input !w-[95%]"
              />
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Country</label>
              <select
                className="!w-[95%] border h-[40px] input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option className="block pb-2" value="">
                  Choose your country
                </option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">City</label>
              <select
                className="!w-[95%] border h-[40px] input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option className="block pb-2" value="">
                  Choose your City
                </option>
                {City &&
                  City.getCitiesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Address1</label>
              <Field
                type="address"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="input !w-[95%]"
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Address2</label>
              <Field
                type="address"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="input !w-[95%]"
              />
            </div>
          </div>

          <div></div>
        </Form>
      </Formik>
    </div>
  );
};

const CartData = ({
  totalPrice,
  subTotalPrice,
  handleShippingOptionChange,
  selectedShippingOption,
}) => {
  const shippingCost = selectedShippingOption;

  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shippingCost.toFixed(2)}</h5>
      </div>
      <br />
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      <br />
      {/* Shipping options */}
      <div>
        <h3 className="text-[16px] font-[500] pb-2">Shipping Options:</h3>
        <div className="flex items-center mb-3">
          <input
            type="radio"
            id="standardShipping"
            name="shippingOption"
            value="standard"
            onChange={() => handleShippingOptionChange(10)}
            checked={selectedShippingOption === 10}
          />
          <label htmlFor="standardShipping" className="ml-2">
            Standard Shipping (+$10)
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="expressShipping"
            name="shippingOption"
            value="express"
            onChange={() => handleShippingOptionChange(15)}
            checked={selectedShippingOption === 15}
          />
          <label htmlFor="expressShipping" className="ml-2">
            Express Shipping (+$15)
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
