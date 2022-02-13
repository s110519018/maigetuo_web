import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProgress from "../../component/CustomizeProgress";
import Alert from "../../component/Alert";

//https://stackoverflow.com/questions/44890663/how-do-i-sort-and-display-a-react-array-by-year-and-month
//案月份排序
const GoalListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Alertshow, setAlertshow] = React.useState(false);
  const [Alerttext, setAlerttext] = React.useState("確定要刪除嗎？");

  const handleClickOpen = () => {
    setAlertshow(true);
  };

  const handleClose = () => {
    setAlertshow(false);
  };

  return (
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
          <div className={`${styles.status} ${styles.status_select}`}>全部</div>
          <div className={styles.status}>已完成</div>
          <div className={styles.status}>未完成</div>
        </div>

        <div className={styles.goal_bar}>
          <div className={styles.month}>本月任務</div>
          <div
            className={styles.goal}
            onClick={() => {
              navigate(path.goaldetailpage);
            }}
          >
            <div className={styles.name}>育萱</div>
            <div className={styles.title}>架構圖規劃</div>
            <div className={styles.date}>2022/02/26</div>
            <CustomizeProgress value={60} />
            {/* <div className={styles.user}>
              <div>
                <CustomizeButton
                  title="編輯"
                  status="outlined"
                  click={(event) => {
                    navigate(path.editgoalpage, {
                      state: {
                        lastpath: location.pathname,
                      }
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
            </div> */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalListPage;
