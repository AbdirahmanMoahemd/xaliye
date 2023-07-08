import {
  EVENTS_LIST_FAIL,
  EVENTS_LIST_REQUEST,
  EVENTS_LIST_RESET,
  EVENTS_LIST_SUCCESS,
} from "@/constants/eventsConstants";

export const eventsListReducer = (
  state = { events: [{ user: [] }] },
  action
) => {
  switch (action.type) {
    case EVENTS_LIST_REQUEST:
      return { loading: true };
    case EVENTS_LIST_SUCCESS:
      return {
        loading: false,
        events: action.payload.events,
      };
    case EVENTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EVENTS_LIST_RESET:
      return { events: [] };
    default:
      return state;
  }
};
