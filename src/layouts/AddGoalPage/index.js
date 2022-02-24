/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import styles from "./styles.module.scss";
import liff from "@line/liff";
import path from "../../utils/path";
import Logo from "../../assets/image/Logo.png";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeDatepicker from "../../component/CustomizeDatepicker";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProfile from "../../component/CustomizeProfile";

import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import { getGroupData, setBaseData } from "../../Store/actions";

//https://dev.to/yutagoto/react-typescript-liff-1kpk
const AddGoalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Errorshow, setErrorshow] = React.useState(false);
  const [Errortext, setErrortext] = React.useState("");

  const [name, setName] = useState("");
  const onChangeContent = (value) => {
    setName(value);
  };

  const [datepick, setDate] = React.useState(Date);
  const onChangeDate = (value) => {
    setDate(value);
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
        datas_error,
      },
    },
    dispatch,
  } = useContext(StoreContext);
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("/");
  };
  //寄送訊息
  const sendMessage = () => {
    liff
      .init({ liffId: process.env.REACT_APP_LIFF_ID }) // LIFF IDをセットする
      .then(() => {
        if (!liff.isLoggedIn()) {
          // liff.login({}); // 第一次一定要登入
          setErrorshow(true);
          setErrortext("請在line群組中操作唷!");
          console.log(
            "我要新增任務: [" + name + "] (" + formatDate(datepick).toString() + ")"
          );
        } else if (liff.isInClient()) {
          // LIFFので動いているのであれば
          liff
            .sendMessages([
              {
                // 發送訊息
                type: "text",
                text:
                  "我要新增任務: [" + name + "] (" + formatDate(datepick).toString() + ")",
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
  };

  /* 追加: Alert顯示UserProfile */
  const getUserInfo = () => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID }).then(() => {
      if (!liff.isLoggedIn()) {
        // liff.login({});
      } else if (liff.isInClient()) {
        liff
          .getProfile() // ユーザ情報を取得する
          .then((profile) => {
            const userId = profile.userId;
            const displayName = profile.displayName;
            alert(`Name: ${displayName}, userId: ${userId}`);
          })
          .catch(function (error) {
            window.alert("Error sending message: " + error);
          });
      }
    });
  };

  useEffect(() => {
    var { groupID } = QueryString.parse(location.search);
    var userID = "";
    var userName = "";
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID }).then(() => {
      if (!liff.isLoggedIn() || liff.getOS() === "web") {
        userID = "Uf0f4bc17047f7eb01ddfc0893a68786c";
        userName = "阿呆";
        if (groupID === "" || groupID === undefined) {
          groupID = localStorage.getItem("group_id");
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
              groupID = localStorage.getItem("group_id");
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
            window.alert("Error sending message: " + error);
          });
      }
    });
  }, []);
  useEffect(() => {
    if (group_id !== "") {
      if (member_id === "") {
        // console.log(member_id);
        getGroupData(dispatch, { group_id: group_id, user_id: user_id });
      }
    }
  }, [group_id]);
  //錯誤區
  useEffect(() => {
    if (datas_error !== "") {
      setErrorshow(true);
      setErrortext(datas_error);
    }
  }, [datas_error]);

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
            }}
            text={Errortext}
          />
          <div>
            <img src={Logo} alt="Logo" />
            <div className={styles.top}>
              <CustomizeButton
                title="任務清單"
                status="contained"
                click={() => {
                  navigate(path.goallistpage);
                }}
              />
              <CustomizeProfile name="淯宣" />
            </div>
            <CustomizeInput
              title="任務名稱"
              placeholder="請輸入任務名稱"
              onChangeContent={onChangeContent}
            />
            <CustomizeDatepicker title="截止日期" onChangeDate={onChangeDate} />
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

export default AddGoalPage;
