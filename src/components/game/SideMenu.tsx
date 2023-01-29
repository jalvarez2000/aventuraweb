import { Box, Button, Divider, Drawer, IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useState } from "react";
import LogoutAdventure from "../auth/LogoutAdventure";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircle';
import { useGetGames } from "../../services/game";
import { AddBox, AddCircle } from "@mui/icons-material";


const SideMenu = () => {
    const [isOpened, setIsOpened] = useState(false);

    const [games, loading, error] = useGetGames();


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
            {games && (
                <List>
                    <ListItemButton style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <LogoutAdventure />
                    </ListItemButton>
                    {games.docs.map((doc) => (
                        <ListItemButton key={doc.id}>
                            <ListItemText primary={doc.data().description} />
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    );

    return (
        <React.Fragment>
            <Button aria-label="delete" onClick={toggleDrawer(true)}>
                <AddCircle />
            </Button>
            <Drawer
                anchor='left'
                open={isOpened}
                onClose={toggleDrawer(false)}
            >
                {list}
            </Drawer>
        </React.Fragment>
    );
};

export default SideMenu;

