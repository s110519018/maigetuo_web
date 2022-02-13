import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { makeStyles } from "@material-ui/styles";

const CustomizeDatepicker = (props) => {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
    props.onChangeDate(value);
  };
  const useStyles = makeStyles({
    root: {
      "& .MuiFilledInput-root": {
        background: "#E5E5E5",
        borderRadius: "50px",
        
      },
      "& .MuiFilledInput-root>input":{
        padding:"12px",
      }
    }
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
          onChange={handleChange}
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
