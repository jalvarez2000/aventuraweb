import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import Logout from "../components/auth/Logout";
import { auth, db } from "../config/firebase";
import { collection } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import SideMenu from "../components/game/SideMenu";



interface Props { }

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Home = (props: Props) => {

  return (
    <SideMenu games={[]} />
  );
}

export default Home;
