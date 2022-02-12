import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
const CustomizeDatepicker = (props) => {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
    props.onChangeDate(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          mask="____/__/__"
          label="Date mobile"
          inputFormat="yyyy/MM/dd"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} size="small" label="" />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};
export default CustomizeDatepicker;
