import { Logout } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { collection } from "firebase/firestore";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../config/firebase";
import { Game } from "../../models/Game";

interface Props {
    games: Array<Game>;
}
const SideMenu = (props: Props) => {
    const [isOpened, setIsOpened] = useState(false);

    const [value, loading, error] = useCollection(
        collection(db, 'games'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );


    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setIsOpened(open);
            };

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
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
                    <Divider />
                    <Logout />
                </List>
            )}
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <Button onClick={toggleDrawer(true)}>Change adventure</Button>
                <Drawer
                    anchor='left'
                    open={isOpened}
                    onClose={toggleDrawer(false)}
                >
                    {list}
                </Drawer>
            </React.Fragment>
        </div>
    );
};

export default SideMenu;

