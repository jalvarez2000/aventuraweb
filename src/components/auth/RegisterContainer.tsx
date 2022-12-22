import { Alert, Box, Button, Card, CardActions, CardContent, Grid, Snackbar, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useState } from "react";
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
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }


  const registerUser = (data: FormValues) => {
    setMessage("");
    createUserWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            setMessage("Email sent for verification");
            setOpen(true);
          })
          .catch((error) => {
            setMessage("Error sending email: " + error);
            setOpen(true);
          })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorCode + ": " + errorMessage);
        setOpen(true);
      })
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <form onSubmit={handleSubmit(registerUser)}>
        <Card >
          <CardContent>
            <div>
              <TextField
                error={errors.username ? true : false}
                fullWidth
                id="username"
                label="Username"
                placeholder="Username"
                margin="normal"
                helperText={errors.username?.message}
                {...register("username", { required: true })}
              />
              <TextField
                error={errors.password ? true : false}
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={errors.password?.message}
                {...register("password")}
              />
              <TextField
                error={errors.repeatPassword ? true : false}
                fullWidth
                id="repeatPassword"
                type="password"
                label="Repeat password"
                placeholder="Repeat password"
                margin="normal"
                helperText={errors.repeatPassword?.message}
                {...register("repeatPassword")}
              />
            </div>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center">
              <Grid item>
                <Button variant="outlined" type="submit">
                  {" "}
                  Register
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </form>
      <AuthGoogleContainer />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterContainer;