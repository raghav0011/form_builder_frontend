import { Alert, Snackbar } from "@mui/material";
import React from "react";

const ToastBarComponent = ({ open, onClose, severity, message }) => {
  const handleClose = () => onClose();

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={2000}
      ClickAwayListenerProps={{ onClickAway: () => null }}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default ToastBarComponent;
