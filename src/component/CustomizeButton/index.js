import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const CustomizeButton = (props) => {
  const status = props.status;
  const useStyles = makeStyles({
    contained: {
      backgroundColor: "#C4C4C4",
      boxShadow: "none",
      border: 0,
      borderRadius: 10,
      color: "white",
      padding: "4px 16px",
      "&:hover": {
        background: "#000",
        boxShadow: "none",
      },
    },
    outlined: {
      backgroundColor: "#fff",
      boxShadow: "0px",
      border: "#C4C4C4 1px solid",
      borderRadius: 10,
      color: "black",
      padding: "4px 16px",
      "&:hover": {
        background: "black",
        color: "#fff",
        border: "0",
        boxShadow: "none",
      },
    },
  });
  const classes = useStyles();
  return (
    <Fragment>
      {status == "contained" ? (
        <Button variant="contained" size="medium" className={classes.contained} style={{marginRight: props.mr + 'px'}}>
          {props.title}
        </Button>
      ) : (
        <Button variant="outlined" size="medium" className={classes.outlined} style={{marginRight: props.mr + 'px'}}>
          {props.title}
        </Button>
      )}
    </Fragment>
  );
};
export default CustomizeButton;
