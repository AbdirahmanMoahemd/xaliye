import {
    ORDER_ADD_ITEM,
    ORDER_REMOVE_ITEM,
    ORDER_REMOVE_ITEM_ALL,
    RECENT_SALES_LIST_FAIL,
    RECENT_SALES_LIST_REQUEST,
    RECENT_SALES_LIST_RESET,
    RECENT_SALES_LIST_SUCCESS,
    SALES2_CREATE_FAIL,
    SALES2_CREATE_REQUEST,
    SALES2_CREATE_RESET,
    SALES2_CREATE_SUCCESS,
    SALES_CREATE_FAIL,
    SALES_CREATE_REQUEST,
    SALES_CREATE_RESET,
    SALES_CREATE_SUCCESS,
    SALES_DELETE_FAIL,
    SALES_DELETE_REQUEST,
    SALES_DELETE_SUCCESS,
    SALES_DETAILS_FAIL,
    SALES_DETAILS_REQUEST,
    SALES_DETAILS_SUCCESS,
    SALES_LIST_FAIL,
    SALES_LIST_REQUEST,
    SALES_LIST_RESET,
    SALES_LIST_SUCCESS,
    SALES_LIST_TOTAL_FAIL,
    SALES_LIST_TOTAL_REQUEST,
    SALES_LIST_TOTAL_SUCCESS,
    SALES_UPDATE_BILLING_FAIL,
    SALES_UPDATE_BILLING_REQUEST,
    SALES_UPDATE_BILLING_RESET,
    SALES_UPDATE_BILLING_SUCCESS,
    SALES_UPDATE_FAIL,
    SALES_UPDATE_REQUEST,
    SALES_UPDATE_RESET,
    SALES_UPDATE_SUCCESS,
  } from "../constants/sales2Constants";
  
  export const createSalesReducer2 = (state = {}, action) => {
    switch (action.type) {
      case SALES_CREATE_REQUEST:
        return { loading: true };
      case SALES_CREATE_SUCCESS:
        return { loading: false, success: true, sales: action.payload };
      case SALES_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SALES_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const createSales2Reducer2 = (state = {}, action) => {
    switch (action.type) {
      case SALES2_CREATE_REQUEST:
        return { loading: true };
      case SALES2_CREATE_SUCCESS:
        return { loading: false, success: true, sales: action.payload };
      case SALES2_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SALES2_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const orderReducer2 = (state = { orderItems: [] }, action) => {
    switch (action.type) {
      case ORDER_ADD_ITEM:
        const item = action.payload;
  
        const existItem = state.orderItems.find((x) => x.item === item.item);
        if (existItem) {
          return {
            ...state,
            orderItems: state.orderItems.map((x) =>
              x.item === existItem.item ? item : x
            ),
          };
        } else {
          return {
            ...state,
            orderItems: [...state.orderItems, item],
          };
        }
      case ORDER_REMOVE_ITEM:
        return {
          ...state,
          orderItems: state.orderItems.filter((x) => x.item !== action.payload),
        };
      case ORDER_REMOVE_ITEM_ALL:
        return {
          state,
          orderItems: []
        };
      default:
        return state;
    }
  };
  export const salesListReducer2 = (
    state = { sales: [], orderItems: [], customer: {} },
    action
  ) => {
    switch (action.type) {
      case SALES_LIST_REQUEST:
        return { loading: true };
      case SALES_LIST_SUCCESS:
        return {
          loading: false,
          sales: action.payload.sales,
          salesCount: action.payload.salesCount,
        };
      case SALES_LIST_FAIL:
        return { loading: false, error: action.payload };
      case SALES_LIST_RESET:
        return { sales: [] };
      default:
        return state;
    }
  };
  
  export const salesRecentListReducer2 = (
    state = { sales: [], item: {}, customer: {} },
    action
  ) => {
    switch (action.type) {
      case RECENT_SALES_LIST_REQUEST:
        return { loading: true };
      case RECENT_SALES_LIST_SUCCESS:
        return {
          loading: false,
          sales: action.payload.sales,
        };
      case RECENT_SALES_LIST_FAIL:
        return { loading: false, error: action.payload };
      case RECENT_SALES_LIST_RESET:
        return { sales: [] };
      default:
        return state;
    }
  };
  
  export const salesDetailsReducer2 = (state = { sale: {} }, action) => {
    switch (action.type) {
      case SALES_DETAILS_REQUEST:
        return { loading: true, ...state };
      case SALES_DETAILS_SUCCESS:
        return { loading: false, sale: action.payload };
      case SALES_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const salesUpdateReducer2 = (state = { sale: {} }, action) => {
    switch (action.type) {
      case SALES_UPDATE_REQUEST:
        return { loading: true };
      case SALES_UPDATE_SUCCESS:
        return { loading: false, success: true, sale: action.payload };
      case SALES_UPDATE_RESET:
        return { sale: {} };
      case SALES_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const salesUpdateBillingReducer2 = (state = { sale: {} }, action) => {
    switch (action.type) {
      case SALES_UPDATE_BILLING_REQUEST:
        return { loading: true };
      case SALES_UPDATE_BILLING_SUCCESS:
        return { loading: false, success: true, sale: action.payload };
      case SALES_UPDATE_BILLING_RESET:
        return { sale: {} };
      case SALES_UPDATE_BILLING_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const salesDeleteReducer2 = (state = {}, action) => {
    switch (action.type) {
      case SALES_DELETE_REQUEST:
        return { loading: true };
      case SALES_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SALES_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };



  export const totalSalesReducerCount = (state = { counter: {} }, action) => {
    switch (action.type) {
      case SALES_LIST_TOTAL_REQUEST:
        return { loading: true, counter: {} };
      case SALES_LIST_TOTAL_SUCCESS:
        return {
          loading: false,
          counter: action.payload,
        };
      case SALES_LIST_TOTAL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  