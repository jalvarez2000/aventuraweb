import RoomArea from "../components/game/RoomArea";
import SideMenu from "../components/game/SideMenu";
import { useGetCurrentPlayerRoom } from "../services/player";
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useGetRoomInfo } from "../services/room";


const Home = () => {
  const gameId = "6VgFHH0eftew5fVtqPQx";
  const [user, loading, error] = useAuthState(auth);
  const [roomId, loadingRoom, errorRoom] = useGetCurrentPlayerRoom(gameId, user?.uid);

  return (
    <React.Fragment>
      <SideMenu />
      {roomId && <RoomArea roomId={roomId.data()?.roomId} />}
    </React.Fragment>
  );
}

export default Home;
