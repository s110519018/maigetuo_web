import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/styles";

const CustomizeButton = (props) => {
  const status = props.status;
  const useStyles = makeStyles({
    contained: {
      background: "#9E9B9B !important",
      borderRadius: "10px !important",
      boxShadow: "none !important",
      color: "black !important",
      padding: "4px 16px !important",
    },
    outlined: {
      background: "#fff !important",
      border: "1px solid black !important",
      borderRadius: "10px !important",
      boxShadow: "none !important",
      color: "black !important",
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
          style={{ marginRight: props.mr + "px" }}
          onClick={props.click}
        >
          {props.title}
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="medium"
          className={classes.outlined}
          style={{ marginRight: props.mr + "px" }}
          onClick={props.click}
        >
          {props.title}
        </Button>
      )}
    </Fragment>
  );
};
export default CustomizeButton;
