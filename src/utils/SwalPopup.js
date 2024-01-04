// utils.js

import Swal from "sweetalert2";

const showSuccessMessage = (message,icon) => {
  Swal.fire({
    icon,
    position: "center",
    showConfirmButton: false,
    timer: 2500,
    title: message,
  });
};
export default showSuccessMessage;