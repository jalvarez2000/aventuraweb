
import { Grid } from '@mui/material';
import { useGetRoomInfo } from '../../services/firebase/room';
import CommandLogger from './CommandLogger';
import RoomDescription from './RoomDescription';
import RoomImage from './RoomImage';
import TextArea from './TextArea';

interface RoomProperties {
    roomId: string;
    gameId: string;
    playerId: string | undefined;
}

const RoomArea = (properties: RoomProperties) => {
    const [value, descriptionLoading, descriptionError] = useGetRoomInfo(properties.roomId);

    return (
        <Grid container direction="column" gap={2} sx={{
            marginTop: "1rem",
            marginLeft: "10%",
            marginRight: "10%",
            marginBottom: "1rem",
            width: "80%",
        }}>
            <RoomImage imageUrl={value?.data()?.image} />
            <RoomDescription description={value?.data()?.description} />
            <TextArea />
            <CommandLogger gameId={properties.gameId} playerId={properties.playerId} />
        </Grid>
    );
};

export default RoomArea;