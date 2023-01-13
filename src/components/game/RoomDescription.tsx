
import { Typography } from '@mui/material';

interface roomDescriptionProperties {
    description: string;
}

const RoomDescription = (props: roomDescriptionProperties) => {
    return (
        <Typography sx={{
            marginTop: "1rem",
            marginLeft: "20%",
            marginRight: "20%",
            marginBottom: "1rem"
        }} variant="body1" component="p" color={"white"} fontFamily="Press Start" fontSize={"1.2rem"} >
            {props.description}
        </Typography>
    );
};

export default RoomDescription;