import axios from "axios";
import {
  SET_BASE_DATA,
  GOALS_DATA_REQUEST,
  SET_GOALS_DATA,
  GOALS_DATA_FAIL,
} from "./actionTypes";

const SERVER_URL = "https://maigetuo.herokuapp.com/api";

export const setBaseData = async (dispatch, options) => {
  dispatch({
    type: SET_BASE_DATA,
    payload: options,
  });
};

export const getGoalsList = async (dispatch, options) => {
  dispatch({ type: GOALS_DATA_REQUEST });
  const { group_id } = options;
  console.log(group_id);
  try {
    const { data } = await axios.get(SERVER_URL + "/goals/?groupid="+group_id);
    dispatch({
      type: SET_GOALS_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GOALS_DATA_FAIL, payload: "載入時發生問題" });
    console.log(error);
  }
};
