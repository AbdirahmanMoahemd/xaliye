import axios from "axios";
import {  CUSTOMER_CREATE_FAIL, CUSTOMER_CREATE_REQUEST, CUSTOMER_CREATE_SUCCESS, CUSTOMER_DELETE_FAIL, CUSTOMER_DELETE_REQUEST, CUSTOMER_DELETE_SUCCESS, CUSTOMER_DETAILS_FAIL, CUSTOMER_DETAILS_REQUEST, CUSTOMER_DETAILS_SUCCESS, CUSTOMER_LIST_FAIL, CUSTOMER_LIST_REQUEST, CUSTOMER_LIST_SUCCESS, CUSTOMER_LIST_TOTAL_FAIL, CUSTOMER_LIST_TOTAL_REQUEST, CUSTOMER_LIST_TOTAL_SUCCESS, CUSTOMER_UPDATE_FAIL, CUSTOMER_UPDATE_REQUEST, CUSTOMER_UPDATE_SUCCESS, MY_TASKS_LIST_FAIL, MY_TASKS_LIST_REQUEST, MY_TASKS_LIST_SUCCESS } from "../constants/customersConstants";

export const createNewCustomer =
  (name, phone) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_CREATE_REQUEST,
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
        '/api/customers',
        { name, phone, tasks:[] },
        config
      );

      dispatch({
        type: CUSTOMER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const updateCustomer = (id,custID,name, phone) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_UPDATE_REQUEST,
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
        `/api/customers/${id}`,
        {custID,name, phone, tasks:[]},
        config
      );
  
      dispatch({
        type: CUSTOMER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }; 
  


  export const listCustomers = (keyword2 = "", pageNumber = '') => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/customers?keyword2=${keyword2}&pageNumber=${pageNumber}`, config);
  
      dispatch({
        type: CUSTOMER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const listCustomersByDateRange = (keyword2 = "",startDate, endDate) => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/customers/date/range?keyword2=${keyword2}`, {startDate, endDate}, config);
  
      dispatch({
        type: CUSTOMER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const listMyTasks = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: MY_TASKS_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/customers/mytasks/${id}`, config);
  
      dispatch({
        type: MY_TASKS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MY_TASKS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };



  export const listCustomerDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/customers/${id}`, config);
   
      dispatch({
        type: CUSTOMER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const deleteCustomer = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/customers/${id}`, config);
  
      dispatch({
        type: CUSTOMER_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getCustomerTotal = () => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_LIST_TOTAL_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/customers/total/customer', config);
  
      dispatch({
        type: CUSTOMER_LIST_TOTAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CUSTOMER_LIST_TOTAL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };