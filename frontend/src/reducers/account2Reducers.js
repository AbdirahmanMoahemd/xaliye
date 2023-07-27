import {
    ACCOUNT_CREATE_FAIL,
    ACCOUNT_CREATE_REQUEST,
    ACCOUNT_CREATE_RESET,
    ACCOUNT_CREATE_SUCCESS,
    ACCOUNT_DELETE_FAIL,
    ACCOUNT_DELETE_REQUEST,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DETAILS_FAIL,
    ACCOUNT_DETAILS_REQUEST,
    ACCOUNT_DETAILS_RESET,
    ACCOUNT_DETAILS_SUCCESS,
    ACCOUNT_LIST_FAIL,
    ACCOUNT_LIST_REQUEST,
    ACCOUNT_LIST_RESET,
    ACCOUNT_LIST_SUCCESS,
    ACCOUNT_UPDATE_FAIL,
    ACCOUNT_UPDATE_REQUEST,
    ACCOUNT_UPDATE_RESET,
    ACCOUNT_UPDATE_SUCCESS,
  } from "../constants/account2Constants";
  
  export const createAccountReducer2 = (state = {}, action) => {
    switch (action.type) {
      case ACCOUNT_CREATE_REQUEST:
        return { loading: true };
      case ACCOUNT_CREATE_SUCCESS:
        return { loading: false, success: true, account: action.payload };
      case ACCOUNT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ACCOUNT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const accountsListReducer2 = (state = { accounts: [] }, action) => {
    switch (action.type) {
      case ACCOUNT_LIST_REQUEST:
        return { loading: true };
      case ACCOUNT_LIST_SUCCESS:
        return {
          loading: false,
          accounts: action.payload.accounts,
        };
      case ACCOUNT_LIST_FAIL:
        return { loading: false, error: action.payload };
      case ACCOUNT_LIST_RESET:
        return { accounts: [] };
      default:
        return state;
    }
  };
  
  export const accountDetailsReducer2 = (state = { account: {} }, action) => {
    switch (action.type) {
      case ACCOUNT_DETAILS_REQUEST:
        return { loading: true, ...state };
      case ACCOUNT_DETAILS_SUCCESS:
        return { loading: false, account: action.payload };
      case ACCOUNT_DETAILS_RESET:
        return { account: {} };
      case ACCOUNT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const accountUpdateReducer2 = (state = { account: {} }, action) => {
    switch (action.type) {
      case ACCOUNT_UPDATE_REQUEST:
        return { loading: true };
      case ACCOUNT_UPDATE_SUCCESS:
        return { loading: false, success: true, account: action.payload };
      case ACCOUNT_UPDATE_RESET:
        return { account: {} };
      case ACCOUNT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const accountDeleteReducer2 = (state = {}, action) => {
    switch (action.type) {
      case ACCOUNT_DELETE_REQUEST:
        return { loading: true };
      case ACCOUNT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ACCOUNT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  