import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
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

export const StoreContext = createContext();

const initialState = {
  //基本資料
  baseData: {
    group_id: "",
    user_id: "",
    user_name: "",
    member_id: "",
    member_name: "",
    datasDataLoading: false,
  },
  goalsData: {
    goals: [],
    goalsDataLoading: false,
  },
  goalData: {
    goal: {},
    goalDataLoading: false,
  },
  editGoal: {
    editGoalLoading: false,
  },
  deleteGoal: {
    deleteGoalLoading: false,
  },
  planGoal: {
    planGoalLoading: false,
  },
  updateGoal: {
    updateGoalLoading: false,
  },
  prizesData: {
    prizes: [],
    goals: [],
    prizesDataLoading: false,
  },
  prizeData: {
    prize: [],
    goals: [],
    prizeDataLoading: false,
  },
  addPrize: {
    addPrizeLoading: false,
  },
  deletePrize: {
    deletePrizeLoading: false,
  },
  editPrize: {
    editPrizeLoading: false,
  },
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case RESET_ERROR_DATA:
      return {
        ...state,
        error: "",
      };
    case SET_BASE_DATA:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          group_id: action.payload.group_id,
          user_id: action.payload.user_id,
          user_name: action.payload.user_name,
        },
      };

    case MEMBER_DATA_REQUEST:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          datasDataLoading: true,
        },
        error: "",
      };
    case SET_MEMBER_DATA:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          member_id: action.payload.userId,
          member_name: action.payload.displayName,
          datasDataLoading: false,
        },
        error: "",
      };
    case MEMBER_DATA_FAIL:
      return {
        ...state,
        baseData: {
          ...state.baseData,

          datasDataLoading: false,
        },
        error: action.payload,
      };

    //目標列表載入
    case GOALS_DATA_REQUEST:
      return {
        ...state,
        goalsData: {
          ...state.goalsData,
          goalsDataLoading: true,
        },
        error: "",
      };
    case SET_GOALS_DATA:
      return {
        ...state,
        goalsData: {
          ...state.goalsData,
          goals: action.payload,
          goalsDataLoading: false,
        },
        error: "",
      };
    case GOALS_DATA_FAIL:
      return {
        ...state,
        goalsData: {
          ...state.goalsData,
          goalsDataLoading: false,
        },
        error: action.payload,
      };

    //單一目標載入
    case GOAL_DATA_REQUEST:
      return {
        ...state,
        goalData: {
          goal: {},
          goalDataLoading: true,
        },
        error: "",
      };
    case SET_GOAL_DATA:
      return {
        ...state,
        goalData: {
          ...state.goalData,
          goal: action.payload,
          goalDataLoading: false,
        },
        error: "",
      };
    case GOAL_DATA_FAIL:
      return {
        ...state,
        goalData: {
          ...state.goalData,
          goalDataLoading: false,
        },
        error: action.payload,
      };

    //編輯
    case EDIT_GOAL_REQUEST:
      return {
        ...state,
        editGoal: {
          ...state.editGoal,
          editGoalLoading: true,
        },
        error: "",
      };
    case EDIT_GOAL_DATA:
      return {
        ...state,
        goalData: {
          ...state.goalData,
          goal: action.payload,
          goalDataLoading: false,
        },
        editGoal: {
          ...state.editGoal,
          editGoalLoading: false,
        },
        error: "",
      };
    case EDIT_GOAL_FAIL:
      return {
        ...state,
        editGoal: {
          ...state.editGoal,
          editGoalLoading: false,
        },
        error: action.payload,
      };

    //刪除
    case DELETE_GOAL_REQUEST:
      return {
        ...state,
        deleteGoal: {
          ...state.deleteGoal,
          deleteGoalLoading: true,
        },
        error: "",
      };
    case DELETE_GOAL_DATA:
      return {
        ...state,
        goalsData: {
          ...state.goalsData,
          goals: action.payload,
          goalsDataLoading: false,
        },
        deleteGoal: {
          ...state.deleteGoal,
          deleteGoalLoading: false,
        },
        error: "",
      };
    case DELETE_GOAL_FAIL:
      return {
        ...state,
        deleteGoal: {
          ...state.deleteGoal,
          deleteGoalLoading: false,
        },
        error: action.payload,
      };

    //規劃進度
    case PLAN_GOAL_REQUEST:
      return {
        ...state,
        planGoal: {
          ...state.planGoal,
          planGoalLoading: true,
        },
        error: "",
      };
    case PLAN_GOAL_DATA:
      return {
        ...state,
        goalData: {
          ...state.goalData,
          goal: action.payload,
          goalDataLoading: false,
        },
        planGoal: {
          ...state.planGoal,
          planGoalLoading: false,
        },
        error: "",
      };
    case PLAN_GOAL_FAIL:
      return {
        ...state,
        planGoal: {
          ...state.planGoal,
          goalDataLoading: false,
        },
        error: action.payload,
      };

    //更新進度
    case UPDATE_GOAL_REQUEST:
      return {
        ...state,
        updateGoal: {
          ...state.updateGoal,
          updateGoalLoading: true,
        },
        error: "",
      };
    case UPDATE_GOAL_DATA:
      return {
        ...state,
        goalData: {
          ...state.goalData,
          goal: action.payload,
          goalDataLoading: false,
        },
        updateGoal: {
          ...state.updateGoal,
          updateGoalLoading: false,
        },
        error: "",
      };
    case UPDATE_GOAL_FAIL:
      return {
        ...state,
        updateGoal: {
          ...state.updateGoal,
          updateGoalLoading: false,
        },
        error: action.payload,
      };

    //獎勵列表載入
    case PRIZES_DATA_REQUEST:
      return {
        ...state,
        prizesData: {
          ...state.prizesData,
          prizes: [],
          goals: [],
          goalsDataLoading: true,
        },
        error: "",
      };
    case SET_PRIZES_DATA:
      return {
        ...state,
        prizesData: {
          ...state.prizesData,
          prizes: action.payload.Allprize,
          goals: action.payload.Allgoal,
          prizesDataLoading: false,
        },
        error: "",
      };
    case PRIZES_DATA_FAIL:
      return {
        ...state,
        prizesData: {
          ...state.prizesData,
          prizesDataLoading: false,
        },
        error: action.payload,
      };

    //新增獎勵
    case ADD_PRIZE_REQUEST:
      return {
        ...state,
        addPrize: {
          ...state.addPrize,
          addPrizeLoading: true,
        },
        error: "",
      };
    case ADD_PRIZE_DATA:
      return {
        ...state,
        addPrize: {
          ...state.addPrize,
          addPrizeLoading: false,
        },
        error: "",
      };
    case ADD_PRIZE_FAIL:
      return {
        ...state,
        addPrize: {
          ...state.addPrize,
          addPrizeLoading: false,
        },
        error: action.payload,
      };

    //刪除獎勵
    case DELETE_PRIZE_REQUEST:
      return {
        ...state,
        deletePrize: {
          ...state.deletePrize,
          deletePrizeLoading: true,
        },
        error: "",
      };
    case DELETE_PRIZE_DATA:
      return {
        ...state,
        prizesData: {
          ...state.prizesData,
          prizes: action.payload.Allprize,
          goals: action.payload.Allgoal,
          prizesDataLoading: false,
        },
        deletePrize: {
          ...state.deletePrize,
          deletePrizeLoading: false,
        },
        error: "",
      };
    case DELETE_PRIZE_FAIL:
      return {
        ...state,
        deletePrize: {
          ...state.deletePrize,
          deletePrizeLoading: false,
        },
        error: action.payload,
      };

    //單一獎勵載入
    case PRIZE_DATA_REQUEST:
      return {
        ...state,
        prizeData: {
          prize: [],
          goals: [],
          prizeDataLoading: true,
        },
        error: "",
      };
    case SET_PRIZE_DATA:
      return {
        ...state,
        prizeData: {
          ...state.prizeData,
          prize: action.payload.Singleprize,
          goals: action.payload.Allgoal,
          prizeDataLoading: false,
        },
        error: "",
      };
    case PRIZE_DATA_FAIL:
      return {
        ...state,
        prizeData: {
          ...state.prizeData,
          prizeDataLoading: false,
        },
        error: action.payload,
      };

    //編輯獎勵
    case EDIT_PRIZE_REQUEST:
      return {
        ...state,
        editPrize: {
          ...state.editPrize,
          editPrizeLoading: true,
        },
        error: "",
      };
    case EDIT_PRIZE_DATA:
      return {
        ...state,
        prizeData: {
          ...state.prizeData,
          prize: action.payload.Singleprize,
          goals:action.payload.Allgoal,
          prizeDataLoading: false,
        },
        editPrize: {
          ...state.editPrize,
          editPrizeLoading: false,
        },
        error: "",
      };
    case EDIT_PRIZE_FAIL:
      return {
        ...state,
        editPrize: {
          ...state.editPrize,
          editPrizeLoading: false,
        },
        error: action.payload,
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
