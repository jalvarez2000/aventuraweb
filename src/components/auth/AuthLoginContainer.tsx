import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props { }

const AuthLoginContainer = (props: Props) => {
  type FormValues = {
    username: string;
    password: string;
  };

  const validationSchema = yup.object({
    username: yup.string().required("Username is required").email("Invalid email format"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

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
        setOpen(true);
      });
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit(loginUser)}>
      <Card>
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              error={errors.username ? true : false}
              helperText={errors.username?.message}
              {...register("username")}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              error={errors.password ? true : false}
              helperText={errors.password?.message}
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
      </Card>
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
    </form>
  );
};

export default AuthLoginContainer;
