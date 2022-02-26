import * as React from "react";
import { Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@material-ui/styles";

const Alert = (props) => {
  const status = props.status;
  const useStyles = makeStyles({
    title: {
      fontSize: "1.5em !important",
      fontWeight: "bold !important",
    },
    button: {
      color: "black !important",
    },
  });
  const classes = useStyles();
  return (
    <Fragment>
      {status === "error" ? (
        <Dialog
          fullWidth={true}
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            錯誤
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} className={classes.button}>
              確定
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          fullWidth={true}
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            {props.text}
          </DialogTitle>
          {/* <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent> */}
          <DialogActions>
            <Button onClick={props.handleClose} className={classes.button}>
              取消
            </Button>
            <Button
              onClick={props.handleSubmit}
              autoFocus
              className={classes.button}
            >
              確定
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Fragment>
  );
};
export default Alert;
