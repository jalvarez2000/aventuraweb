import { Box, Button, List, ListItemButton, ListItemText } from "@mui/material";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import React from "react";
import LogoutAdventure from "../auth/LogoutAdventure";

interface SideMenuListProperties {
    games: QuerySnapshot<DocumentData> | undefined;
}

const SideMenuList = (props: SideMenuListProperties) => {

    return (
        <Box sx={{ width: 250 }} role="presentation">
            <LogoutAdventure />
            {props.games && (
                <List>
                    {props.games.docs.map((doc) => (
                        <ListItemButton key={doc.id}>
                            <ListItemText primary={doc.data().description} />
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box >);
}

export default SideMenuList;