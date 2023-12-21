import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const Modal = ({ title, handleClick, children, openModal = false, id }) => {
  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        onClose={handleClick}
        aria-labelledby={id}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id={id}>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
