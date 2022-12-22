import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import AuthContainers from "../components/auth/AuthContainers";
import RegisterContainer from "../components/auth/RegisterContainer";
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
    <Box
      style={{ backgroundImage: "url(/images/jungle.png)", backgroundSize: "cover" }}>
      <Center>
        <Box
          flexDirection={"column"}
          boxShadow={2}
          sx={{
            backgroundColor: 'white',
            width: 'auto',
          }}
        >
          <Box>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AuthContainers />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegisterContainer />
          </TabPanel>
        </Box>
      </Center>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
};

export default Login;
