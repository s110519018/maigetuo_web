/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import * as QueryString from "query-string";
import styles from "./styles.module.scss";
import liff from "@line/liff";
import Logo from "../../assets/image/Logo.png";
import Container from "@mui/material/Container";
const TestDetailPage = () => {
  return (
    <Container maxWidth="sm">
      <div className={styles.container}>
        <div>您好：</div>
        <div>
          本研究目的為進行觀眾於臺灣電影影展觀影前與觀影後的服務設計，為深入了解觀眾們的需求，如果您曾參與過任一台灣影展，本研究誠摯邀請您參與研究訪談。
          訪談過程將全程錄音以作記錄並於後續轉譯為逐字稿，受訪者以匿名處理，收集的資料僅供學術論文使用，絕不外洩。
        </div>
        <div>
          感謝您撥冗填答 祝您事事順心
        </div>
        <div>
          國立臺北教育大學玩具與遊戲設計碩士班 學生
        </div>
        <div>陳穎融 敬上</div> <div>指導教授 范丙林教授 俞齊山教授</div>
      </div>
    </Container>
  );
};

export default TestDetailPage;
