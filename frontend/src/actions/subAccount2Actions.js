import axios from "axios";
import {
  SUBACCOUNT_CREATE_FAIL,
  SUBACCOUNT_CREATE_REQUEST,
  SUBACCOUNT_CREATE_SUCCESS,
  SUBACCOUNT_DELETE_FAIL,
  SUBACCOUNT_DELETE_REQUEST,
  SUBACCOUNT_DELETE_SUCCESS,
  SUBACCOUNT_DETAILS_FAIL,
  SUBACCOUNT_DETAILS_REQUEST,
  SUBACCOUNT_DETAILS_SUCCESS,
  SUBACCOUNT_LIST_FAIL,
  SUBACCOUNT_LIST_REQUEST,
  SUBACCOUNT_LIST_SUCCESS,
  SUBACCOUNT_UPDATE_FAIL,
  SUBACCOUNT_UPDATE_REQUEST,
  SUBACCOUNT_UPDATE_SUCCESS,
} from "../constants/subAccount2Constants";

export const createNewSubAccount =
  (accountName, generalAccount, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBACCOUNT_CREATE_REQUEST,
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
        "/api/subaccount2",
        { accountName,generalAccount, description },
        config
      );

      dispatch({
        type: SUBACCOUNT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBACCOUNT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateSubAccount =
  (id, accountName,generalAccount, description) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBACCOUNT_UPDATE_REQUEST,
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
        `/api/subaccount2/${id}`,
        { accountName,generalAccount, description },
        config
      );

      dispatch({
        type: SUBACCOUNT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBACCOUNT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSubAccounts = (keyword = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBACCOUNT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/subaccount2?keyword=${keyword}`, config);

    dispatch({
      type: SUBACCOUNT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBACCOUNT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSubAccountDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBACCOUNT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/subaccount2/${id}`, config);

    dispatch({
      type: SUBACCOUNT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBACCOUNT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubAccount = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBACCOUNT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/subaccount2/${id}`, config);

    dispatch({
      type: SUBACCOUNT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SUBACCOUNT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
