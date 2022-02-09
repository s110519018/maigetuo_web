import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import TextField from "@mui/material/TextField";
const CustomizeInput = (props) => {
  return (
    <div className={styles.container}>
        <div className={styles.title}>{props.title}</div>
        <TextField id="outlined-basic" size="small" variant="outlined" placeholder={props.placeholder} onChange={(e)=>{props.onChangeContent(e.target.value)}}/>
    </div>
  );
};
export default CustomizeInput;
