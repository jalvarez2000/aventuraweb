
import { Typography } from '@mui/material';

interface RoomDescriptionProperties {
    description: string;
}

const RoomDescription = (props: RoomDescriptionProperties) => {
    return (
        <Typography variant="body1" component="p" color={"white"} fontFamily="Press Start" fontSize={"1.2rem"} >
            {props.description}
        </Typography>
    );
};

export default RoomDescription;