import { createTheme } from "@mui/material";

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        sidemenu: true;
        signout: true;
    }
}

const HomeTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'sidemenu' },
                    style: {
                        position: 'absolute'
                    },
                },
                {
                    props: { variant: 'signout' },
                    style: {

                    },
                }
            ],
        },
    },
});

export default HomeTheme;