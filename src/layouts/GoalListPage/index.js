import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import liff from "@line/liff";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProgress from "../../component/CustomizeProgress";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import {
  resetErrorData,
  getGroupData,
  getGoalsList,
  deleteGoalData,
  setBaseData,
} from "../../Store/actions";

//案月份排序
const GoalListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const currentMonth = new Date().getMonth() + 1;
  // const currentYear = new Date().getFullYear();
  const [Errorshow, setErrorshow] = useState(false);
  const [Errortext, setErrortext] = useState("");
  const [Alertshow, setAlertshow] = useState(false);
  const [deleteID, setdeleteID] = useState("");

  const handleClickOpen = (ID) => {
    setAlertshow(true);
    setdeleteID(ID);
  };

  const handleSubmit = () => {
    setAlertshow(false);
    const delete_finish = deleteGoalData(dispatch, {
      group_id: group_id,
      goal_id: deleteID,
    });
    delete_finish.then(function (result) {
      console.log(result);
      if (result) {
        navigate(path.goallistpage);
      }
    });
  };
  //資料內容
  const {
    state: {
      baseData: {
        group_id,
        user_id,
        user_name,
        member_id,
        member_name,
        datasDataLoading,
      },
      deleteGoal: { deleteGoalLoading },
      goalsData: { goals, goalsDataLoading },
      error,
    },
    dispatch,
  } = useContext(StoreContext);

  useEffect(() => {
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
    // console.log("group_id: "+group_id);
    if (group_id !== "") {
      getGoalsList(dispatch, { group_id: group_id });
      if (member_id === "") {
        getGroupData(dispatch, { group_id: group_id, user_id: user_id });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_id]);
  //錯誤區
  useEffect(() => {
    if (error !== "") {
      setErrorshow(true);
      setErrortext(error);
    }
  }, [error]);
  return (
    <Fragment>
      {goalsDataLoading || deleteGoalLoading ? (
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
                title="新增任務"
                status="contained"
                mr="0"
                click={() => {
                  navigate(path.addgoalpage, {
                    state: {
                      lastpath: location.pathname,
                    },
                  });
                }}
              />
            </div>
            <div className={styles.status_bar}>
              <div className={`${styles.status} ${styles.status_select}`}>
                全部
              </div>
              <div className={styles.status}>已完成</div>
              <div className={styles.status}>未完成</div>
            </div>

            <div className={styles.goal_bar}>
              {goals
                .sort(
                  (a, b) =>
                    new Date(...a.deadline.split("/")) -
                    new Date(...b.deadline.split("/"))
                )
                .map((goal, index) => (
                  <div
                    key={"goal" + goal._id}
                    className={styles.goal}
                    onClick={() => {
                      navigate(path.goaldetailpage, {
                        state: {
                          goal: goal,
                        },
                      });
                    }}
                  >
                    <div className={styles.name}>
                      {goal.user_id === user_id ? user_name : member_name}
                    </div>
                    <div className={styles.title}>{goal.title}</div>
                    <div className={styles.date}>{goal.deadline}</div>
                    <CustomizeProgress value={60} />
                    {user_id === goal.user_id ? (
                      <div className={styles.user}>
                        <div>
                          <CustomizeButton
                            title="編輯"
                            status="outlined"
                            click={(event) => {
                              navigate(path.editgoalpage, {
                                state: {
                                  lastpath: location.pathname,
                                  goal: goal,
                                },
                              });
                              event.stopPropagation();
                            }}
                          />
                          <CustomizeButton
                            title="刪除"
                            status="outlined"
                            click={(event) => {
                              handleClickOpen(goal._id);
                              event.stopPropagation();
                            }}
                          />
                        </div>
                        <CustomizeButton
                          title="更新進度"
                          status="contained"
                          click={(event) => {
                            navigate(path.goaldetailpage, {
                              state: {
                                goal: goal,
                              },
                            });
                            event.stopPropagation();
                          }}
                        />
                      </div>
                    ) : (
                      <div className={styles.parter}>
                        <CustomizeButton
                          title="規劃進度"
                          status="contained"
                          click={(event) => {
                            navigate(path.plangoalpage, {
                              state: {
                                lastpath: location.pathname,
                              },
                            });
                            event.stopPropagation();
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default GoalListPage;
