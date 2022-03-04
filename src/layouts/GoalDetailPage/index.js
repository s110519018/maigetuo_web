import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import liff from "@line/liff";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";
import Radio from "@mui/material/Radio";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeTimeline from "../../component/CustomizeTimeline";
import CustomizeProfile from "../../component/CustomizeProfile";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import {
  resetErrorData,
  getGoalData,
  deleteGoalData,
  getGroupData,
  setBaseData,
  updateGoalData,
} from "../../Store/actions";

const GoalDetailPage = () => {
  const useStyles = makeStyles({
    time: {
      "& .MuiInputBase-input.Mui-disabled": {
        color: "black !important",
        fontSize: "12px !important",
        "-webkit-text-fill-color": "black !important",
        borderColor: "black !important",
        borderRadius: "10px !important",
      },
      "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: "black !important",
        borderRadius: "10px !important",
      },
    },
  });
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  //資料內容
  const {
    state: {
      baseData: {
        group_id,
        user_id,
        user_name,
        member_id,
        // member_name,
        datasDataLoading,
      },
      deleteGoal: { deleteGoalLoading },
      goalData: { goalDataLoading },
      updateGoal: { updateGoalLoading },
      goalData,
      error,
    },
    dispatch,
  } = useContext(StoreContext);
  const [editmode, setEditmode] = useState(false);
  const [Alertshow, setAlertshow] = useState(false);
  const [Errorshow, setErrorshow] = useState(false);
  const [Errortext, setErrortext] = useState("");
  //因為location近來的mission渲染有時間差，所以還是必須加個loading
  const [missionsLoading, setmissionsLoading] = useState(true);
  const [Goal, setGoal] = useState({});

  //因為更新進度畫面不重新渲染，所以多宣告一個test變數每次修改就setTest(!test)讓畫面重新改變
  const [test, setTest] = useState(false);
  const handleStatusChange = (id, event) => {
    try {
      var origin_Goal = Goal;
      origin_Goal.missions.forEach((element) => {
        if (element._id === id) {
          element.status = event.target.value;
        }
      });
      setGoal(origin_Goal);
      setTest(!test);
    } catch (error) {
      setErrorshow(true);
      setErrortext("選擇完成狀時態出現問題!");
    }
  };
  const save = () => {
      const finish = updateGoalData(dispatch, {
        group_id: group_id,
        goal_id: Goal._id,
        missions: Goal.missions,
      });
      finish.then(function (result) {
        // console.log(result);
        if (result) {
          setEditmode(false);
        }
      });
  };

  const handleClickOpen = () => {
    setAlertshow(true);
  };

  const handleSubmit = () => {
    setAlertshow(false);
    const delete_finish = deleteGoalData(dispatch, {
      group_id: group_id,
      goal_id: Goal._id,
    });
    delete_finish.then(function (result) {
      // console.log(result);
      if (result) {
        navigate(path.goallistpage);
      }
    });
  };

  useEffect(() => {
    resetErrorData(dispatch);
    var { groupID } = QueryString.parse(location.search);
    var userID = "";
    var userName = "";
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID }).then(() => {
      if (!liff.isLoggedIn() || liff.getOS() === "web") {
        userID = "Uf0f4bc17047f7eb01ddfc0893a68786c";
        userName = "阿呆";
        if (groupID === "" || groupID === undefined) {
          groupID = sessionStorage.getItem("group_id");
          setBaseData(dispatch, {
            group_id: groupID,
            user_id: userID,
            user_name: userName,
          });
        } else {
          setBaseData(dispatch, {
            group_id: groupID,
            user_id: userID,
            user_name: userName,
          });
        }
      } else if (liff.isInClient()) {
        liff
          .getProfile()
          .then((profile) => {
            userID = profile.userId;
            userName = profile.displayName;
            if (groupID === "" || groupID === undefined) {
              groupID = sessionStorage.getItem("group_id");
              setBaseData(dispatch, {
                group_id: groupID,
                user_id: userID,
                user_name: userName,
              });
            } else {
              setBaseData(dispatch, {
                group_id: groupID,
                user_id: userID,
                user_name: userName,
              });
            }
          })
          .catch(function (error) {
            setErrorshow(true);
            setErrortext("發生錯誤，訊息：" + error);
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    var { goalID } = QueryString.parse(location.search);
    if (group_id !== "") {
      if (member_id === "") {
        getGroupData(dispatch, { group_id: group_id, user_id: user_id });
      }
      if (goalID !== "" && goalID !== undefined) {
        setmissionsLoading(false);
        getGoalData(dispatch, { group_id: group_id, goal_id: goalID });
      }
      if (location.state !== null) {
        setGoal(location.state.goal);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_id]);

  useEffect(() => {
    if (location.state === null) {
      setGoal(goalData.goal);
    }
  }, [goalData]);
  useEffect(() => {
    if (Goal.missions !== undefined) {
      // console.log(Goal);
      setmissionsLoading(false);
    }
  }, [Goal]);
  //錯誤區
  useEffect(() => {
    if (error !== "") {
      setErrorshow(true);
      setErrortext(error);
    }
  }, [error]);

  return (
    <Fragment>
      {goalDataLoading ||
      deleteGoalLoading ||
      datasDataLoading ||
      missionsLoading ||
      updateGoalLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <Alert
            open={Alertshow}
            handleClose={() => {
              setAlertshow(false);
            }}
            handleSubmit={handleSubmit}
            text="確定要刪除嗎？"
          />
          <Alert
            status="error"
            open={Errorshow}
            handleClose={() => {
              setErrorshow(false);
              resetErrorData(dispatch);
            }}
            text={Errortext}
          />
          <div>
            <div className={styles.top}>
              <CustomizeButton
                status="back"
                mr=""
                click={() => {
                  navigate(path.goallistpage);
                }}
              />
              <CustomizeProfile name={user_name} />
            </div>
            <div className={styles.buttons}>
              {Goal.missions !== undefined ? Goal.user_id === user_id ? (
                <Fragment>
                  {!editmode ? (
                    <Fragment>
                      <CustomizeButton
                        status="contained"
                        title="編輯"
                        mr="0"
                        click={() => {
                          navigate(path.editgoalpage, {
                            state: {
                              lastpath: location.pathname,
                              goal: Goal,
                            },
                          });
                        }}
                      />
                      <CustomizeButton
                        status="contained"
                        title="刪除"
                        mr="0"
                        click={handleClickOpen}
                      />
                      <CustomizeButton
                        status="contained"
                        title="更新進度"
                        mr="0"
                        click={() => {
                          setEditmode(true);
                        }}
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <CustomizeButton
                        status="contained"
                        title="更新"
                        mr="0"
                        click={save}
                      />
                      <CustomizeButton
                        status="contained"
                        title="取消"
                        mr="0"
                        click={() => {
                          setEditmode(false);
                        }}
                      />
                    </Fragment>
                  )}
                </Fragment>
              ) : (
                <CustomizeButton
                  status="contained"
                  title="規劃進度"
                  mr=""
                  click={() => {
                    navigate(path.plangoalpage, {
                      state: {
                        lastpath: location.pathname,
                        goal: Goal,
                      },
                    });
                  }}
                />
              ):""}
            </div>
            <div className={styles.goal}>
              <CustomizeInput
                status="disable"
                title="任務名稱"
                defaultValue={Goal.title}
              />
              <CustomizeInput
                status="disable"
                title="達成日期"
                defaultValue={Goal.deadline}
              />
              {!editmode ? (
                <div className={styles.timeline}>
                  <CustomizeTimeline missions={Goal.missions} />
                </div>
              ) : (
                <div className={styles.edit}>
                  {Goal.missions !== undefined ? Goal.missions.length === 0 ? (
                    <div className={styles.empty}>目前無任務</div>
                  ) : (
                    <Fragment>
                      {Goal.missions
                        .sort(
                          (a, b) =>
                            new Date(...a.deadline.split("/")) -
                            new Date(...b.deadline.split("/"))
                        )
                        .map((mission) => (
                          <div className={styles.time}>
                            <TextField
                              disabled
                              multiline
                              id="standard-basic"
                              variant="standard"
                              defaultValue={mission.deadline}
                              className={classes.time}
                            />
                            <TextField
                              disabled
                              multiline
                              id="standard-basic"
                              variant="standard"
                              defaultValue={mission.title}
                              className={classes.time}
                            />
                            <div className={styles.finish_status}>
                              <label
                                htmlFor={"O" + mission._id}
                                className={
                                  mission.status === "O"
                                    ? styles.label_click
                                    : ""
                                }
                              >
                                O
                              </label>
                              <label
                                htmlFor={"X" + mission._id}
                                className={
                                  mission.status === "X"
                                    ? styles.label_click
                                    : ""
                                }
                              >
                                X
                              </label>
                              <Radio
                                style={{ display: "none" }}
                                id={"O" + mission._id}
                                checked={mission.status === "O"}
                                onChange={(event) => {
                                  handleStatusChange(mission._id, event);
                                }}
                                value="O"
                                name="radio-buttons"
                                inputProps={{ "aria-label": "O" + mission._id }}
                              />
                              <Radio
                                style={{ display: "none" }}
                                id={"X" + mission._id}
                                checked={mission.status === "X"}
                                onChange={(event) => {
                                  handleStatusChange(mission._id, event);
                                }}
                                value="X"
                                name="radio-buttons"
                                inputProps={{ "aria-label": "X" + mission._id }}
                              />
                            </div>
                          </div>
                        ))}
                    </Fragment>
                  ):(<div className={styles.empty}>目前無任務</div>)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default GoalDetailPage;
