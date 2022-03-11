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
import { getGroupData, setBaseData, resetErrorData } from "../../Store/actions";

const AddSharecardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [opencategory, setCategoryOpen] = useState(false);
  const [Errorshow, setErrorshow] = React.useState(false);
  const [Errortext, setErrortext] = React.useState("");

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
      error,
    },
    dispatch,
  } = useContext(StoreContext);

  //寄送訊息
  const sendMessage = () => {
    if (name === "") {
      setErrorshow(true);
      setErrortext("請輸入任務名稱!");
    } else if (name.length > 20) {
      setErrorshow(true);
      setErrortext("字數過長，請低於20字!");
    } else if (
      name.includes("[") ||
      name.includes("]") ||
      name.includes(")") ||
      name.includes("(") ||
      contentText.includes("(") ||
      contentText.includes(")") ||
      contentText.includes("[") ||
      contentText.includes("]")
    ) {
      setErrorshow(true);
      setErrortext("因傳送需求限制，請勿輸入'['或']'、'('或')'");
    } else if (contentText.length > 100) {
      setErrorshow(true);
      setErrortext("詳細內容字數過長，請低於100字!");
    } else {
      var text;
      text = contentText.replace("<script>", "");
      text = text.replace("</script>", "");
      liff
        .init({ liffId: process.env.REACT_APP_LIFF_ID }) // LIFF IDをセットする
        .then(() => {
          if (!liff.isLoggedIn()) {
            // liff.login({}); // 第一次一定要登入
            setErrorshow(true);
            setErrortext("請在line群組中操作唷!");
            console.log("新增分享卡: [" + name + "] (" + text + ")");
          } else if (liff.isInClient()) {
            // LIFFので動いているのであれば
            liff
              .sendMessages([
                {
                  // 發送訊息
                  type: "text",
                  text: "新增分享卡: [" + name + "] (" + text + ")",
                },
              ])
              .then(function () {
                liff.closeWindow();
              })
              .catch(function (error) {
                setErrorshow(true);
                setErrortext("失敗" + error);
              });
          }
        });
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
    if (group_id !== "") {
      if (member_id === "") {
        // console.log(member_id);
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
      {datasDataLoading ? (
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
              sx={{ color: "#08415c", cursor: "pointer" }}
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
              <div>垃圾垃</div>
              <ArrowDropDownOutlinedIcon />
            </div>
          </div> */}
              <div className={styles.detail}>
                <div className={styles.detail_title}>內容</div>
                <textarea
                  placeholder="請輸入分享卡描述"
                  type="text"
                  onChange={(e) => setContentText(e.target.value)}
                ></textarea>
              </div>
            </div>
            {/* https://ithelp.ithome.com.tw/articles/10229445 子傳父 父傳子*/}
            <div className={styles.buttons}>
              <CustomizeButton
                title="新增"
                status="outlined"
                click={sendMessage}
              />
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

export default AddSharecardPage;
