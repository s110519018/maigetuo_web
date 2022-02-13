/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import liff from "@line/liff";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import Logo_little from "../../assets/image/logo_little.png";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";

import TextField from "@mui/material/TextField";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Dialog from "@mui/material/Dialog";

import CustomizeInput from "../../component/CustomizeInput";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProfile from "../../component/CustomizeProfile";
import Alert from "../../component/Alert";
import { color } from "@mui/system";

const PlanGoalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDelete, setDeleteOpen] = useState(false);
  const [openAdd, setAddOpen] = useState(false);
  const [addDate, setaddDate] = React.useState(new Date());

  const addDateChange = (newDate) => {
    setaddDate(newDate);
  };

  // 之後要改成船ID進去再個別改
  const [value, setValue] = React.useState(new Date());
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      {/* 刪除進度 */}
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
        open={openDelete}
        onClose={() => {
          setDeleteOpen(false);
        }}
      >
        <div className={styles.deletemodal}>
          <button className={styles.deletebtn}>刪除</button>
          <button
            className={styles.cancelbtn}
            onClick={() => {
              setDeleteOpen(false);
            }}
          >
            取消
          </button>
        </div>
      </Dialog>

      {/* 新增進度 */}
      <Dialog
        open={openAdd}
        onClose={() => {
          setAddOpen(false);
        }}
        fullWidth={true}
      >
        <div className={styles.addmodal}>
          <div className={styles.adddate}>
            日期
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                mask="____/__/__"
                label="Date mobile"
                inputFormat="yyyy/MM/dd"
                value={addDate}
                onChange={addDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label=""
                    variant="standard"
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className={styles.addcontent}>
            內容
            <TextField
              fullWidth
              size="small"
              placeholder="請輸入進度描述"
              variant="standard"
            />
          </div>
          <button className={styles.addbtn}>新增</button>
          <button
            className={styles.cancelbtn}
            onClick={() => {
              setAddOpen(false);
            }}
          >
            取消
          </button>
        </div>
      </Dialog>

      <div>
        <div className={styles.top}>
          <CustomizeButton
            status="back"
            mr=""
            click={() => {
              navigate(path.goallistpage);
            }}
          />
          <CustomizeProfile name="淯宣" />
        </div>
        <div className={styles.planpart}>
          <CustomizeInput
            status="disable"
            title="任務名稱"
            defaultValue="請輸入任務dddd名稱"
          />
          <CustomizeInput
            status="disable"
            title="達成日期"
            defaultValue="2022/7/11"
          />
          <div className={styles.plan}>
            <div className={styles.plantitle}>
              <CalendarTodayIcon fontSize="small" sx={{ color: "#08415C" }}/>
              進度規劃
            </div>
            <div
              className={styles.addicon}
              onClick={() => {
                setAddOpen(true);
              }}
            >
              <AddCircleOutlineRoundedIcon />
            </div>
          </div>
          <div className={styles.planlist}>
            <div className={styles.misson}>
              <div className={styles.misson_content}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    mask="____/__/__"
                    label="Date mobile"
                    inputFormat="yyyy/MM/dd"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label=""
                        variant="standard"
                      />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue="你好你好dddd你好你好你好"
                  variant="standard"
                />
              </div>
              <div
                className={styles.misson_setting}
                onClick={() => {
                  setDeleteOpen(true);
                }}
              >
                <MoreVertSharpIcon />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.plantip}>
          <img src={Logo_little} alt="Logo" />
          <div className={styles.tipscontent}>
            不要因為進度落後就擅自延後唷！
            <br />
            想想看如何安排時間加快進度吧~
          </div>
        </div>
        <div className={styles.buttons}>
          <CustomizeButton title="儲存" status="outlined" />
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
  );
};

export default PlanGoalPage;
