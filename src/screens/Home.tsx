import RoomArea from "../components/game/RoomArea";
import SideMenu from "../components/game/SideMenu";
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { } from "react";
import { auth } from "../config/firebase";
import { ThemeProvider } from "@emotion/react";
import HomeTheme from "../components/theme/home";
import { CssBaseline } from "@mui/material";
import { useGetGamePlayerInfo } from "../services/firebase/player";


const Home = () => {
  const gameId = "6VgFHH0eftew5fVtqPQx";
  const [user, loading, error] = useAuthState(auth);
  const [playerInfo, loadingRoom, errorRoom] = useGetGamePlayerInfo(gameId, user?.uid);

  return (
    <React.Fragment>
      <ThemeProvider theme={HomeTheme}>
        <CssBaseline />
        <SideMenu />
        {playerInfo && <RoomArea roomId={playerInfo.data()?.roomId} gameId={gameId} playerId={user?.uid} />}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default Home;
