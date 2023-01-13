
import { Grid } from '@mui/material';
import { useGetRoomInfo } from '../../services/room';
import RoomDescription from './RoomDescription';
import RoomImage from './RoomImage';

interface RoomProperties {
    roomId: string;
}

const RoomArea = (properties: RoomProperties) => {
    const [value, descriptionLoading, descriptionError] = useGetRoomInfo(properties.roomId);

    return (
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <RoomImage imageUrl={value?.data()?.image} />
            <RoomDescription description={value?.data()?.description} />
        </Grid>
    );
};

export default RoomArea;