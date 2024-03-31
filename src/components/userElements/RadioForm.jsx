import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RadioForm = ({ label, options, index, radioData, setRadioData }) => {
  const handleChange = (event) => {
    setRadioData({ ...radioData, [index]: event.target.value });
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={label}
        name={label}
        value={radioData[index] || ""}
        onChange={handleChange}>
        {options.map((option, optionIndex) => (
          <FormControlLabel
            key={optionIndex}
            value={option.label}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioForm;
