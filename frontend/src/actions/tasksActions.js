import { TOTAL_TASKS_INCOME_REQUEST } from "@/constants/incomeConstants";
import {
  BIN_TASKS_FAIL,
  BIN_TASKS_REQUEST,
  BIN_TASKS_SUCCESS,
  GET_BIN_TASKS_FAIL,
  GET_BIN_TASKS_REQUEST,
  GET_BIN_TASKS_SUCCESS,
  GET_TASKS_FAIL,
  GET_TASKS_FAIL2,
  GET_TASKS_REQUEST,
  GET_TASKS_REQUEST2,
  GET_TASKS_SUCCESS,
  GET_TASKS_SUCCESS2,
  TASK_CREATE_FAIL,
  TASK_CREATE_FAIL2,
  TASK_CREATE_REQUEST,
  TASK_CREATE_REQUEST2,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_SUCCESS2,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TOTAL_TASK_FAIL,
  TOTAL_TASK_REQUEST,
  TOTAL_TASK_SUCCESS,
  UNBIN_TASKS_FAIL,
  UNBIN_TASKS_REQUEST,
  UNBIN_TASKS_SUCCESS,
  UPDATE_TASKS_FAIL,
  UPDATE_TASKS_REQUEST,
  UPDATE_TASKS_STAGE_FAIL,
  UPDATE_TASKS_STAGE_REQUEST,
  UPDATE_TASKS_STAGE_SUCCESS,
  UPDATE_TASKS_STATUS_FAIL,
  UPDATE_TASKS_STATUS_REQUEST,
  UPDATE_TASKS_STATUS_SUCCESS,
  UPDATE_TASKS_SUCCESS,
} from "../constants/tasksConstants";
import axios from "axios";

export const createExisTask =
  (name, phone, item, problem, date, amount,invoiceId, userid, comment, customer) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TASK_CREATE_REQUEST,
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
        '/api/tasks/existing',
        {name,phone, item, problem, date, amount,invoiceId, userid, comment, customer },
        config
      );

      dispatch({
        type: TASK_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TASK_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };



  
export const createNewTask =
(name, phone, item, problem, date, amount,invoiceId, userid, comment) =>
async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_CREATE_REQUEST,
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
      '/api/tasks',
      { name, phone, item, problem, date, amount,invoiceId, userid, comment },
      config
    );

    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTasks = (keyword = "") => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST2 });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks?keyword=${keyword}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS2,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL2,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};






export const listTasksByphone = (keyword = "", pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/taskslist/byphone?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const onprecessTasksList = (keyword = "", pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/onprecess/list?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const finishedTasksList = (keyword = "", pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/finished/list?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const unfinishedTasksList = (keyword = "", pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/unfinished/list?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};





export const onprecessTasksRecentList = (keyword = "", pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/onprecess/recentlist?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const finishedTasksRecentList = (keyword = "", pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/finished/recentlist?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const unfinishedTasksRecentList = (keyword = "", pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/unfinished/recentlist?keyword=${keyword}&pageNumber=${pageNumber}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTasksByRangeDate = (keyword = "", startDate, endDate) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/tasks/range/tasks?keyword=${keyword}`,{startDate, endDate}, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listTasksByRecent = (keyword = "") => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/recent/tasks?keyword=${keyword}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTasksByThisWeek = (keyword = "") => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/this/week?keyword=${keyword}`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




export const listTasksInBin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BIN_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/tasks/bin/list', config);

    dispatch({
      type: GET_BIN_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BIN_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};





export const listTaskstDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/${id}`, config);
 
    dispatch({
      type: TASK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTasks = (id,item, problem, date, amount, stage,status, comment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TASKS_REQUEST,
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
      `/api/tasks/${id}`,
      {item, problem, date, amount,stage,status, comment},
      config
    );

    dispatch({
      type: UPDATE_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateTasksStage = (id, stage) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TASKS_STAGE_REQUEST,
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
      `/api/tasks/stage/${id}`,
      {stage},
      config
    );

    dispatch({
      type: UPDATE_TASKS_STAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TASKS_STAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const updateTasksStatus = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TASKS_STATUS_REQUEST,
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
      `/api/tasks/status/${id}`,
      {status},
      config
    );

    dispatch({
      type: UPDATE_TASKS_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TASKS_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const updateTasksToBin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BIN_TASKS_REQUEST,
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
      `/api/tasks/bin/${id}`,{},
      config
    );

    dispatch({
      type: BIN_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BIN_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateTasksToUnBin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNBIN_TASKS_REQUEST,
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
      `/api/tasks/restore/${id}`,{},
      config
    );

    dispatch({
      type: UNBIN_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNBIN_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deleteTasks = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tasks/${id}`, config);

    dispatch({
      type: TASK_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const getTasksTotal = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TOTAL_TASK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/tasks/total/taskts', config);

    dispatch({
      type: TOTAL_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};