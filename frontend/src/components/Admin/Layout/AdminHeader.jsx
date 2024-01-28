import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useBackendServer } from "../../../contexts/BackendContext";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);
  const backend = useBackendServer();

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
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
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <img
            src={user ? `${backend.uploads}${user.avatar}` : ""}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
