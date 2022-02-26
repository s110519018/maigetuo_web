import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";
import Radio from "@mui/material/Radio";
import Logo_little from "../../assets/image/logo_little.png";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeProgress from "../../component/CustomizeProgress";
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
    customDisable: {
      "& .MuiInputBase-input.Mui-disabled": {
        color: "#08415C !important",
        "-webkit-text-fill-color": "#08415C !important",
        borderColor: "#08415C !important",
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
      <Alert open={Alertshow} handleClose={handleClose} handleSubmit={handleClose} text={Alerttext} />
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
        <div className={styles.prize}>
          <CustomizeInput
            status="disable"
            title="獎勵名稱"
            defaultValue="請輸入任務dddd名稱"
          />
          <div className={styles.reach}>
            <div className={styles.reach_title}>達成任務</div>
            <div className={styles.reach_goals}>
              <TextField
                disabled
                multiline
                fullWidth
                size="small"
                variant="outlined"
                className={classes.customDisable}
                defaultValue="哈囉"
              />
              <TextField
                disabled
                multiline
                fullWidth
                size="small"
                variant="outlined"
                className={classes.customDisable}
                defaultValue="哈囉"
              />
            </div>
          </div>
          <div className={styles.progress}>
            <div className={styles.comment_part}>
              <img src={Logo_little} alt="Logo" />
              <div className={styles.comment}>加油繼續保持!!</div>
            </div>
            <CustomizeProgress value={60} />
          </div>
          <div className={styles.detail}>
            哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞
            <br />
            安妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞哀妞
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeDetailPage;
