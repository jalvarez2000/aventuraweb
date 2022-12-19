import { useEffect } from "react";
import Logout from "../components/auth/Logout";
import Center from "../components/utils/Center";

interface Props {}

const Home = (props: Props) => {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Center>
      <Logout />
    </Center>
  );
};

export default Home;
