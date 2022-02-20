import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import {
  SET_BASE_DATA,
  GOALS_DATA_REQUEST,
  SET_GOALS_DATA,
  GOALS_DATA_FAIL,
} from "./actionTypes";

export const StoreContext = createContext();

const initialState = {
  //基本資料
  baseData: {
    group_id: "",
    user_id: "",
  },
  goalsData: {
    goals: [],
    goalsDataLoading: false,
    error: "",
  },
  goalData: {
    id: "",
    title: "",
    missions: [],
    deadline: "",
    user_id: "",
    prize_id: "",
    status: "",
    goalDataLoading: false,
    error: "",
  },
};
function reducer(state, action) {
  switch (action.type) {
    case SET_BASE_DATA:
      return {
        ...state,
        baseData: {
          group_id: action.payload.group_id,
          user_id: action.payload.user_id,
        },
      };
    case GOALS_DATA_REQUEST:
      return {
        ...state,
        goalsData: {
          ...state.goalsData,
          error: "",
          goalsDataLoading: true,
        },
      };
    case SET_GOALS_DATA:
      return {
        ...state,
        goalsData: {
          ...state.goalsData,
          goals: action.payload,
          error: "",
          goalsDataLoading: false,
        },
      };
    case GOALS_DATA_FAIL:
      return {
        ...state,
        goalsData: {
          ...state.goalsData,
          error: action.payload,
          goalsDataLoading: false,
        },
      };

    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.object,
};
