import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  HomePage,
  ProductsPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  OrderDetailsPage,
} from "./routes/Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import { useSelector } from "react-redux";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { BackendProvider } from './contexts/BackendContext.js';
import {
  AdminDashboardPage,
  AdminCreateProduct,
  AdminDashboardProducts,
  AdminDashboardOrders,
  AdminDashboardUsers,
  AdminOrderDetailsPage,
  AdminDashboardReviews,
  AdminUpdateProduct,
} from "./routes/AdminRoutes.js";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const backend = {
    uploads: `http://localhost:8000/`,
    api: `http://localhost:8000/api/v2`,
  };

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <BackendProvider backend={backend}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
         <Route
              path="/payment"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
             <Route path="/order/success" element={<OrderSuccessPage />} />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-create-product"
          element={
            <ProtectedAdminRoute>
              <AdminCreateProduct />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-update-product/:id"
          element={
            <ProtectedAdminRoute>
              <AdminUpdateProduct />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-reviews"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardReviews />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedAdminRoute>
              <AdminOrderDetailsPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
    </BackendProvider>
  );
};

export default App;
