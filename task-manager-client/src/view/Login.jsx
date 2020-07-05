import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "../state/Tasks.store";

const LogIn = () => {
  const { userProfile, doLogIn, doLogout, isConnected } = useStore();

  const passInput = useRef(null);
  const mailInput = useRef(null);

  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {!isConnected ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Log In
        </Button>
      ) : (
        <div className={classes.logoutDiv}>
          <Button variant="outlined" color="primary" onClick={doLogout}>
            log Out
          </Button>
          <span>hi {userProfile.name}</span>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.root}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">log In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To login please enter your email address and password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            size="small"
            defaultValue={"aviavissaaar@gmail.com"}
            inputRef={mailInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="password"
            error={false}
            defaultValue={"1234567"}
            inputRef={passInput}
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              doLogIn(mailInput.current.value, passInput.current.value);
              handleClose();
            }}
            color="primary"
          >
            login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogIn;

const useStyles = makeStyles({
  root: {
    width: "400px",
    left: "38% !important",
  },
  logoutDiv: {
    width: "300px",
    display: "flex",
    "justify-content": "space-around",
  },
});
