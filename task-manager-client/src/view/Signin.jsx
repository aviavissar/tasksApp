import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { updateAvatar, createUser } from "../service/axios";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "../state/Tasks.store";
import {  red } from "@material-ui/core/colors";
import schema from "../service/yupSchema";
import { Formik, Form } from "formik";

const SignIn = () => {
  const { doLogIn, isConnected } = useStore();

  const passInput = useRef(null);
  const passConfInput = useRef(null);
  const mailInput = useRef(null);
  const nameInput = useRef(null);
  const ageInput = useRef(null);
  const sampleFileRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [avtSrc, setAvtSrc] = useState("");
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doUpdateAvatar = async (handleChange) => {
    var reader = new FileReader();
    reader.readAsDataURL(sampleFileRef.current.files[0]);
    reader.onload = () => {
      setAvtSrc(reader.result);
    };
  };

  const doSignUp = async (email, password, name, age, avatar) => {
    const { data } = await createUser(email, password, name, age);
    if (avatar.files.length !== 0) {
      await updateAvatar(avatar, data.token);
    }
    doLogIn(email, password);
    handleClose();
  };

  return (
    <div>
      {!isConnected ? (
        <Button
          variant="outlined"
          className={classes.MuiButton}
          color="primary"
          onClick={handleClickOpen}
        >
          sign In
        </Button>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.root}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign In your details</DialogTitle>
        <Formik
          initialValues={{
            name: "",
            age: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            console.log("values");
            doSignUp(
              mailInput.current.value,
              passInput.current.value,
              nameInput.current.value,
              ageInput.current.value,
              sampleFileRef.current
            ).catch((e) => {
              console.log(e);
              actions.setFieldError("emailerr", e.message);
            });
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <DialogContent className={classes.root}>
                <div className={classes.imgDiv}>
                  <img alt='avatar'
                    className={classes.img}
                    src={`${avtSrc.toString("base64")}`}
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    type="file"
                    encType="multipart/form-data"
                    inputRef={sampleFileRef}
                    name="sampleFile"
                    id="sampleFile"
                    onChange={() => doUpdateAvatar()}
                    label="full name"
                    size="small"
                    className={classes.MuiFormControl}
                  />
                </div>
                <div className={classes.details}>
                  <TextField
                    autoFocus
                    margin="normal"
                    error={errors.name && touched.name}
                    id="name"
                    name="name"
                    label="full name"
                    type="text"
                    size="small"
                    onChange={handleChange}
                    inputRef={nameInput}
                    className={classes.MuiFormControl}
                    helperText={
                      errors.name && touched.name ? errors.name : null
                    }
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    error={errors.age && touched.age}
                    id="age"
                    label="your age"
                    type="number"
                    size="small"
                    name="age"
                    onChange={handleChange}
                    inputRef={ageInput}
                    className={classes.MuiFormControl}
                    helperText={errors.age && touched.age ? errors.age : null}
                    defaultValue="5"
                  />
                  <TextField
                    autoFocus
                    error={errors.email && touched.email}
                    margin="normal"
                    id="email"
                    label="Email Address"
                    type="email"
                    name="email"
                    size="small"
                    onChange={handleChange}
                    inputRef={mailInput}
                    className={classes.MuiFormControl}
                    helperText={
                      (errors.email && touched.email ? errors.email : null) ||
                      errors.emailerr
                        ? errors.emailerr
                        : null
                    }
                  />

                  <TextField
                    autoFocus
                    error={errors.password && touched.password}
                    margin="normal"
                    id="password"
                    label="password"
                    type="text"
                    name="password"
                    onChange={handleChange}
                    inputRef={passInput}
                    size="small"
                    className={classes.MuiFormControl}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                  <TextField
                    autoFocus
                    margin="normal"
                    id="passwordConfirmation"
                    label="passwordConfirmation"
                    type="text"
                    name="passwordConfirmation"
                    onChange={handleChange}
                    inputRef={passConfInput}
                    size="small"
                    className={classes.MuiFormControl}
                    error={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                    }
                    helperText={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                        ? errors.passwordConfirmation
                        : null
                    }
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  ok & login
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default SignIn;

const useStyles = makeStyles({
  "MuiDialog-paperScrollPaper": {
    " max-height": "500px",
  },
  MuiButton: {
    "font-size": "14px",
    width: "60px",
    padding: "1px",
    margin: "5px",
  },
  root: {
    display: "flex",
  },
  imgDiv: {
    display: "flex",
    margin: "10px",
    width: "300px",
    "flex-direction": "column",
  },
  details: {
    display: "flex",
    margin: "10px",
    width: "300px",
    "flex-direction": "column",
  },
  logoutDiv: {
    width: "300px",
    display: "flex",
    "justify-content": "space-around",
  },
  img: {
    width: "120px",
    height: "150px",
    "justify-content": "space-around",
  },
  MuiFormControl: {
    margin: "16px",
    "&$helperText": {
      color: red,
    },
  },
});
