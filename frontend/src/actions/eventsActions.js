import {
  EVENTS_LIST_FAIL,
  EVENTS_LIST_REQUEST,
  EVENTS_LIST_SUCCESS,
} from "@/constants/eventsConstants";
import axios from "axios";

export const listEvents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EVENTS_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/events", config);

    dispatch({
      type: EVENTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
