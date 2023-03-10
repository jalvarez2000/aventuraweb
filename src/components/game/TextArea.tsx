import { TextField, Typography } from "@mui/material";
import React from "react";
import sendCommandPost from "../../services/axios/command";

const TextArea = () => {

    const [command, setCommand] = React.useState("");

    const sendCommand = () => {
        console.log(command);
        sendCommandPost("lll", command);
    }

    return (
        <React.Fragment>
            <TextField
                id="command"
                label="¿Qué quieres hacer?"
                type='text'
                onKeyPress={e => e.key === 'Enter' ? sendCommand() : ""}
                onChange={e => setCommand(e.target.value)}
                autoFocus
            />
            <Typography variant="body1" component="p" color={"white"} fontFamily="Press Start" fontSize={"1.2rem"} >
            </Typography>
        </React.Fragment>
    )
};

export default TextArea; 