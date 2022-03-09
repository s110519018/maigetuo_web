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

const SharecardDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
      <Alert
        open={Alertshow}
        handleClose={handleClose}
        handleSubmit={() => {
          setAlertshow(false);
        }}
        text={Alerttext}
      />
      <div>
        <div className={styles.top}>
          <CustomizeButton
            status="back"
            mr=""
            click={() => {
              navigate(path.sharecardlistpage);
            }}
          />
        </div>
        <div className={styles.buttons}>
          <CustomizeButton
            status="contained"
            title="編輯"
            mr="0"
            click={() => {
              navigate(path.editsharecardpage, {
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
        </div>
        <div className={styles.sharecard}>
          <div className={styles.sharecard_title}>架構圖規劃</div>
          {/* <div className={styles.sharecard_category}>
            改寫是誰發布的
          </div> */}
          <div className={styles.sharecard_content}>架構圖規劃</div>
        </div>
      </div>
    </div>
  );
};

export default SharecardDetailPage;
