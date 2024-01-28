import React from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'
import AdminSideBar from '../../components/Admin/Layout/AdminSideBar'
import UpdateProduct from "../../components/Admin/UpdateProduct.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AdminDashboardProducts = () => {
      
  const { allProducts } = useSelector((state) => state.product);
  const { id } = useParams();
  const [data, setData] = useState(null);
    
  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i._id === id);
    setData(data);
  }, [allProducts, id]);
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={''} />
        </div>
        <UpdateProduct   data={data}/>
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardProducts