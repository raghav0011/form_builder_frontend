import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckboxForm = ({ label, checked, onChange }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox checked={checked} onChange={onChange} color="primary" />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default CheckboxForm;
