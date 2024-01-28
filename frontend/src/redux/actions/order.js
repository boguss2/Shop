import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { server } from "../../server";

export const getAllOrdersUserRequest = createAction("getAllOrdersUserRequest");
export const getAllOrdersUserSuccess = createAction("getAllOrdersUserSuccess");
export const getAllOrdersUserFailed = createAction("getAllOrdersUserFailed");

export const adminAllOrdersRequest = createAction("adminAllOrdersRequest");
export const adminAllOrdersSuccess = createAction("adminAllOrdersSuccess");
export const adminAllOrdersFailed = createAction("adminAllOrdersFailed");

// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  // Inside getAllOrdersOfUser action
  try {
    dispatch(getAllOrdersUserRequest());

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`,
      {
        withCredentials: true,
      }
    );
    console.log("Orders data received in action:", data.orders); // Log the received data
    dispatch(getAllOrdersUserSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersUserFailed(error.response.data.message));
  }
};

// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());

    const { data } = await axios.get(`${server}/order/get-all-orders`, {
      withCredentials: true,
    });
    console.log("Orders data received in action:", data.orders); // Log the received data

    dispatch(adminAllOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(adminAllOrdersFailed(error.response.data.message));
  }
};
