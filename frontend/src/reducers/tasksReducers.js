import {
  GET_TASKS_FAIL,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_CREATE_RESET,
  GET_TASKS_RESET,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_REQUEST,
  UPDATE_TASKS_RESET,
  UPDATE_TASKS_SUCCESS,
  UPDATE_TASKS_REQUEST,
  UPDATE_TASKS_FAIL,
  BIN_TASKS_RESET,
  BIN_TASKS_REQUEST,
  BIN_TASKS_SUCCESS,
  BIN_TASKS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  UPDATE_TASKS_STAGE_REQUEST,
  UPDATE_TASKS_STAGE_SUCCESS,
  UPDATE_TASKS_STAGE_RESET,
  UPDATE_TASKS_STAGE_FAIL,
  GET_BIN_TASKS_REQUEST,
  GET_BIN_TASKS_SUCCESS,
  GET_BIN_TASKS_FAIL,
  GET_BIN_TASKS_RESET,
  UNBIN_TASKS_REQUEST,
  UNBIN_TASKS_SUCCESS,
  UNBIN_TASKS_RESET,
  UNBIN_TASKS_FAIL,
  GET_TASKS_REQUEST2,
  GET_TASKS_FAIL2,
  GET_TASKS_SUCCESS2,
  GET_TASKS_RESET2,
  TASK_DETAILS_RESET,
  TOTAL_TASK_REQUEST,
  TOTAL_TASK_SUCCESS,
  TOTAL_TASK_FAIL,
  UPDATE_TASKS_STATUS_REQUEST,
  UPDATE_TASKS_STATUS_SUCCESS,
  UPDATE_TASKS_STATUS_RESET,
  UPDATE_TASKS_STATUS_FAIL,
} from "../constants/tasksConstants";

export const createTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return { loading: true };
    case TASK_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TASK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const tasksListReducer = (state = { tasks: [{ user: [], customer: [] }] }, action) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return { loading: true };
    case GET_TASKS_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.tasks,
        count:action.payload.count,
      };
    case GET_TASKS_FAIL:
      return { loading: false, error: action.payload };
    case GET_TASKS_RESET:
      return { tasks: [] };
    default:
      return state;
  }
};



export const tasksListReducer2 = (state = { tasks: [{ user: [], customer: [] }] }, action) => {
  switch (action.type) {
    case GET_TASKS_REQUEST2:
      return { loading: true };
    case GET_TASKS_SUCCESS2:
      return {
        loading: false,
        tasks: action.payload.tasks,
        count:action.payload.count,
      };
    case GET_TASKS_FAIL2:
      return { loading: false, error: action.payload };
    case GET_TASKS_RESET2:
      return { tasks: [] };
    default:
      return state;
  }
};

export const tasksListInBinReducer = (state = { tasks: [], customer: [] }, action) => {
  switch (action.type) {
    case GET_BIN_TASKS_REQUEST:
      return { loading: true };
    case GET_BIN_TASKS_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.tasks,
      };
    case GET_BIN_TASKS_FAIL:
      return { loading: false, error: action.payload };
    case GET_BIN_TASKS_RESET:
      return { tasks: [] };
    default:
      return state;
  }
};

export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tasksBinReducer = (state = {}, action) => {
  switch (action.type) {
    case BIN_TASKS_REQUEST:
      return { loading: true };
    case BIN_TASKS_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case BIN_TASKS_RESET:
      return { task: {} };
    case BIN_TASKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tasksUnBinReducer = (state = {}, action) => {
  switch (action.type) {
    case UNBIN_TASKS_REQUEST:
      return { loading: true };
    case UNBIN_TASKS_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case UNBIN_TASKS_RESET:
      return { task: {} };
    case UNBIN_TASKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tasksUpdateReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case UPDATE_TASKS_REQUEST:
      return { loading: true };
    case UPDATE_TASKS_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case UPDATE_TASKS_RESET:
      return { task: {} };
    case UPDATE_TASKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tasksDetailsReducer = (state = { task: {}, customer: [] }, action) => {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_DETAILS_RESET:
      return { task: {} };
    case TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tasksUpdateStageReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case UPDATE_TASKS_STAGE_REQUEST:
      return { loading: true };
    case UPDATE_TASKS_STAGE_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case UPDATE_TASKS_STAGE_RESET:
      return { task: {} };
    case UPDATE_TASKS_STAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};




export const tasksUpdateStatusReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case UPDATE_TASKS_STATUS_REQUEST:
      return { loading: true };
    case UPDATE_TASKS_STATUS_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case UPDATE_TASKS_STATUS_RESET:
      return { task: {} };
    case UPDATE_TASKS_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const totalTasksReducerCount = (state = { counter:{} }, action) => {
  switch (action.type) {
    case TOTAL_TASK_REQUEST:
      return { loading: true, counter:{} };
    case TOTAL_TASK_SUCCESS:
      return {
        loading: false,
        counter: action.payload,
        
      };
    case TOTAL_TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};