import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import Logout from "../components/auth/Logout";
import { auth, db } from "../config/firebase";
import { collection } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';



interface Props { }

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Home = (props: Props) => {
  const [value, loading, error] = useCollection(
    collection(db, 'games'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.info("User detected JAA.");
    } else {
      console.info("No user detected JAA");
    }
  });

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {value && (
        <List>
          {value.docs.map((doc) => (
            <ListItemButton>
              <ListItemText primary={doc.data().description} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Home;
