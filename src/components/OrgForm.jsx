import { Box, Button, FormControl, Select, TextField } from "@mui/material";
import React, {useState} from "react";
import RadioForm from "./userElements/RadioForm";
import DropdownForm from "./userElements/Dropdown";
import CheckboxForm from "./userElements/Checkbox";

const OrgForm = ({ formDetail, handleSubmit, userId }) => {
  const [inputData, setInputData] = useState();
  const [dropwDown, setDropdown] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [radioButton, setRadio] = useState([]);

  const fieldTypes = formDetail.form_fields[0].field_type
    .split(",")
    .map((type) => {
      const [fieldNumber, fieldType] = type.split(":");
      return { fieldNumber: parseInt(fieldNumber), fieldType };
    });

  const fieldLabels = formDetail.form_fields[0].field_label
    .split(",")
    .map((type) => {
      const [fieldNumber, fieldLabel] = type.split(":");
      return { fieldNumber: parseInt(fieldNumber), fieldLabel };
    });

  let fieldOptions = [];

  if (formDetail.form_fields[0].field_options.trim() !== "") {
    fieldOptions = formDetail.form_fields[0].field_options
      .split(";")
      .map((part) => {
        const [index, labelsString] = part.split(":");
        const labelValues = labelsString.split(",");
        return { index: parseInt(index), options: labelValues };
      });
  }

  const formData = {
    fieldTypes: fieldTypes,
    fieldLabels: fieldLabels,
    fieldOptions: fieldOptions,
  };

  const combinedArray = [];

  for (let i = 0; i < formData.fieldTypes.length; i++) {
    combinedArray.push({
      ...formData.fieldTypes[i],
      ...formData.fieldLabels.find(
        (label) => label.fieldNumber === formData.fieldTypes[i].fieldNumber
      ),
      ...formData.fieldOptions.find(
        (option) => option.index === formData.fieldTypes[i].fieldNumber
      ),
    });
  }

  const form = {
    inputData,
    dropwDown,
    checkbox,
    radioButton,
  };

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={5}>
        {combinedArray?.map((field, index) => (
          <div key={index}>
            {/* <h1>lol</h1> */}
            {field.fieldType === "textbox" && (
              <TextField
                id={`outlined-basic-${index}`}
                label={field.fieldLabel}
                variant="outlined"
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    [index]: { label: e.target.value, type: "textfield" },
                  }))
                }
              />
            )}

            {field.fieldType === "dropdown" && (
              <DropdownForm
                label={field.fieldLabel}
                options={field.options.map((option) => ({
                  label: option,
                  placeholder: option,
                }))}
                index={index}
                setDropdown={setDropdown}
              />
            )}

            {field.fieldType === "radiobutton" && (
              <RadioForm
                label={field.fieldLabel}
                options={field.options.map((option) => ({
                  label: option,
                  type: "radio",
                }))}
                index={index}
                radioData={radioButton}
                setRadioData={setRadio}
              />
            )}

            {field.fieldType === "checkbox" && (
              <CheckboxForm
                label={field.fieldLabel}
                checked={checkbox[index] || false}
                onChange={(e) =>
                  setCheckbox({
                    ...checkbox,
                    [index]: e.target.checked,
                    type: "checkbox",
                  })
                }
              />
            )}
          </div>
        ))}
        <Box marginTop={5}>
          <Button onClick={() => handleSubmit(form, formDetail?.id, userId)}>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OrgForm;
