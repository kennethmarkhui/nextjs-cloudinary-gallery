import ReactModal from "react-modal";

import classes from "./Modal.module.css";

ReactModal.setAppElement("#__next");

const Modal = ({ isOpen, onCloseModal, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      overlayClassName={classes.overlay}
      className={classes.modal}
      htmlOpenClassName={classes.html__open} // disable scroll behind the modal
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
