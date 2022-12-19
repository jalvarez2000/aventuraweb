import { Grid } from "@mui/material";
import { useState } from "react";
import Center from "../utils/Center";
import AuthGoogleContainer from "./AuthGoogleContainer";
import AuthLoginContainer from "./AuthLoginContainer";

interface Props { }

const AuthContainers = (props: Props) => {
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <Center height={"auto"}>
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <AuthLoginContainer />
                </Grid>
                <Grid item xs={12}>
                    <AuthGoogleContainer/>
                </Grid>
            </Grid>
        </Center>
    );
};

export default AuthContainers;
