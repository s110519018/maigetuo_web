import axios from "axios";
import {
  RESET_ERROR_DATA,
  SET_BASE_DATA,
  MEMBER_DATA_REQUEST,
  SET_MEMBER_DATA,
  MEMBER_DATA_FAIL,
  GOALS_DATA_REQUEST,
  SET_GOALS_DATA,
  GOALS_DATA_FAIL,
  GOAL_DATA_REQUEST,
  SET_GOAL_DATA,
  GOAL_DATA_FAIL,
  EDIT_GOAL_REQUEST,
  EDIT_GOAL_DATA,
  EDIT_GOAL_FAIL,
  DELETE_GOAL_REQUEST,
  DELETE_GOAL_DATA,
  DELETE_GOAL_FAIL,
  PLAN_GOAL_REQUEST,
  PLAN_GOAL_DATA,
  PLAN_GOAL_FAIL,
  UPDATE_GOAL_REQUEST,
  UPDATE_GOAL_DATA,
  UPDATE_GOAL_FAIL,
  PRIZES_DATA_REQUEST,
  SET_PRIZES_DATA,
  PRIZES_DATA_FAIL,
  ADD_PRIZE_REQUEST,
  ADD_PRIZE_DATA,
  ADD_PRIZE_FAIL,
  DELETE_PRIZE_REQUEST,
  DELETE_PRIZE_DATA,
  DELETE_PRIZE_FAIL,
  PRIZE_DATA_REQUEST,
  SET_PRIZE_DATA,
  PRIZE_DATA_FAIL,
  EDIT_PRIZE_REQUEST,
  EDIT_PRIZE_DATA,
  EDIT_PRIZE_FAIL,
} from "./actionTypes";

const SERVER_URL = "https://maigetuo.herokuapp.com/api";
// const SERVER_URL = "http://localhost:5000/api";

export const resetErrorData = async (dispatch, options) => {
  dispatch({
    type: RESET_ERROR_DATA,
  });
};

export const setBaseData = async (dispatch, options) => {
  dispatch({
    type: SET_BASE_DATA,
    payload: options,
  });
  sessionStorage.setItem("group_id", options.group_id);
  sessionStorage.setItem("user_id", options.user_id);
  sessionStorage.setItem("user_name", options.user_name);
};

export const getGroupData = async (dispatch, options) => {
  dispatch({ type: MEMBER_DATA_REQUEST });
  const { group_id, user_id } = options;
  try {
    const { data } = await axios.get(
      SERVER_URL + "/datas/?groupid=" + group_id + "&userid=" + user_id
    );
    dispatch({
      type: SET_MEMBER_DATA,
      payload: data[0],
    });
    // sessionStorage.setItem("member_id", data[0].userId);
    // sessionStorage.setItem("member_name", data[0].displayName);
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

export const getGoalData = async (dispatch, options) => {
  dispatch({ type: GOAL_DATA_REQUEST });
  const { group_id, goal_id } = options;
  try {
    const { data } = await axios.get(
      SERVER_URL + "/goals/" + goal_id + "?groupid=" + group_id
    );
    dispatch({
      type: SET_GOAL_DATA,
      payload: data[0],
    });
    console.log("getGoal: ");
    console.log(data);
  } catch (error) {
    dispatch({ type: GOAL_DATA_FAIL, payload: "載入時發生問題" });
    console.log(error);
  }
};

export const editGoalData = async (dispatch, options) => {
  dispatch({ type: EDIT_GOAL_REQUEST });
  const { group_id, goal_id, title, deadline } = options;
  try {
    const { data } = await axios.put(SERVER_URL + "/goals/" + goal_id, {
      group_id: group_id,
      title: title,
      deadline: deadline,
    });
    dispatch({
      type: EDIT_GOAL_DATA,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({ type: EDIT_GOAL_FAIL, payload: "編輯時發生問題" });
    console.log(error);
    return false;
  }
};

export const deleteGoalData = async (dispatch, options) => {
  dispatch({ type: DELETE_GOAL_REQUEST });
  const { group_id, goal_id } = options;
  try {
    const { data } = await axios.delete(SERVER_URL + "/goals/" + goal_id, {
      data: {
        group_id: group_id,
      },
    });
    dispatch({
      type: DELETE_GOAL_DATA,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({ type: DELETE_GOAL_FAIL, payload: "刪除時發生問題" });
    console.log(error);
    return false;
  }
};

export const planGoalData = async (dispatch, options) => {
  dispatch({ type: PLAN_GOAL_REQUEST });
  const { group_id, goal_id, missions } = options;
  try {
    const { data } = await axios.put(
      SERVER_URL + "/goals/planmissions/" + goal_id,
      {
        group_id: group_id,
        missions: missions,
      }
    );
    dispatch({
      type: PLAN_GOAL_DATA,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({ type: PLAN_GOAL_FAIL, payload: "在上傳規劃進度內容時發生問題" });
    console.log(error);
    return false;
  }
};

export const updateGoalData = async (dispatch, options) => {
  dispatch({ type: UPDATE_GOAL_REQUEST });
  const { group_id, goal_id, missions } = options;
  try {
    const { data } = await axios.put(
      SERVER_URL + "/goals/updatemissions/" + goal_id,
      {
        group_id: group_id,
        missions: missions,
      }
    );
    dispatch({
      type: UPDATE_GOAL_DATA,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({ type: UPDATE_GOAL_FAIL, payload: "在更新進度時發生問題" });
    console.log(error);
    return false;
  }
};

export const getPrizesList = async (dispatch, options) => {
  dispatch({ type: PRIZES_DATA_REQUEST });
  const { group_id } = options;
  try {
    const { data } = await axios.get(
      SERVER_URL + "/prizes/?groupid=" + group_id
    );
    dispatch({
      type: SET_PRIZES_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PRIZES_DATA_FAIL, payload: "載入時發生問題" });
    console.log(error);
  }
};

export const getPrizeData = async (dispatch, options) => {
  dispatch({ type: PRIZE_DATA_REQUEST });
  const { group_id, prize_id } = options;
  try {
    const { data } = await axios.get(
      SERVER_URL + "/prizes/" + prize_id + "?groupid=" + group_id
    );
    dispatch({
      type: SET_PRIZE_DATA,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PRIZE_DATA_FAIL, payload: "載入時發生問題" });
    console.log(error);
  }
};

export const addPrizeData = async (dispatch, options) => {
  dispatch({ type: ADD_PRIZE_REQUEST });
  const { group_id, title, content, goals_id } = options;
  try {
    const { data } = await axios.post(SERVER_URL + "/prizes/addprizes", {
      group_id: group_id,
      title: title,
      content: content,
      goals_id: goals_id,
      status: "",
    });
    dispatch({
      type: ADD_PRIZE_DATA,
      payload: data.Allprize,
    });
    return data.prize_id;
  } catch (error) {
    dispatch({ type: ADD_PRIZE_FAIL, payload: "新增時發生問題" });
    console.log(error);
    return false;
  }
};

export const deletePrizeData = async (dispatch, options) => {
  dispatch({ type: DELETE_PRIZE_REQUEST });
  const { group_id, prize_id } = options;
  try {
    const { data } = await axios.delete(SERVER_URL + "/prizes/" + prize_id, {
      data: {
        group_id: group_id,
      },
    });
    dispatch({
      type: DELETE_PRIZE_DATA,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({ type: DELETE_PRIZE_FAIL, payload: "刪除時發生問題" });
    console.log(error);
    return false;
  }
};

export const editPrizeData = async (dispatch, options) => {
  dispatch({ type: EDIT_PRIZE_REQUEST });
  const { group_id, prize_id, title, content, goals_id } = options;
  try {
    const { data } = await axios.put(SERVER_URL + "/prizes/" + prize_id, {
      group_id: group_id,
      title: title,
      content: content,
      goals_id: goals_id,
    });
    dispatch({
      type: EDIT_PRIZE_DATA,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({ type: EDIT_PRIZE_FAIL, payload: "編輯時發生問題" });
    console.log(error);
    return false;
  }
};
