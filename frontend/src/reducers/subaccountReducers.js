import {
    SUBACCOUNT_CREATE_FAIL,
    SUBACCOUNT_CREATE_REQUEST,
    SUBACCOUNT_CREATE_RESET,
    SUBACCOUNT_CREATE_SUCCESS,
    SUBACCOUNT_DELETE_FAIL,
    SUBACCOUNT_DELETE_REQUEST,
    SUBACCOUNT_DELETE_SUCCESS,
    SUBACCOUNT_DETAILS_FAIL,
    SUBACCOUNT_DETAILS_REQUEST,
    SUBACCOUNT_DETAILS_RESET,
    SUBACCOUNT_DETAILS_SUCCESS,
    SUBACCOUNT_LIST_FAIL,
    SUBACCOUNT_LIST_REQUEST,
    SUBACCOUNT_LIST_RESET,
    SUBACCOUNT_LIST_SUCCESS,
    SUBACCOUNT_UPDATE_FAIL,
    SUBACCOUNT_UPDATE_REQUEST,
    SUBACCOUNT_UPDATE_RESET,
    SUBACCOUNT_UPDATE_SUCCESS,
  } from "../constants/subAccountConstants";
  
  export const createSubAccountReducer = (state = {}, action) => {
    switch (action.type) {
      case SUBACCOUNT_CREATE_REQUEST:
        return { loading: true };
      case SUBACCOUNT_CREATE_SUCCESS:
        return { loading: false, success: true, subaccount: action.payload };
      case SUBACCOUNT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SUBACCOUNT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const subAccountsListReducer = (state = { subaccounts: [{ generalAccount:[] }] }, action) => {
    switch (action.type) {
      case SUBACCOUNT_LIST_REQUEST:
        return { loading: true };
      case SUBACCOUNT_LIST_SUCCESS:
        return {
          loading: false,
          subaccounts: action.payload.subaccounts,
        };
      case SUBACCOUNT_LIST_FAIL:
        return { loading: false, error: action.payload };
      case SUBACCOUNT_LIST_RESET:
        return { subaccounts: [] };
      default:
        return state;
    }
  };
  
  export const subAccountDetailsReducer = (state = { subaccount: {}, generalAccount:{} }, action) => {
    switch (action.type) {
      case SUBACCOUNT_DETAILS_REQUEST:
        return { loading: true, ...state };
      case SUBACCOUNT_DETAILS_SUCCESS:
        return { loading: false, subaccount: action.payload };
      case SUBACCOUNT_DETAILS_RESET:
        return { subaccount: {}, generalAccount:{} };
      case SUBACCOUNT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const subAccountUpdateReducer = (state = { subaccount: {} }, action) => {
    switch (action.type) {
      case SUBACCOUNT_UPDATE_REQUEST:
        return { loading: true };
      case SUBACCOUNT_UPDATE_SUCCESS:
        return { loading: false, success: true, subaccount: action.payload };
      case SUBACCOUNT_UPDATE_RESET:
        return { subaccount: {} };
      case SUBACCOUNT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const subAccountDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SUBACCOUNT_DELETE_REQUEST:
        return { loading: true };
      case SUBACCOUNT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SUBACCOUNT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  