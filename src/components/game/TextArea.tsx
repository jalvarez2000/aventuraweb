import { TextField } from "@mui/material";
import React from "react";

export interface TextAreaProps {
    text: string;
}

const TextArea = (props: TextAreaProps) => {
    return (
        <TextField
            id="first-name"
            label="Name"
            value={props.text}
            margin="normal"
        />
    )
};

export default TextArea; 