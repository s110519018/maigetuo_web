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

//https://dev.to/yutagoto/react-typescript-liff-1kpk
const EditGoalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { happy } = QueryString.parse(location.search);

  const [name, setName] = useState("Cat in the Hat");
  const onChangeContent = (value) => {
    setName(value);
  };

  const [datepick, setDate] = React.useState();
  const onChangeDate = (value) => {
    setDate(value);
    // console.log(datepick.toString());
  };

  //寄送訊息
  const sendMessage = () => {
    liff
      .init({ liffId: process.env.REACT_APP_LIFF_ID }) // LIFF IDをセットする
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({}); // 第一次一定要登入
        } else if (liff.isInClient()) {
          // LIFFので動いているのであれば
          liff
            .sendMessages([
              {
                // 發送訊息
                type: "text",
                text: "You've successfully sent a message! Hooray!",
              },
            ])
            .then(function () {
              window.alert("Message sent");
            })
            .catch(function (error) {
              window.alert("Error sending message: " + error);
            });
        }
      });
  };

  /* 追加: Alert顯示UserProfile */
  const getUserInfo = () => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login({}); // ログインしていなければ最初にログインする
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

  return (
    <div className={styles.container}>
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
            title="儲存"
            status="outlined"
            click={sendMessage}
          />
          <CustomizeButton
            title="取消"
            status="outlined"
            click={() => {
              navigate(-1);
            }}
          />
        </div>
        {happy}
      </div>
    </div>
  );
};

export default EditGoalPage;
