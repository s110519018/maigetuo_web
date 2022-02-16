/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import liff from "@line/liff";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import Logo_little from "../../assets/image/logo_little.png";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import CustomizeButton from "../../component/CustomizeButton";
import Alert from "../../component/Alert";
// import { color } from "@mui/system";

const SharecardCategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setMenuOpen] = useState(false);
  const [openAdd, setAddOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const [Alertshow, setAlertshow] = React.useState(false);
  const [Alerttext, setAlerttext] = React.useState("確定要刪除嗎？");

  return (
    <div className={styles.container}>
      <Alert
        open={Alertshow}
        handleClose={() => {
          setAlertshow(false);
        }}
        text={Alerttext}
      />
      {/* 開啟選單 */}
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-end",
          },
          "& .MuiDialog-paper": {
            margin: 0,
            width: "100%",
            maxWidth: "100%",
          },
        }}
        open={openMenu}
        onClose={() => {
          setMenuOpen(false);
        }}
      >
        <div className={styles.deletemodal}>
          <button
            className={styles.editbtn}
            onClick={() => {
              setEditOpen(true);
            }}
          >
            編輯
          </button>
          <button
            className={styles.deletebtn}
            onClick={() => {
              setAlertshow(true);
            }}
          >
            刪除
          </button>
          <button
            className={styles.cancelbtn}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            取消
          </button>
        </div>
      </Dialog>

      {/* 新增類別 */}
      <Dialog
        open={openAdd || openEdit}
        onClose={() => {
          setAddOpen(false);
        }}
        fullWidth={true}
      >
        <div className={styles.addmodal}>
          <div className={styles.addcontent}>
            類別名稱
            <TextField
              fullWidth
              size="small"
              placeholder="請勿超過六個字"
              variant="standard"
            />
          </div>
          <div className={styles.addmodal_buttons}>
            {openAdd ? <button>新增</button> : <button>儲存</button>}

            <button
              onClick={() => {
                setAddOpen(false);
                setEditOpen(false);
              }}
            >
              取消
            </button>
          </div>
        </div>
      </Dialog>
      {/* 新增類別 */}
      <Dialog
        open={openAdd}
        onClose={() => {
          setAddOpen(false);
        }}
        fullWidth={true}
      >
        <div className={styles.addmodal}>
          <div className={styles.addcontent}>
            類別名稱
            <TextField
              fullWidth
              size="small"
              placeholder="請勿超過六個字"
              variant="standard"
            />
          </div>
          <div className={styles.addmodal_buttons}>
            <button>新增</button>
            <button
              onClick={() => {
                setAddOpen(false);
              }}
            >
              取消
            </button>
          </div>
        </div>
      </Dialog>
      <div>
        <div className={styles.top}>
          <CustomizeButton
            status="back"
            mr=""
            click={() => {
              navigate(-1);
            }}
          />
          <div
            className={styles.addicon}
            onClick={() => {
              setAddOpen(true);
            }}
          >
            <AddCircleIcon sx={{ color: "#50B2C0" }} />
          </div>
        </div>
        <div className={styles.plantip}>
          <img src={Logo_little} alt="Logo" />
          <div className={styles.tipscontent}>
            點選類別進行編輯
            <br />
            好好思考怎麼分類吧~
          </div>
        </div>
        <div className={styles.buttons}>
          <CustomizeButton
            title="咖啡廳"
            status="contained"
            click={() => {
              setMenuOpen(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SharecardCategoryPage;
