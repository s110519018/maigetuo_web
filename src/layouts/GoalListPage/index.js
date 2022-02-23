import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProgress from "../../component/CustomizeProgress";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import { getGoalsList, setBaseData } from "../../Store/actions";

//案月份排序
const GoalListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentMonth = new Date().getMonth()+1;
  const currentYear = new Date().getFullYear();

  //資料內容
  const {
    state: {
      baseData: { group_id, user_id },
      goalsData: { goals, goalsDataLoading, error },
    },
    dispatch,
  } = useContext(StoreContext);

  useEffect(() => {
    //看一下要不要存到local
    if (group_id === "") {
      const { groupID, userID } = QueryString.parse(location.search);
      setBaseData(dispatch, { group_id: groupID, user_id: userID });
    }
  }, []);
  useEffect(() => {
    if (group_id !== "") {
      getGoalsList(dispatch, { group_id: group_id });
    }
  }, [group_id]);

  const [Alertshow, setAlertshow] = React.useState(false);
  const [Alerttext, setAlerttext] = React.useState("確定要刪除嗎？");

  const handleClickOpen = () => {
    setAlertshow(true);
  };

  const handleClose = () => {
    setAlertshow(false);
  };

  return (
    <Fragment>
      {goalsDataLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <Alert open={Alertshow} handleClose={handleClose} text={Alerttext} />
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
              <div className={styles.month}>即將到期</div>
              {goals
                .filter((goal) => {
                  var [year, month,day] = goal.deadline.split("/");
                  return currentMonth === +month && currentYear == year;
                })
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
                      navigate(path.goaldetailpage);
                    }}
                  >
                    <div className={styles.name}>{goal.user_id}</div>
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
                                },
                              });
                              event.stopPropagation();
                            }}
                          />
                          <CustomizeButton
                            title="刪除"
                            status="outlined"
                            click={(event) => {
                              handleClickOpen();
                              event.stopPropagation();
                            }}
                          />
                        </div>
                        <CustomizeButton
                          title="更新進度"
                          status="contained"
                          click={(event) => {
                            navigate(path.goaldetailpage);
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
                <div className={styles.hr} />
              <div className={styles.month}>尚未到期</div>
              {goals
                .filter((goal) => {
                  var [year, month,day] = goal.deadline.split("/");
                  return currentMonth !== +month && currentYear !== year;
                })
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
                      navigate(path.goaldetailpage);
                    }}
                  >
                    <div className={styles.name}>{goal.user_id}</div>
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
                                },
                              });
                              event.stopPropagation();
                            }}
                          />
                          <CustomizeButton
                            title="刪除"
                            status="outlined"
                            click={(event) => {
                              handleClickOpen();
                              event.stopPropagation();
                            }}
                          />
                        </div>
                        <CustomizeButton
                          title="更新進度"
                          status="contained"
                          click={(event) => {
                            navigate(path.goaldetailpage);
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
