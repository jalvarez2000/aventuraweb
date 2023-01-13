import React from "react";
import RoomArea from "../components/game/RoomArea";
import SideMenu from "../components/game/SideMenu";

interface Props { }

const Home = (props: Props) => {

  //TODO Leer RoomId del player asociado al juego y refrescar en tiempo real
  return (
    <React.Fragment>
      <SideMenu />
      <RoomArea roomId="xGWThPYRsF4IVoT8mtIs" />
    </React.Fragment>
  );
}

export default Home;
