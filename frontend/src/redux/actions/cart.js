import { createAction } from "@reduxjs/toolkit";

export const addToCartAction = createAction("addToCart");
export const removeFromCartAction = createAction("removeFromCart");

// add to cart
export const addToCart = (data) => async (dispatch, getState) => {
    dispatch(addToCartAction(data));
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
    dispatch(removeFromCartAction(data._id));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
};