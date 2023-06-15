import {
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_RESET,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_RESET,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_RESET,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_RESET,
  TRANSACTION_UPDATE_SUCCESS,
} from "../constants/transactionsConstants";

export const createTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const transactionsListReducer = (
  state = { transactions: [{ Account: [], subAccount: [] }] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LIST_REQUEST:
      return { loading: true };
    case TRANSACTION_LIST_SUCCESS:
      return {
        loading: false,
        transactions: action.payload.transactions,
      };
    case TRANSACTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_LIST_RESET:
      return { transactions: [] };
    default:
      return state;
  }
};

export const transactionDetailsReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case TRANSACTION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TRANSACTION_DETAILS_SUCCESS:
      return { loading: false, transaction: action.payload };
    case TRANSACTION_DETAILS_RESET:
      return { transaction: {} };
    case TRANSACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const transactionUpdateReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case TRANSACTION_UPDATE_REQUEST:
      return { loading: true };
    case TRANSACTION_UPDATE_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };
    case TRANSACTION_UPDATE_RESET:
      return { transaction: {} };
    case TRANSACTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const transactionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_DELETE_REQUEST:
      return { loading: true };
    case TRANSACTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRANSACTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
