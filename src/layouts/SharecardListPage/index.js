import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import liff from "@line/liff";
// import Dialog from "@mui/material/Dialog";
// import FilterListIcon from "@mui/icons-material/FilterList";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import CustomizeButton from "../../component/CustomizeButton";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import {
  resetErrorData,
  getGroupData,
  setBaseData,
  getCardsList,
  deleteCardData,
} from "../../Store/actions";

const SharecardListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Alertshow, setAlertshow] = React.useState(false);
  const [Errorshow, setErrorshow] = useState(false);
  const [Errortext, setErrortext] = useState("");
  const [deleteID, setdeleteID] = useState("");
  // const [opencategory, setCategoryOpen] = useState(false);

  const handleClickOpen = (ID) => {
    setAlertshow(true);
    setdeleteID(ID);
  };

  const handleSubmit = () => {
    setAlertshow(false);
    const delete_finish = deleteCardData(dispatch, {
      group_id: group_id,
      card_id: deleteID,
    });
    delete_finish.then(function (result) {
      console.log(result);
      if (result) {
        navigate(path.sharecardlistpage);
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
      cardsData: { cards, cardsDataLoading },
      deleteCard: { deleteCardLoading },
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
      getCardsList(dispatch, { group_id: group_id });
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
      {datasDataLoading || cardsDataLoading || deleteCardLoading ? (
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
          {/* 選擇類別 */}
          {/* <Dialog
        open={opencategory}
        onClose={() => {
          setCategoryOpen(false);
        }}
        fullWidth={true}
      >
        <div className={styles.selectmodal}>
          <div className={styles.modal_title}>篩選類別</div>
          <div className={styles.modal_content}>
            <div className={styles.category}>咖啡咖啡廳</div>
          </div>
          <button
            className={styles.cancelbtn}
            onClick={() => {
              setCategoryOpen(false);
            }}
          >
            取消
          </button>
        </div>
      </Dialog> */}
          <div>
            <div className={styles.top}>
              <CustomizeButton
                title="新增分享卡"
                status="contained"
                mr="0"
                click={() => {
                  navigate(path.addsharecardpage, {
                    state: {
                      lastpath: location.pathname,
                    },
                  });
                }}
              />
            </div>
            {/* <div className={styles.category_bar}>
          <div
            className={styles.category_icon}
            onClick={() => {
              setCategoryOpen(true);
            }}
          >
            <FilterListIcon />
            類別
          </div>
          <div className={styles.category_select}># 好去處</div>
        </div> */}

            <div className={styles.card_bar}>
              {cards.length !== 0
                ? cards.map((card) => (
                    <div
                      key={"sharecard" + card._id}
                      className={styles.card}
                      onClick={() => {
                        navigate(path.sharecarddetailpage, {
                          state: {
                            card: card,
                          },
                        });
                      }}
                    >
                      {/* <div className={styles.name}>拖延症克服</div> */}
                      <div className={styles.title}>{card.title}</div>
                      <div className={styles.user}>
                        <div>
                          <CustomizeButton
                            title="編輯"
                            status="outlined"
                            click={(event) => {
                              navigate(path.editsharecardpage, {
                                state: {
                                  lastpath: location.pathname,
                                  card: card,
                                },
                              });
                              event.stopPropagation();
                            }}
                          />
                          <CustomizeButton
                            title="刪除"
                            status="outlined"
                            click={(event) => {
                              handleClickOpen(card._id);
                              event.stopPropagation();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : "目前無新增分享卡"}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SharecardListPage;
