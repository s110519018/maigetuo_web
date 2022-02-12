import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";
import Radio from "@mui/material/Radio";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeTimeline from "../../component/CustomizeTimeline";
import CustomizeProfile from "../../component/CustomizeProfile";
import Alert from "../../component/Alert";

const GoalDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [editmode, setEditmode] = React.useState(false);
  const [Alertshow, setAlertshow] = React.useState(false);
  const [Alerttext, setAlerttext] = React.useState("確定要刪除嗎？");
  const useStyles = makeStyles({
    time: {
      "& .MuiInputBase-input.Mui-disabled": {
        color: "black !important",
        fontSize: "12px !important",
        "-webkit-text-fill-color": "black !important",
        borderColor: "black !important",
        borderRadius: "10px !important",
      },
      "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: "black !important",
        borderRadius: "10px !important",
      },
    },
  });
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = React.useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };

  const handleClickOpen = () => {
    setAlertshow(true);
  };

  const handleClose = () => {
    setAlertshow(false);
  };
  return (
    <div className={styles.container}>
      <Alert open={Alertshow} handleClose={handleClose} text={Alerttext} />
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
        <div className={styles.buttons}>
          {!editmode ? (
            <Fragment>
              <CustomizeButton
                status="contained"
                title="編輯"
                mr="0"
                click={() => {
                  navigate(path.editgoalpage, {
                    state: {
                      lastpath: location.pathname,
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
              <CustomizeButton
                status="contained"
                title="更新進度"
                mr="0"
                click={() => {
                  setEditmode(true);
                }}
              />
            </Fragment>
          ) : (
            <Fragment>
              <CustomizeButton
                status="contained"
                title="更新"
                mr="0"
                click={() => {
                  console.log("更新");
                }}
              />
              <CustomizeButton
                status="contained"
                title="取消"
                mr="0"
                click={() => {
                  setEditmode(false);
                }}
              />
            </Fragment>
          )}

          {/* <CustomizeButton
            status="contained"
            title="規劃進度"
            mr=""
            click={() => {
              navigate(path.plangoalpage,{
                state: {
                  lastpath: location.pathname,
                },
              });
            }}
          /> */}
        </div>
        <div className={styles.goal}>
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
          {!editmode ? (
            <div className={styles.timeline}>
              <CustomizeTimeline />
            </div>
          ) : (
            <div className={styles.edit}>
              <div className={styles.time}>
                <TextField
                  disabled
                  multiline
                  id="standard-basic"
                  variant="standard"
                  defaultValue="2022/12/31"
                  className={classes.time}
                />
                <TextField
                  disabled
                  multiline
                  id="standard-basic"
                  variant="standard"
                  defaultValue="和老師約和老師約和老師約和老師約"
                  className={classes.time}
                />
                <div className={styles.finish_status}>
                  {/* 到時候改成該進度的狀態 */}
                  <label
                    htmlFor="O"
                    className={selectedValue === "O" ? styles.label_click : ""}
                  >
                    O
                  </label>
                  <label
                    htmlFor="X"
                    className={selectedValue === "X" ? styles.label_click : ""}
                  >
                    X
                  </label>
                  <Radio
                    style={{ display: "none" }}
                    id="O"
                    checked={selectedValue === "O"}
                    onChange={handleChange}
                    value="O"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "O" }}
                  />
                  <Radio
                    style={{ display: "none" }}
                    id="X"
                    checked={selectedValue === "X"}
                    onChange={handleChange}
                    value="X"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "X" }}
                  />
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalDetailPage;
