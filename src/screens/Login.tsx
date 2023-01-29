import { Css } from "@mui/icons-material";
import { Box, CssBaseline, Grid, Tab, Tabs, ThemeProvider } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import AuthContainers from "../components/auth/AuthContainers";
import RegisterContainer from "../components/auth/RegisterContainer";
import TabPanel from "../components/auth/TabPanel";
import LoginTheme from "../components/theme/login";
import Center from "../components/utils/Center";

interface Props { }

const tabIdToURL: { [id: number]: string } = {
  0: "login",
  1: "register",
};

const Login = (props: Props) => {
  // getting and setting URL params
  const [searchParams, setSearchParams] = useSearchParams();

  // get action from URL
  const action: string = searchParams.get("action") || "login";

  // used to set initial state
  let indexFromUrl = 0;
  if (action === "register") {
    indexFromUrl = 1;
  }

  // handle Tab Panel
  const [value, setValue] = React.useState(indexFromUrl);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const action = tabIdToURL[newValue];
    setSearchParams({ action });
  };

  return (
    <Grid style={{ backgroundImage: "url(/images/jungle.png)", backgroundSize: "cover" }}>
      <ThemeProvider theme={LoginTheme}>
        <CssBaseline />
        <Center>
          <Box sx={{ width: "100%", maxWidth: 500, backgroundColor: "black", borderRadius: 2, padding: 2 }}
            flexDirection={"column"}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <AuthContainers />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <RegisterContainer />
            </TabPanel>
          </Box>
        </Center>
      </ThemeProvider>
    </Grid>
  );
};

export default Login;