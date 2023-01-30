
import { CardMedia } from '@mui/material';

interface RoomImageProperties {
    imageUrl: string;
}

const RoomImage = (props: RoomImageProperties) => {
    return (
        <CardMedia
            component="img"
            sx={{
                maxHeight: { xs: "50%", md: "50%" },
                maxWidth: { xs: "50%", md: "50%" },
                alignSelf: "center"
            }}
            src={props.imageUrl}
        />
    );
};

export default RoomImage;