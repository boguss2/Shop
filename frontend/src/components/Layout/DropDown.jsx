import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/styles.css";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-2 w-[220px] top-11 bg-[#fff] absolute z-30 items-center rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
          key={index}
          className={`noramlFlex category`}
          onClick={() => submitHandle(i)}
        >
          <h3 className="m-3 cursor-pointer select-none text-center">
            {i.title}
          </h3>
        </div>
        ))}
    </div>
  );
};

export default DropDown;
