import axios from "axios";
import {
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_SUCCESS,
} from "../constants/transactions2Constants";

export const createNewTransaction =
  (Account, subAccount, Amount, date, ref) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRANSACTION_CREATE_REQUEST,
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
        "/api/transaction2",
        { Account, subAccount, Amount, date, ref },
        config
      );

      dispatch({
        type: TRANSACTION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateTransaction =
  (id, Account, subAccount, Amount, date, ref) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRANSACTION_UPDATE_REQUEST,
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
        `/api/transaction2/${id}`,
        { Account, subAccount, Amount, date, ref },
        config
      );

      dispatch({
        type: TRANSACTION_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/transaction2', config);

    dispatch({
      type: TRANSACTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listTransactionsByRangeDate = (startDate, endDate) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/transaction2/date/range',{startDate, endDate}, config);

    dispatch({
      type: TRANSACTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};





export const listTransactionetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/transaction2/${id}`, config);

    dispatch({
      type: TRANSACTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTransaction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/transaction2/${id}`, config);

    dispatch({
      type: TRANSACTION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
