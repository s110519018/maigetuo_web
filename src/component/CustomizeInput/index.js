import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";

const CustomizeInput = (props) => {
  const useStyles = makeStyles({
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
    root: {
      "& .MuiFilledInput-root": {
        background: "#E5E5E5",
        borderRadius: "50px",
        padding:"12px"
      }
    }
  });
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      {props.status === "disable" ? (
        <TextField
          disabled
          multiline
          fullWidth
          // id="outlined-basic"
          size="small"
          variant="outlined"
          className={classes.customDisable}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      ) : (
        <TextField
          multiline
          fullWidth
          className={classes.root}
          InputProps={{ disableUnderline: true }}
          // id="outlined-basic"
          size="small"
          variant="filled"
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          onChange={(e) => {
            props.onChangeContent(e.target.value);
          }}
        />
      )}
    </div>
  );
};
export default CustomizeInput;
