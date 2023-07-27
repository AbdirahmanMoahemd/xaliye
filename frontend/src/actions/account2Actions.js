import axios from "axios";
import {
  ACCOUNT_CREATE_FAIL,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
} from "../constants/account2Constants";

export const createNewAccount =
  (accountName, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACCOUNT_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/account2",
        { accountName, description },
        config
      );

      dispatch({
        type: ACCOUNT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateAccount =
  (id, accountName, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACCOUNT_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/account2/${id}`,
        { accountName, description },
        config
      );

      dispatch({
        type: ACCOUNT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listAccounts = (keyword = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCOUNT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/account2?keyword=${keyword}`, config);

    dispatch({
      type: ACCOUNT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAccountDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCOUNT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/account2/${id}`, config);

    dispatch({
      type: ACCOUNT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAccount = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/account2/${id}`, config);

    dispatch({
      type: ACCOUNT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ACCOUNT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
