import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.css";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import { categoriesData } from "../../static/data";
import Navbar from "./Navbar";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { useBackendServer } from "../../contexts/BackendContext";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchResultsRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const [activeHeading] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const backend = useBackendServer();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  useEffect(() => {
    if (allProducts) {
      const filteredProducts = allProducts.filter((product) => {
        const productMatchesSearchTerm = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return productMatchesSearchTerm;
      });
      setSearchData(filteredProducts);
    }
  }, [searchTerm, allProducts]);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className="section">
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div className="">
            <Link to="/">
              <img
                className="logo"
                src={`${backend.uploads}/logo.png`}
                alt=""
                width="150"
                height="36"
              />
            </Link>
          </div>
          <div className="w-[50%] relative" ref={dropdownRef}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3D2217] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchTerm && searchData && searchData.length !== 0 ? (
              <div
                className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3 rounded-md"
                ref={searchResultsRef}
              >
                {searchData.map((i, index) => {
                  return (
                    <Link to={`/product/${i._id}`} key={index}>
                      <div className="flex items-center m-2">
                        <img
                          src={`${backend.uploads}${i.images[0]}`}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-evenly w-full bg-[#3D2217] h-[70px]`}
      >
        <div className={`section relative noramlFlex justify-between`}>
          <div>
            <div
              className="relative h-[50px] m-[10px] w-[220px] hidden 1000px:block cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            >
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className={`absolute right-2 top-4 rotate-arrow ${
                  dropDown ? "active" : ""
                }`}
              />

              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          <div className={`noramlFlex`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`noramlFlex`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(!openCart)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#ddd017] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`noramlFlex`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend.uploads}${user.avatar}`}
                      className="w-[40px] h-[40px]"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
