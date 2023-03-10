import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { Logout } from "@mui/icons-material";

interface Props {
  navigateTo?: string;
}

const LogoutAdventure = ({ navigateTo = "/login" }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  function logout() {
    setDisabled(true);
    signOut(auth)
      .then(() => {
        navigate(navigateTo);
      })
      .catch((error) => {
        console.error(error);
        setDisabled(false);
      });
  };

  return (
    <Grid item xs={12} textAlign='end'>
      <Button disabled={disabled} onClick={logout}>
        <Logout />
      </Button>
    </Grid>
  );
};

export default LogoutAdventure;
