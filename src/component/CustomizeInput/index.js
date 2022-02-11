import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";

const CustomizeInput = (props) => {
  const useStyles = makeStyles({
    customDisable: {
      "& .MuiInputBase-input.Mui-disabled": {
        color: "black !important",
        "-webkit-text-fill-color": "black !important",
        borderColor: "black !important",
        borderRadius: "10px !important"
      },
      "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: "black !important",
        borderRadius: "10px !important"

      },
    },
  });
  const classes = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      {props.status === "disable" ? (
        <TextField
          disabled
          multiline
          id="outlined-basic"
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
          id="outlined-basic"
          size="small"
          variant="outlined"
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
