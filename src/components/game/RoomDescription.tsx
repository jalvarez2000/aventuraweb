
import { Typography } from '@mui/material';

interface RoomDescriptionProperties {
    description: string;
}

const RoomDescription = (props: RoomDescriptionProperties) => {
    return (
        <Typography sx={{
            marginTop: "1rem",
            marginLeft: "20%",
            marginRight: "20%",
            marginBottom: "1rem",
        }} variant="body1" component="p" fontFamily="Press Start" fontSize={"1.2rem"} >
            {props.description}
        </Typography>
    );
};

export default RoomDescription;