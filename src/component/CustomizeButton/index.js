import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/styles";

const CustomizeButton = (props) => {
  const status = props.status;
  const useStyles = makeStyles({
    contained: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
    outlined: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
  });
  const classes = useStyles();
  return (
    <Fragment>
      {status == "contained" ? (
        <Button
          variant="contained"
          size="medium"
          className={classes.contained}
          style={{ marginRight: props.mr + "px" }}
        >
          {props.title}
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="medium"
          className={classes.outlined}
          style={{ marginRight: props.mr + "px" }}
        >
          {props.title}
        </Button>
      )}
    </Fragment>
  );
};
export default CustomizeButton;
