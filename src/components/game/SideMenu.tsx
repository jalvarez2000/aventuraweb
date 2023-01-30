import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import { useGetGames } from "../../services/game";
import { AddCircle } from "@mui/icons-material";
import SideMenuList from "./SideMenuList";


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

    return (
        <React.Fragment>
            <Button aria-label="add" variant="sidemenu" onClick={toggleDrawer(true)}>
                <AddCircle />
            </Button>
            <Drawer
                anchor='left'
                open={isOpened}
                onClose={toggleDrawer(false)}
            >
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <span>Document: Loading...</span>}
                <SideMenuList games={games} />
            </Drawer>
        </React.Fragment>
    );
};

export default SideMenu;

