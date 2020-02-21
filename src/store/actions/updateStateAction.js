import { UPDATE_INIT_STATE } from "./actionTypes";

export const updateState = (state) => dispatch => {
  alert();
  dispatch({
    type: UPDATE_INIT_STATE,
    payload: state
  });
}