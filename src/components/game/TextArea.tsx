import { TextField } from "@mui/material";
import React from "react";

export interface TextAreaProps {
    text: string;
}

const TextArea = (props: TextAreaProps) => {
    return (
        <TextField
            id="first-name"
            label="¿Qué quieres hacer?"
            value={props.text}
            margin="normal"
            autoFocus
        />
    )
};

export default TextArea; 