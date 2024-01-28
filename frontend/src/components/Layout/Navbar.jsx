import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import "../../styles/styles.css";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <div className={`block noramlFlex`}>
      {navItems &&
        navItems.map((i) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                location.pathname === i.url
                  ? "text-[#ddd017]"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
