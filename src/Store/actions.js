import axios from "axios";
import {
  SET_BASE_DATA,
  MEMBER_DATA_REQUEST,
  SET_MEMBER_DATA,
  MEMBER_DATA_FAIL,
  GOALS_DATA_REQUEST,
  SET_GOALS_DATA,
  GOALS_DATA_FAIL,
} from "./actionTypes";

const SERVER_URL = "https://maigetuo.herokuapp.com/api";
// const SERVER_URL = "http://localhost:5000/api";

export const setBaseData = async (dispatch, options) => {
  dispatch({
    type: SET_BASE_DATA,
    payload: options,
  });
  localStorage.setItem("group_id", options.group_id);
  localStorage.setItem("user_id", options.user_id);
  localStorage.setItem("user_name", options.user_name);
};

export const getGroupData = async (dispatch, options) => {
  dispatch({ type: MEMBER_DATA_REQUEST });
  const { group_id,user_id } = options;
  try {
    const { data } = await axios.get(
      SERVER_URL + "/datas/?groupid=" + group_id +"&userid=" + user_id
    )
    dispatch({
      type: SET_MEMBER_DATA,
      payload: data[0],
    });
    localStorage.setItem("member_id", data[0].userId);
    localStorage.setItem("member_name", data[0].displayName);
  } catch (error) {
    dispatch({ type: MEMBER_DATA_FAIL, payload: "取得資料時發生問題" });
    console.log(error);
  }
};

export const getGoalsList = async (dispatch, options) => {
  dispatch({ type: GOALS_DATA_REQUEST });
  const { group_id } = options;
  try {
    const { data } = await axios.get(
      SERVER_URL + "/goals/?groupid=" + group_id
    );
    dispatch({
      type: SET_GOALS_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GOALS_DATA_FAIL, payload: "載入時發生問題" });
    console.log(error);
  }
};
