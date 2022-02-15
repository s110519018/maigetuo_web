/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import Dialog from "@mui/material/Dialog";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./styles.module.scss";
import liff from "@line/liff";
import path from "../../utils/path";
import Logo from "../../assets/image/Logo.png";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeButton from "../../component/CustomizeButton";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

//https://dev.to/yutagoto/react-typescript-liff-1kpk
//https://medium.com/frochu/%E5%9C%A8react-app%E4%B8%AD%E6%9C%80%E7%82%BA%E5%B8%B8%E8%A6%8B%E7%9A%84%E8%B7%A8%E7%AB%99%E6%94%BB%E6%93%8A%E6%BC%8F%E6%B4%9E-2fdd95f08466
// XSS 跨站攻擊
// text=replace(text,"/n","<br>")
// text=replace(text," ","&nbsp;")
// text=replace(text,"<script>","")
// text=replace(text,"</script>","")
// https://www.796t.com/post/NWc5eHc=.html
const AddSharecardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { happy } = QueryString.parse(location.search);
  const [opencategory, setCategoryOpen] = useState(false);

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
      {/* 選擇達成門檻 */}
      <Dialog
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
                console.log("dddd");
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
      </Dialog>
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
          <div className={styles.reach}>
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
          </div>
          <div className={styles.detail}>
            <div className={styles.detail_title}>內容</div>
            <textarea placeholder="請輸入分享卡描述"></textarea>
          </div>
        </div>
        {/* https://ithelp.ithome.com.tw/articles/10229445 子傳父 父傳子*/}
        <div className={styles.buttons}>
          <CustomizeButton title="新增" status="outlined" click={sendMessage} />
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
        {happy}
      </div>
    </div>
  );
};

export default AddSharecardPage;
