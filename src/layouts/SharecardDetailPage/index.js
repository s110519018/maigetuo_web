import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import liff from "@line/liff";
import styles from "./styles.module.scss";
import path from "../../utils/path";
// import TextField from "@mui/material/TextField";
// import { makeStyles } from "@material-ui/styles";
// import Radio from "@mui/material/Radio";
import CustomizeButton from "../../component/CustomizeButton";
// import CustomizeInput from "../../component/CustomizeInput";
// import CustomizeTimeline from "../../component/CustomizeTimeline";
// import CustomizeProfile from "../../component/CustomizeProfile";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import {
  resetErrorData,
  getGroupData,
  setBaseData,
  deleteCardData,
  getCardData,
} from "../../Store/actions";

const SharecardDetailPage = () => {
  // const useStyles = makeStyles({
  //   time: {
  //     "& .MuiInputBase-input.Mui-disabled": {
  //       color: "black !important",
  //       fontSize: "12px !important",
  //       "-webkit-text-fill-color": "black !important",
  //       borderColor: "black !important",
  //       borderRadius: "10px !important",
  //     },
  //     "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
  //       borderColor: "black !important",
  //       borderRadius: "10px !important",
  //     },
  //   },
  // });
  // const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

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
      cardData: { card, cardDataLoading },
      deleteCard: { deleteCardLoading },
      error,
    },
    dispatch,
  } = useContext(StoreContext);

  const [Alertshow, setAlertshow] = React.useState(false);
  const [Errorshow, setErrorshow] = useState(false);
  const [Errortext, setErrortext] = useState("");
  //因為location近來的渲染有時間差，所以還是必須加個loading
  const [cardLoading, setcardLoading] = useState(true);
  const [Card, setCard] = useState({});

  const handleClickOpen = () => {
    setAlertshow(true);
  };

  const handleSubmit = () => {
    setAlertshow(false);
    const delete_finish = deleteCardData(dispatch, {
      group_id: group_id,
      card_id: Card._id,
    });
    delete_finish.then(function (result) {
      if (result) {
        navigate(path.sharecardlistpage);
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
        userName = "淯萱";
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
    var { cardID } = QueryString.parse(location.search);
    if (group_id !== "") {
      if (member_id === "") {
        getGroupData(dispatch, { group_id: group_id, user_id: user_id });
      }
      if (cardID !== "" && cardID !== undefined) {
        setcardLoading(false);
        getCardData(dispatch, { group_id: group_id, card_id: cardID });
      }
      if (location.state !== null) {
        setCard(location.state.card);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_id]);

  useEffect(() => {
    if (location.state === null) {
      setCard(card);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  useEffect(() => {
    if (Card.content !== undefined) {
      setcardLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Card]);

  //錯誤區
  useEffect(() => {
    if (error !== "") {
      setErrorshow(true);
      setErrortext(error);
    }
  }, [error]);

  return (
    <Fragment>
      {datasDataLoading || cardLoading || deleteCardLoading || cardDataLoading ? (
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
                  navigate(path.sharecardlistpage);
                }}
              />
            </div>
            <div className={styles.buttons}>
              <CustomizeButton
                status="contained"
                title="編輯"
                mr="0"
                click={() => {
                  navigate(path.editsharecardpage, {
                    state: {
                      lastpath: location.pathname,
                      card: Card,
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
            </div>
            <div className={styles.sharecard}>
              <div className={styles.sharecard_title}>{Card.title}</div>
              {/* <div className={styles.sharecard_category}>
            改寫是誰發布的
          </div> */}
              <div className={styles.sharecard_content}>{Card.content}</div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SharecardDetailPage;
