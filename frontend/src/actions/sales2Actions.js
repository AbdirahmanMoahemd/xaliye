import axios from "axios";
import {
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  RECENT_SALES_LIST_FAIL,
  RECENT_SALES_LIST_REQUEST,
  RECENT_SALES_LIST_SUCCESS,
  SALES_CREATE_FAIL,
  SALES_CREATE_REQUEST,
  SALES_CREATE_SUCCESS,
  SALES_DELETE_FAIL,
  SALES_DELETE_REQUEST,
  SALES_DELETE_SUCCESS,
  SALES_DETAILS_FAIL,
  SALES_DETAILS_REQUEST,
  SALES_DETAILS_SUCCESS,
  SALES_LIST_FAIL,
  SALES_LIST_REQUEST,
  SALES_LIST_SUCCESS,
  SALES_LIST_TOTAL_FAIL,
  SALES_LIST_TOTAL_REQUEST,
  SALES_LIST_TOTAL_SUCCESS,
  SALES_UPDATE_BILLING_FAIL,
  SALES_UPDATE_BILLING_REQUEST,
  SALES_UPDATE_BILLING_SUCCESS,
  SALES_UPDATE_FAIL,
  SALES_UPDATE_REQUEST,
  SALES_UPDATE_SUCCESS,
} from "../constants/sales2Constants";

export const createNewSales =
  (orderItems, customer,phone, date,totalPrice ,invoiceId, isPaid) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: SALES_CREATE_REQUEST,
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
        "/api/Sales2",
        { orderItems, customer,phone, date,totalPrice,invoiceId, isPaid },
        config
      );

      dispatch({
        type: SALES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const addToOrderItems = (id,quantity, price) => async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/store2/${id}`, config)
  
    dispatch({ 
      type: ORDER_ADD_ITEM,
      payload: {
        item: data._id,
        itemName:data.name,
        price,
        quantity,
      },
    })

    // localStorage.setItem('orderItems', JSON.stringify(getState().order.orderItems))
  
    
  }

  export const removeFromOrder = (id) => (dispatch) => {
    dispatch({
      type: ORDER_REMOVE_ITEM,
      payload: id,
    })
  
    // localStorage.setItem('orderItems', JSON.stringify(getState().order.orderItems))
  }


  // export const removeFromOrderAll = () => (dispatch, getState) => {
  //   dispatch({
  //     type: ORDER_REMOVE_ITEM_ALL,
  //   })
  
  //   localStorage.setItem('orderItems', JSON.stringify(getState().order.orderItems))
  // }

export const updateSalesItem =
  (id, item, customer, quantity, price, date, isPaid) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: SALES_UPDATE_REQUEST,
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
        `/api/Sales2/${id}`,
        { item, customer, quantity, price, date, isPaid },
        config
      );

      dispatch({
        type: SALES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateSalesBillingItem =
  (id, isPaid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SALES_UPDATE_BILLING_REQUEST,
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
        `/api/Sales2/sale/billing/${id}`,
        { isPaid },
        config
      );

      dispatch({
        type: SALES_UPDATE_BILLING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_UPDATE_BILLING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSalesItems =
  (keyword = "",  pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SALES_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/Sales2?keyword=${keyword}&pageNumber=${pageNumber}`, config);

      dispatch({
        type: SALES_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSalesByDateRange =
  (keyword = "", startDate, endDate) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SALES_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/Sales2/date/range",
        { startDate, endDate },  
        config
      );

      dispatch({
        type: SALES_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listRecentSales = (keyword = "",  pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: RECENT_SALES_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/Sales2/recent/sales?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({
      type: RECENT_SALES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECENT_SALES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUnPaidSalesItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SALES_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/Sales2/unpaid/sales2", config);

    dispatch({
      type: SALES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPaidSalesItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SALES_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/Sales2/paid/sales2", config);

    dispatch({
      type: SALES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const salesItemDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SALES_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/Sales2/${id}`, config);

    dispatch({
      type: SALES_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSalesItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/Sales2/${id}`, config);

    dispatch({
      type: SALES_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SALES_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSalesTotal = () => async (dispatch, getState) => {
    try {
      dispatch({ type: SALES_LIST_TOTAL_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/Sales2/total/sales', config);
  
      dispatch({
        type: SALES_LIST_TOTAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_LIST_TOTAL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
