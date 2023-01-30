
import { Grid } from '@mui/material';
import { useGetRoomInfo } from '../../services/room';
import RoomDescription from './RoomDescription';
import RoomImage from './RoomImage';
import TextArea from './TextArea';

interface RoomProperties {
    roomId: string;
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
            <TextArea text='' />
        </Grid>
    );
};

export default RoomArea;