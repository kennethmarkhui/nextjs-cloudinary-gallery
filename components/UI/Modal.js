import Image from "next/image";
import ReactModal from "react-modal";
import { XIcon } from "@heroicons/react/solid";
import Button from "./Button";

ReactModal.setAppElement("#__next");

const Modal = ({ modal, onCloseModal }) => {
  return (
    <ReactModal
      isOpen={modal.isOpen}
      onRequestClose={onCloseModal}
      overlayClassName="fixed inset-0 z-30"
      className="absolute inset-0 bg-white overflow-auto border rounded-md outline-none"
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-end">
          <Button onClick={onCloseModal}>
            <XIcon className="h-6 w-6" />
          </Button>
        </div>
        <div className={`w-full h-full relative`}>
          <div className="w-full h-full flex items-center justify-center">
            {modal.isOpen && (
              <Image
                className="max-w-full max-h-full rounded-lg"
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
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
