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
  setBaseData,
  getPrizesList,
  deletePrizeData,
} from "../../Store/actions";
const PrizeListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Errorshow, setErrorshow] = useState(false);
  const [Errortext, setErrortext] = useState("");
  const [Alertshow, setAlertshow] = React.useState(false);
  const [deleteID, setdeleteID] = useState("");

  const handleClickOpen = (ID) => {
    setAlertshow(true);
    setdeleteID(ID);
  };

  const goal_filter = (goals, goals_id) => {
    const result = goals.filter((goals) => goals_id.includes(goals._id));
    return result;
  };

  const handleSubmit = () => {
    setAlertshow(false);
    const delete_finish = deletePrizeData(dispatch, {
      group_id: group_id,
      prize_id: deleteID,
    });
    delete_finish.then(function (result) {
      if (result) {
        navigate(path.prizelistpage);
      }
    });
  };

  //資料內容
  const {
    state: {
      baseData: {
        group_id,
        user_id,
        // user_name,
        member_id,
        // member_name,
        datasDataLoading,
      },
      prizesData: { prizes, goals, prizesDataLoading },
      deletePrize: { deletePrizeLoading },
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
      getPrizesList(dispatch, { group_id: group_id });
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
      {datasDataLoading || prizesDataLoading || deletePrizeLoading ? (
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
              {prizes.length !== 0
                ? prizes.map((prize, index) => (
                    <div
                      key={"prize" + prize._id}
                      className={styles.goal}
                      onClick={() => {
                        navigate(path.prizedetailpage, {
                          state: {
                            prize: prize,
                            goals: goals,
                          },
                        });
                      }}
                    >
                      <div className={styles.title}>{prize.title}</div>
                      <CustomizeProgress
                        mode="prize"
                        goals={goal_filter(goals, prize.goals_id)}
                      />
                      <div className={styles.user}>
                        <div>
                          <CustomizeButton
                            title="編輯"
                            status="outlined"
                            click={(event) => {
                              navigate(path.editprizepage, {
                                state: {
                                  lastpath: location.pathname,
                                  prize: prize,
                                },
                              });
                              event.stopPropagation();
                            }}
                          />
                          <CustomizeButton
                            title="刪除"
                            status="outlined"
                            click={(event) => {
                              handleClickOpen(prize._id);
                              event.stopPropagation();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : "目前無新增獎勵"}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PrizeListPage;
