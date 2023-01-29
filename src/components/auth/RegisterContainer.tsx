import { Alert, Box, Button, Card, CardActions, CardContent, FormControl, FormGroup, FormHelperText, Grid, Input, Snackbar, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../config/firebase";
import React, { useState } from "react";
import AuthGoogleContainer from "./AuthGoogleContainer";


interface Props { }

const RegisterContainer = (props: Props) => {

  type FormValues = {
    username: string;
    password: string;
    repeatPassword: string;
  }

  const validationSchema = yup.object({
    username: yup.string().required("Username is required").email("Invalid email format"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')

  })

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  const registerUser = (data: FormValues) => {
    setErrorMessage("");
    createUserWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            setErrorMessage("Email sent for verification");
            setOpen(true);
          })
          .catch((error) => {
            setErrorMessage("Error sending email: " + error);
            setOpen(true);
          })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + ": " + errorMessage);
        setOpen(true);
      })
  };

  return (
    <React.Fragment>
      <FormControl>
        <Grid container gap={4}>
          <TextField
            fullWidth
            id="username"
            type="text"
            placeholder="Username"
            error={errors.username ? true : false}
            helperText={errors.username?.message}
            {...register("username")}
          />
          <TextField
            fullWidth
            id="password"
            type="password"
            placeholder="Password"
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <TextField
            fullWidth
            id="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            error={errors.repeatPassword ? true : false}
            helperText={errors.repeatPassword?.message}
            {...register("repeatPassword")}
          />
          <Grid item xs={12} textAlign='center'>
            <Button variant="outlined" onClick={handleSubmit(registerUser)}>
              Register
            </Button>
          </Grid>
        </Grid>
      </FormControl>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default RegisterContainer;