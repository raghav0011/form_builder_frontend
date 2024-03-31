import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropdownForm = ({ label, options, index, setDropdown }) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setDropdown((prev) => {
      const updatedDropdown = [...prev];
      updatedDropdown[index] = { label: value, type: "dropdown" };
      return updatedDropdown;
    });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`dropdown-label-${index}`}>{label}</InputLabel>
        <Select
          labelId={`dropdown-label-${index}`}
          id={`dropdown-select-${index}`}
          value={selectedValue}
          label={label}
          onChange={handleChange}>
          {options.map((item, idx) => (
            <MenuItem key={idx} value={item.placeholder}>
              {item.placeholder}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropdownForm;
