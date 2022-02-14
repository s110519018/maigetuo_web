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

const PrizeDetailPage = () => {
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
              navigate(path.prizelistpage);
            }}
          />
        </div>
        <div className={styles.buttons}>
          <CustomizeButton
            status="contained"
            title="編輯"
            mr="0"
            click={() => {
              navigate(path.editprizepage, {
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
        <div className={styles.goal}>
          <CustomizeInput
            status="disable"
            title="獎勵名稱"
            defaultValue="請輸入任務dddd名稱"
          />
          <CustomizeInput
            status="disable"
            title="達成任務"
            defaultValue="2022/7/11"
          />
        </div>
      </div>
    </div>
  );
};

export default PrizeDetailPage;
