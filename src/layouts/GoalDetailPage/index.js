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
        // datasDataLoading,
      },
      deleteGoal: { deleteGoalLoading },
      goalData: { goalDataLoading },
      goalData,
      error,
    },
    dispatch,
  } = useContext(StoreContext);
  const [editmode, setEditmode] = useState(false);
  const [Alertshow, setAlertshow] = useState(false);
  const [Errorshow, setErrorshow] = useState(false);
  const [Errortext, setErrortext] = useState("");
  const [Goal, setGoal] = useState({});

  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
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

  //錯誤區
  useEffect(() => {
    if (error !== "") {
      setErrorshow(true);
      setErrortext(error);
    }
  }, [error]);

  return (
    <Fragment>
      {goalDataLoading || deleteGoalLoading ? (
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
              {Goal.user_id === user_id ? (
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
                        click={() => {
                          console.log("更新");
                        }}
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
                      },
                    });
                  }}
                />
              )}
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
                  <CustomizeTimeline />
                </div>
              ) : (
                <div className={styles.edit}>
                  <div className={styles.time}>
                    <TextField
                      disabled
                      multiline
                      id="standard-basic"
                      variant="standard"
                      defaultValue="2022/12/31"
                      className={classes.time}
                    />
                    <TextField
                      disabled
                      multiline
                      id="standard-basic"
                      variant="standard"
                      defaultValue="和老師約和老師約和老師約和老師約"
                      className={classes.time}
                    />
                    <div className={styles.finish_status}>
                      {/* 到時候改成該進度的狀態 */}
                      <label
                        htmlFor="O"
                        className={
                          selectedValue === "O" ? styles.label_click : ""
                        }
                      >
                        O
                      </label>
                      <label
                        htmlFor="X"
                        className={
                          selectedValue === "X" ? styles.label_click : ""
                        }
                      >
                        X
                      </label>
                      <Radio
                        style={{ display: "none" }}
                        id="O"
                        checked={selectedValue === "O"}
                        onChange={handleChange}
                        value="O"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "O" }}
                      />
                      <Radio
                        style={{ display: "none" }}
                        id="X"
                        checked={selectedValue === "X"}
                        onChange={handleChange}
                        value="X"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "X" }}
                      />
                    </div>
                  </div>
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
