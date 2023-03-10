import { Typography } from "@mui/material";
import { useGetGamePlayerInfo } from "../../services/firebase/player";


interface LastCommandProperties {
    gameId: string;
    playerId: string | undefined;
}


const CommandLogger = (properties: LastCommandProperties) => {

    const [playerInfo, loadingRoom, errorRoom] = useGetGamePlayerInfo(properties.gameId, properties.playerId);

    return (
        <Typography variant="body1" component="p" color={"white"} fontFamily="Press Start" fontSize={"1.2rem"} >
            {playerInfo && playerInfo.data()?.commandLogger}
        </Typography>
    );
};

export default CommandLogger;
