import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../styles/OrgAdd.css";
import { Box, TextField } from "@mui/material";
import Input from "./Input";
import DropdownForm from "./Dropdown";
import CheckboxForm from "./Checkbox";
import RadioForm from "./RadioForm";

const OrgDashboardTab = ({ postForm, orgData }) => {
  const [form, setForm] = useState([]);
  const [openInputModal, setOpenInputModal] = useState(false);
  const [openDropdownModal, setOpenDropdownModalModal] = useState(false);
  const [openCheckboxModal, setOpenCheckboxModal] = useState(false);
  const [openRadioModal, setOpenRadioModal] = useState(false);
  const [inputData, setInputData] = useState({ label: "", placeholder: "" });

  const [dropdownLabel, setDropdownLabel] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const [checkboxLabel, setCheckboxLabel] = useState("");

  const [radioLabel, setRadioLabel] = useState("");
  const [radioOptions, setRadioOptions] = useState([]);

  const handleAddInput = () => {
    setOpenInputModal(true);
  };
  const handleAddDropdownModal = () => {
    setOpenDropdownModalModal(true);
  };
  const handleAddCheckbox = () => {
    setOpenCheckboxModal(true);
  };
  const handleAddRadio = () => {
    setOpenRadioModal(true);
  };

  const handleCloseInputModal = () => {
    setOpenInputModal(false);
  };
  const handleCloseDropdownModal = () => {
    setOpenDropdownModalModal(false);
  };
  const handleCloseCheckboxModal = () => {
    setOpenCheckboxModal(false);
  };
  const handleCloseRadioModal = () => {
    setOpenRadioModal(false);
  };

  const handleAddDropdownOptions = () => {
    setDropdownOptions((prev) => [
      ...prev,
      { label: prev.length + 1, placeholder: prev.length + 1 },
    ]);
  };

  const handleAddRadioOptions = () => {
    setRadioOptions((prev) => [...prev, { label: prev.length + 1 }]);
  };

  const handleSaveInput = () => {
    const newInput = {
      type: "input",
      label: inputData.label,
      placeholder: inputData.placeholder,
    };
    setForm((prevForm) => [...prevForm, newInput]);
    setInputData((prevData) => ({ ...prevData, label: "", placeholder: "" }));
    handleCloseInputModal();
  };

  const handleSaveDropdown = () => {
    const newDropdown = {
      type: "dropDown",
      label: dropdownLabel,
      options: dropdownOptions,
    };
    setForm((prevForm) => [...prevForm, newDropdown]);
    setDropdownLabel("");
    setDropdownOptions([]);
    handleCloseDropdownModal();
  };

  const handleSaveRadio = () => {
    const newRadio = {
      type: "radio",
      label: radioLabel,
      options: radioOptions,
    };
    setForm((prevForm) => [...prevForm, newRadio]);
    setRadioLabel("");
    setRadioOptions([]);
    handleCloseRadioModal();
  };

  const handleSaveCheckbox = () => {
    const newInput = {
      type: "checkbox",
      label: checkboxLabel,
    };
    setForm((prevForm) => [...prevForm, newInput]);
    handleCloseCheckboxModal();
  };

  return (
    <div className="orgAdd">
      <div className="Add-section">
        <Button variant="contained" onClick={handleAddInput}>
          Add Input
        </Button>
        <Button variant="contained" onClick={handleAddDropdownModal}>
          Add DropDown
        </Button>
        <Button variant="contained" onClick={handleAddCheckbox}>
          Add CheckBox
        </Button>
        <Button variant="contained" onClick={handleAddRadio}>
          Add Radio Button
        </Button>
      </div>
      <div
        className="form"
        style={{
          marginTop: "50px",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}>
        <TextField
          id="outlined-basic"
          label="Form Name"
          variant="outlined"
          onChange={(e) =>
            setForm((prev) => {
              if (prev.length === 0) {
                return [{ formName: e.target.value }];
              } else {
                return prev.map((item, index) => {
                  if (index === 0) {
                    return { ...item, formName: e.target.value };
                  }
                  return item;
                });
              }
            })
          }
        />
        {form.map((item, index) => (
          <div key={index}>
            {item.type === "input" && (
              <Input label={item.label} placeholder={item.placeholder} />
            )}
            {item.type === "dropDown" && (
              <DropdownForm
                label={item.label}
                placeholder={item.placeholder}
                options={item.options}
              />
            )}
            {item.type === "checkbox" && <CheckboxForm label={item.label} />}
            {item.type === "radio" && (
              <RadioForm label={item.label} options={item.options} />
            )}
          </div>
        ))}
        <Button
          style={{ marginTop: "50px", width: "100px" }}
          variant="contained"
          onClick={() => postForm(form, orgData?.id)}>
          Submit
        </Button>
      </div>
      {/* Modal */}
      <Modal
        open={openInputModal}
        onClose={handleCloseInputModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}>
          <h2 id="modal-modal-title">
            <TextField
              id="outlined-basic"
              label="Label"
              variant="outlined"
              onChange={(e) =>
                setInputData((prev) => ({ ...prev, label: e.target.value }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Placeholder"
              variant="outlined"
              onChange={(e) =>
                setInputData((prev) => ({
                  ...prev,
                  placeholder: e.target.value,
                }))
              }
            />
            <Button variant="contained" onClick={handleSaveInput}>
              Save
            </Button>
          </h2>
        </div>
      </Modal>
      <Modal
        open={openDropdownModal}
        onClose={handleCloseDropdownModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}>
          <h2 id="modal-modal-title">
            <Box display={"flex"} flexDirection={"column"} gap={5}>
              <TextField
                id="outlined-basic"
                label="Dropdown Label"
                variant="outlined"
                onChange={(e) => setDropdownLabel(e.target.value)}
              />
              <Box>
                {dropdownOptions.map((item, index) => (
                  <div key={index}>
                    <TextField
                      label={`option ${item.label}`}
                      placeholder={`option ${item.placeholder}`}
                      onChange={(e) =>
                        setDropdownOptions((prev) => {
                          const updatedOptions = [...prev];
                          updatedOptions[index] = {
                            ...updatedOptions[index],
                            label: e.target.value,
                            placeholder: e.target.value,
                          };
                          return updatedOptions;
                        })
                      }
                    />
                  </div>
                ))}
              </Box>
              <Button variant="contained" onClick={handleAddDropdownOptions}>
                Add Options
              </Button>
              <Button variant="contained" onClick={handleSaveDropdown}>
                Save
              </Button>
            </Box>
          </h2>
        </div>
      </Modal>
      <Modal
        open={openCheckboxModal}
        onClose={handleCloseCheckboxModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}>
          <h2 id="modal-modal-title">
            <Box display={"flex"} gap={5} flexDirection={"column"}>
              <TextField
                id="outlined-basic"
                label="Checkbox Label"
                variant="outlined"
                onChange={(e) => setCheckboxLabel(e.target.value)}
              />
              <Button variant="contained" onClick={handleSaveCheckbox}>
                Save
              </Button>
            </Box>
          </h2>
        </div>
      </Modal>
      <Modal
        open={openRadioModal}
        onClose={handleCloseRadioModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}>
          <h2 id="modal-modal-title">
            <Box display={"flex"} flexDirection={"column"} gap={5}>
              <TextField
                id="outlined-basic"
                label="Radio Label"
                variant="outlined"
                onChange={(e) => setRadioLabel(e.target.value)}
              />
              <Box>
                {radioOptions.map((item, index) => (
                  <div key={index}>
                    <TextField
                      label={`option ${item.label}`}
                      placeholder={`option ${item.placeholder}`}
                      onChange={(e) =>
                        setRadioOptions((prev) => {
                          const updatedOptions = [...prev];
                          updatedOptions[index] = {
                            ...updatedOptions[index],
                            label: e.target.value,
                          };
                          return updatedOptions;
                        })
                      }
                    />
                  </div>
                ))}
              </Box>
              <Button variant="contained" onClick={handleAddRadioOptions}>
                Add Radio Options
              </Button>
              <Button variant="contained" onClick={handleSaveRadio}>
                Save
              </Button>
            </Box>
          </h2>
        </div>
      </Modal>
    </div>
  );
};

export default OrgDashboardTab;
