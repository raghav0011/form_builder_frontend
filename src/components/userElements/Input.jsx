import React from "react";
import { TextField } from "@mui/material";

const Input = ({ label, placeholder }) => {
  return (
    <div>
      <TextField
        id="outlined-basic"
        placeholder={placeholder}
        label={label}
        variant="outlined"
      />
    </div>
  );
};

export default Input;
