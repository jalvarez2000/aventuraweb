import { Box } from "@mui/material";
import AuthGoogleContainer from "./AuthGoogleContainer";
import AuthLoginContainer from "./AuthLoginContainer";

interface Props { }

const AuthContainers = (props: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AuthLoginContainer />
            <AuthGoogleContainer />
        </Box>
    );
};

export default AuthContainers;
