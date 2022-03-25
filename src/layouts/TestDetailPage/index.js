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
        <h1>【參與研究線上知情同意書】</h1>
        <div className={styles.title}>基本資訊：</div>
        <ul>
          <li>主題：以雙人合作機制改善拖延之LINE聊天機器人設計</li>
          <li>學校：國立臺北教育大學 玩具與遊戲設計碩士班</li>
          <li>研究生：李淯萱</li>
          <li>指導教授：范丙林教授 俞齊山教授</li>
        </ul>
        
        <div className={styles.title}>研究目的：</div>
        <div className={styles.content}>本研究欲開發一款建構於認知行為團體治療理論的LINE 聊天機器人，結合已證實有效改善拖延的方法建立合作機制，透過實驗收集受測者的拖延程度、使用回饋，了解不同拖延程度的受測者之使用體驗是否有差異，提供未來設計該類型聊天機器人時參考。</div>

        <div className={styles.title}>研究內容：</div>
        <div className={styles.content}>本研究全程於線上進行，實驗為期一週。內容為和夥伴一同進行聊天機器人操作及互動，並於每日推播一則拖延相關對話主題、週二至週五發送作業供受測者進行互動激發思考，最後於當週週日發送問卷連結調查使用者之使用體驗。</div>

        <div className={styles.title}>參與活動所需時間與次數：</div>
        <div className={styles.content}>研究橫跨一周，固定操作時間包含聊天機器人每天推送一則拖延相關對話主題、於週二至週五發送作業，其餘為受測組別互動時間不固定。</div>

        <div className={styles.title}>參與條件：</div>
        <div className={styles.content}>本研究招募年齡、性別不限，招募覺得自己有拖延問題的人，並有一位夥伴也有拖延問題，與其搭檔以雙人為一組參與本實驗。</div>

        <div className={styles.title}>參與活動地點：</div>
        <div className={styles.content}>所有流程皆於線上進行，研究者會以Email寄送聊天機器人ID及實驗資訊，問卷會透過聊天機器人發送給受測者。</div>

        <div className={styles.title}>參與實驗報酬及中途退出之補償：</div>
        <div className={styles.content}>為了招募真正有拖延問題並想要改善的受測者，本研究未提供受測者物質上的酬勞，但若完整參與研究並填寫有效問卷，會於所有梯次的實驗全部結束後於每個梯次內之有效問卷中各抽出3個組別，每位送出7-11 價值100元商品券以表感謝之意。因本研究原本未打算提供任何酬勞或補償，故中途退出實驗亦未另行補償措施。</div>

        <div className={styles.title}>可能承受的風險及因應的措施：</div>
        <div className={styles.content}>本研究招募年齡、性別不限，招募覺得自己有拖延問題的人，並有一位夥伴也有拖延問題，與其搭檔以雙人為一組參與本實驗。</div>

        <div className={styles.title}>研究資療之保存期限及運用規劃：</div>
        <div className={styles.content}>本研究所收集之資料只會使用在本研究中，若您有任何疑慮，歡迎提出刪除您個人資料之要求，未來研究結果呈現時將不會呈現您的真實姓名或個人資料。</div>

        <div className={styles.title}>暫停和退出研究之權益：</div>
        <div className={styles.content}>過程中若你有任何身心上的不適，想要暫停或退出研究我們會完全尊重您的意願，已蒐集之資料將繼續納入分析或發表，但會確保無法辨識出特定個人訊息，有任何問題可於任何時間聯絡我們。</div>

        <div className={styles.title}>聯繫管道：</div>
        <div className={styles.content}>
          聯絡人：李淯萱
        </div>
        <div className={styles.content}>Email：g110934017@grad.ntue.edu.tw</div>
        <div className={styles.content}>
          <a href="https://line.me/ti/g2/ftIKFN2QcgLgDz7xrTFJRRNLkRpOT_Wu9Wy0kQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default">
            LINE社群（匿名發言）
          </a>
        </div>
        <div className={styles.end}>
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </Container>
  );
};

export default TestDetailPage;
