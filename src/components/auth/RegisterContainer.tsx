import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, sendEmailVerification, updateCurrentUser } from "firebase/auth";
import { auth, Firebase } from "../../config/firebase";
import { useState } from "react";
import userEvent from "@testing-library/user-event";


interface Props { }

const RegisterContainer = (props: Props) => {

    type FormValues = {
        username: string;
        password: string;
        repeatPassword: string;
      }
      
    const validationSchema = yup.object({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
      repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
       
    })
      
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });
    const [errorMessage, setErrorMessage] = useState("");
    
    const registerUser = (data: FormValues) =>  {
      setErrorMessage("");
      createUserWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created: ", user);
        sendEmailVerification(user)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.log("Error sending email: ", error);
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + ": " + errorMessage);
      })  
    };

    return (
      <form onSubmit={handleSubmit(registerUser)}>
        <Card >
        <CardHeader title="Register" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              {...register("username", { required: true})}
            />
            <p>{errors.username?.message}</p>
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
          <TextField
              fullWidth
              id="repeatPassword"
              type="password"
              label="Repeat password"
              placeholder="Repeat password"
              margin="normal"
              {...register("repeatPassword")}
            />
            <p>{errors.repeatPassword?.message}</p>
            </div>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="center">
            <Grid item>
              <Button variant="outlined" type="submit"> Register</Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <p>{errorMessage}</p>
      </form>
    );
};

export default RegisterContainer;