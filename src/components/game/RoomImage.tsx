
import { CardMedia } from '@mui/material';

interface RoomImageProperties {
    imageUrl: string;
}

const RoomImage = (props: RoomImageProperties) => {
    return (
        <CardMedia
            component="img"
            sx={{
                height: "auto",
                width: "100%",
                maxHeight: { xs: "50%", md: "50%" },
                maxWidth: { xs: "40%", md: "40%" },
            }}
            src={props.imageUrl}
        />
    );
};

export default RoomImage;