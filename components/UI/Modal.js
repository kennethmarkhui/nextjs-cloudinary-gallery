import Image from "next/image";
import ReactModal from "react-modal";
import { XIcon } from "@heroicons/react/solid";
import Button from "./Button";
import { useState } from "react";

ReactModal.setAppElement("#__next");

const Modal = ({ modal, onCloseModal }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(true);
    // TODO implement timeout for showMenu correctly
    // let timeout;
    // (() => {
    //   clearTimeout(timeout);
    //   timeout = setTimeout(() => setShowMenu(false), 3000);
    // })();
  };

  return (
    <ReactModal
      isOpen={modal.isOpen}
      onRequestClose={onCloseModal}
      overlayClassName="fixed inset-0 z-30"
      className="absolute inset-0 bg-white overflow-auto"
      htmlOpenClassName="overflow-hidden" // disable scroll behind the modal
    >
      <div onMouseMove={handleShowMenu} className={`relative w-full h-full`}>
        <div
          className={`${
            showMenu ? "flex" : "hidden"
          } absolute justify-end w-full z-40`}
        >
          <Button onClick={onCloseModal}>
            <XIcon className="h-6 w-6" />
          </Button>
        </div>

        {modal.isOpen && (
          <Image
            className="max-w-full max-h-full"
            src={modal.content.src}
            alt=""
            layout="fill"
            objectFit="contain"
            quality={100}
            // width={modal.content.w}
            // height={modal.content.h}
          />
        )}
      </div>
    </ReactModal>
  );
};

export default Modal;
