import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {}

const AuthLoginContainer = (props: Props) => {
  type FormValues = {
    username: string;
    password: string;
  };

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const loginUser = (data: FormValues) => {
    signInWithEmailAndPassword(
      auth,
      data.username,
      data.password
    )
      .then(() => {
        console.info("TODO: navigate to authenticated screen");
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
      });
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(loginUser)}>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              {...register("username")}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              {...register("password")}
            />
          </div>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="center">
            <Grid item>
              <Button variant="outlined" type="submit">
                {" "}
                Login
              </Button>
            </Grid>
          </Grid>
        </CardActions>
        <p>{errorMessage}</p>
      </Card>
    </form>
  );
};

export default AuthLoginContainer;
