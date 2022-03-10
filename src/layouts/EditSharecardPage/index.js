/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
// import Dialog from "@mui/material/Dialog";
// import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./styles.module.scss";
import liff from "@line/liff";
import path from "../../utils/path";
import Logo from "../../assets/image/Logo.png";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeButton from "../../component/CustomizeButton";
// import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import {
  getGroupData,
  setBaseData,
  resetErrorData,
  getCardData,
  editCardData,
} from "../../Store/actions";

const EditSharecardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [opencategory, setCategoryOpen] = useState(false);
  const [Errortext, setErrortext] = useState("");
  const [Errorshow, setErrorshow] = useState(false);
  //因為location近來的渲染有時間差，所以還是必須加個loading
  const [cardLoading, setcardLoading] = useState(true);
  const [Card, setCard] = useState({});
  const [contentText, setContentText] = useState("");

  const [name, setName] = useState("");
  const onChangeContent = (value) => {
    setName(value);
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
      cardData: { card, cardDataLoading },
      editCard: { editCardLoading },
      error,
    },
    dispatch,
  } = useContext(StoreContext);

  const save = () => {
    try {
      if (name === "") {
        throw "請輸入任務名稱!";
      } else if (name.length > 20) {
        throw "字數過長，請低於20字";
      } else if (contentText.length > 100) {
        throw "詳細內容字數過長，請低於100字!";
      } else {
        var text;
        text = contentText.replace("<script>", "");
        text = text.replace("</script>", "");
        const edit_finish = editCardData(dispatch, {
          group_id: group_id,
          card_id: Card._id,
          title: name,
          content: text,
        });

        edit_finish.then(function (result) {
          if (result) {
            navigate(path.sharecarddetailpage);
          }
        });
      }
    } catch (error) {
      setErrorshow(true);
      setErrortext(error);
    }
  };

  useEffect(() => {
    resetErrorData(dispatch);
    var { groupID } = QueryString.parse(location.search);
    var userID = "";
    var userName = "";
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID }).then(() => {
      if (!liff.isLoggedIn() || liff.getOS() === "web") {
        userID = "Uf0f4bc17047f7eb01ddfc0893a68786c";
        userName = "小米";
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
            setErrortext("發生錯誤，訊息:" + error);
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    var { cardID } = QueryString.parse(location.search);
    if (group_id !== "") {
      if (member_id === "") {
        // console.log(member_id);
        getGroupData(dispatch, { group_id: group_id, user_id: user_id });
      }
      if (cardID !== "" && cardID !== undefined) {
        setcardLoading(false);
        getCardData(dispatch, { group_id: group_id, card_id: cardID });
      }
      if (location.state !== null) {
        setCard(location.state.card);
        setName(location.state.card.title);
        setContentText(location.state.card.content);
        setcardLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_id]);

  useEffect(() => {
    if (location.state === null && card.title !== undefined) {
      setCard(card);
      setName(card.title);
      setContentText(card.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);


  //錯誤區
  useEffect(() => {
    if (error !== "") {
      setcardLoading(false);
      setErrorshow(true);
      setErrortext(error);
    }
  }, [error]);

  return (
    <Fragment>
      {datasDataLoading || cardDataLoading || cardLoading || editCardLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <Alert
            status="error"
            open={Errorshow}
            handleClose={() => {
              setErrorshow(false);
              resetErrorData(dispatch);
            }}
            text={Errortext}
          />
          {/* 選擇分類 */}
          {/* <Dialog
        open={opencategory}
        onClose={() => {
          setCategoryOpen(false);
        }}
        fullWidth={true}
      >
        <div className={styles.selectmodal}>
          <div className={styles.modal_title}>
            選擇分類
            <SettingsIcon
              sx={{ color: "#08415c",cursor:"pointer" }}
              onClick={() => {
                navigate(path.sharecardcategorypage);
              }}
            />
          </div>
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
            <img src={Logo} alt="Logo" />
            <div className={styles.top}>
              <CustomizeButton
                title="分享卡清單"
                status="contained"
                click={() => {
                  navigate(path.sharecardlistpage);
                }}
              />
            </div>
            <div className={styles.content}>
              <CustomizeInput
                title="分享卡名稱"
                placeholder="請輸入分享卡名稱"
                defaultValue={name}
                onChangeContent={onChangeContent}
              />
              {/* <div className={styles.reach}>
            <div className={styles.reach_title}>選擇分類</div>
            <div
              className={styles.goal_selecter}
              onClick={() => {
                setCategoryOpen(true);
              }}
            >
              <div>垃圾垃垃圾垃圾</div>
              <ArrowDropDownOutlinedIcon />
            </div>
          </div> */}
              <div className={styles.detail}>
                <div className={styles.detail_title}>內容</div>
                <textarea
                  placeholder="請輸入分享卡描述"
                  type="text"
                  onChange={(e) => setContentText(e.target.value)}
                  value={contentText}
                ></textarea>
              </div>
            </div>
            {/* https://ithelp.ithome.com.tw/articles/10229445 子傳父 父傳子*/}
            <div className={styles.buttons}>
              <CustomizeButton title="儲存" status="outlined" click={save} />
              <CustomizeButton
                title="取消"
                status="outlined"
                click={() => {
                  if (location.state === null) {
                    liff.closeWindow();
                  } else {
                    navigate(-1);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditSharecardPage;
