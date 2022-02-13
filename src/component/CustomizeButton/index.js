import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/styles";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';

const CustomizeButton = (props) => {
  const status = props.status;
  const useStyles = makeStyles({
    contained: {
      background: "#08415C !important",
      borderRadius: "10px !important",
      boxShadow: "none !important",
      color: "white !important",
      padding: "4px 16px !important",
    },
    outlined: {
      background: "#fff !important",
      border: "1px solid #08415C !important",
      borderRadius: "10px !important",
      boxShadow: "none !important",
      color: "#08415C !important",
      padding: "4px 16px !important",
    },
  });
  const classes = useStyles();
  return (
    <Fragment>
      {status === "contained" ? (
        <Button
          variant="contained"
          size="medium"
          className={classes.contained}
          onClick={props.click}
        >
          {props.title}
        </Button>
      ) : status === "outlined" ? (
        <Button
          variant="outlined"
          size="medium"
          className={classes.outlined}
          onClick={props.click}
        >
          {props.title}
        </Button>
      ) : (
        <Button
          variant="contained"
          size="medium"
          className={classes.contained}
          onClick={props.click}
        >
          <ArrowBackSharpIcon fontSize="large" />
        </Button>
      )}
    </Fragment>
  );
};
export default CustomizeButton;
