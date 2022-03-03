import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { makeStyles } from "@material-ui/styles";

const CustomizeDatepicker = (props) => {
  const [value, setValue] = useState(new Date());
  // const [firstvalue, setfirstvalue] = useState(new Date());
  // const [i, seti] = useState(0);

  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setValue(props.defaultValue);
    }
  }, [props.defaultValue]);

  const handleChange = (newValue) => {
    setValue(newValue);
    // props.onChangeDate(value);
  };
  const AcceptChange = (newValue) => {
    // const formatDate = (date) => {
    //   var d = new Date(date),
    //     month = "" + (d.getMonth() + 1),
    //     day = "" + d.getDate(),
    //     year = d.getFullYear();
  
    //   if (month.length < 2) month = "0" + month;
    //   if (day.length < 2) day = "0" + day;
  
    //   return [year, month, day].join("/");
    // };
    // if(i === 1 && formatDate(newValue) === formatDate(Date(firstvalue))){
    // if(formatDate(newValue) === formatDate(Date(firstvalue))){
    //   console.log("就");
    //   // seti(2);
    // }
    // else{
      setValue(newValue);
      props.onChangeDate(newValue);
    // }

  };
  const useStyles = makeStyles({
    root: {
      "& .MuiFilledInput-root": {
        background: "#E5E5E5",
        borderRadius: "50px",
      },
      "& .MuiFilledInput-root>input": {
        padding: "12px",
      },
    },
  });
  const classes = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          mask="____/__/__"
          label="Date mobile"
          inputFormat="yyyy/MM/dd"
          value={value}
          cancelText=''
          rightArrowButtonText=''
          onAccept={AcceptChange}
          onChange={handleChange}
          // onOpen={() => {
          //   // if (i === 0) {
          //     setfirstvalue(Date(value));
          //     // seti(1);
          //     console.log(firstvalue);
          //   // }
          // }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              size="small"
              label=""
              className={classes.root}
              InputProps={{ disableUnderline: true }}
              variant="filled"
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};
export default CustomizeDatepicker;
