import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useBackendServer } from "../../contexts/BackendContext";
import "../../styles/Sidebar.scss";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const backend = useBackendServer();
  const { user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios
      .get(`${backend.api}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="navContainer">
    <div className={`navButton ${active === 1 ? "active" : ""}`} onClick={() => setActive(1)}>
      <RxPerson size={20} />
      <span>Profile</span>
    </div>
    
    <div className={`navButton ${active === 2 ? "active" : ""}`} onClick={() => setActive(2)}>
      <HiOutlineShoppingBag size={20}/>
      <span>Orders</span>
    </div>
  
    {user && user?.role === "Admin" && (
      <Link to="/admin/dashboard">
        <div className={`navButton ${active === 3 ? "active" : ""}`}>
          <MdOutlineAdminPanelSettings size={20}/>
          <span>Admin Dashboard</span>
        </div>
      </Link>
    )}
  
    <div className={`navButton ${active === 4 ? "active" : ""}`} onClick={logoutHandler}>
      <AiOutlineLogin size={20}/>
      <span>Log out</span>
    </div>
  </div>
  
  );
};

export default ProfileSidebar;
