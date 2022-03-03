import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProgress from "../../component/CustomizeProgress";
import Alert from "../../component/Alert";

//https://stackoverflow.com/questions/44890663/how-do-i-sort-and-display-a-react-array-by-year-and-month
//案月份排序
const PrizeListPage = () => {
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
      <Alert open={Alertshow} handleClose={handleClose} handleSubmit={handleClose} text={Alerttext} />
      <div>
        <div className={styles.top}>
          <CustomizeButton
            title="新增獎勵"
            status="contained"
            mr="0"
            click={() => {
              navigate(path.addprizepage, {
                state: {
                  lastpath: location.pathname,
                },
              });
            }}
          />
        </div>
        {/* <div className={styles.status_bar}>
          <div className={`${styles.status} ${styles.status_select}`}>全部</div>
          <div className={styles.status}>已完成</div>
          <div className={styles.status}>未完成</div>
        </div> */}

        <div className={styles.goal_bar}>
          <div
            className={styles.goal}
            onClick={() => {
              navigate(path.prizedetailpage);
            }}
          >
            <div className={styles.title}>蝦皮免運下單商品</div>
            <CustomizeProgress value={60} />
            <div className={styles.user}>
              <div>
                <CustomizeButton
                  title="編輯"
                  status="outlined"
                  click={(event) => {
                    navigate(path.editprizepage, {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeListPage;
