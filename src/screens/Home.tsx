import RoomArea from "../components/game/RoomArea";
import SideMenu from "../components/game/SideMenu";
import { useGetCurrentPlayerRoom } from "../services/player";
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { } from "react";
import { auth } from "../config/firebase";
import { ThemeProvider } from "@emotion/react";
import HomeTheme from "../components/theme/home";
import { CssBaseline } from "@mui/material";


const Home = () => {
  const gameId = "6VgFHH0eftew5fVtqPQx";
  const [user, loading, error] = useAuthState(auth);
  const [roomId, loadingRoom, errorRoom] = useGetCurrentPlayerRoom(gameId, user?.uid);

  return (
    <React.Fragment>
      <ThemeProvider theme={HomeTheme}>
        <CssBaseline />
        <SideMenu />
        {roomId && <RoomArea roomId={roomId.data()?.roomId} />}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default Home;
