import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { server } from "../../server";

export const loadUserRequest = createAction("LoadUserRequest");
export const loadUserSuccess = createAction("LoadUserSuccess");
export const loadUserFail = createAction("LoadUserFail");

export const updateUserInfoRequest = createAction("updateUserInfoRequest");
export const updateUserInfoSuccess = createAction("updateUserInfoSuccess");
export const updateUserInfoFailed = createAction("updateUserInfoFailed");

export const updateUserAddressRequest = createAction("updateUserAddressRequest");
export const updateUserAddressSuccess = createAction("updateUserAddressSuccess");
export const updateUserAddressFailed = createAction("updateUserAddressFailed");

export const deleteUserAddressRequest = createAction("deleteUserAddressRequest");
export const deleteUserAddressSuccess = createAction("deleteUserAddressSuccess");
export const deleteUserAddressFailed = createAction("deleteUserAddressFailed");

export const getAllUsersRequest = createAction("getAllUsersRequest");
export const getAllUsersSuccess = createAction("getAllUsersSuccess");
export const getAllUsersFailed = createAction("getAllUsersFailed");

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch(updateUserInfoRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      dispatch(updateUserInfoSuccess(data.user));
    } catch (error) {
      dispatch(updateUserInfoFailed(error.response.data.message));
    }
  };

// update user address
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch(updateUserAddressRequest());
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );
      dispatch(updateUserAddressSuccess({
        successMessage: "User address updated succesfully!",
        user: data.user,
      }));
    } catch (error) {
      dispatch(updateUserAddressFailed(error.response.data.message));
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserAddressRequest());
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );
    dispatch(deleteUserAddressSuccess({
      successMessage: "User deleted successfully!",
      user: data.user,
    }));
  } catch (error) {
    dispatch(deleteUserAddressFailed(error.response.data.message));
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());
    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });
    dispatch(getAllUsersSuccess(data.users));
  } catch (error) {
    dispatch(getAllUsersFailed(error.response.data.message));
  }
};