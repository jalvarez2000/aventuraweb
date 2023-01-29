import { createTheme } from "@mui/material";

const HomeTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: 5,
                    position: 'absolute',
                },
            },
        },
    },
});

export default HomeTheme;