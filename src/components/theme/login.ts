import { createTheme } from "@mui/material";

const LoginTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    top: 10,
                },
            },
        },
    },
});

export default LoginTheme;