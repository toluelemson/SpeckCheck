import React from "react";
import { ControlsClose } from "@heathmont/moon-icons-tw";
import useDeviceType from "@/src/hooks/useDeviceType";

export type ModalProps = {
  className?: string;
  openModal: boolean;
  modalContent: React.JSX.Element;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};


const Modal = ({
  modalContent,
  openModal,
  setOpenModal,
  className,
}: ModalProps) => {
  const { isMobile } = useDeviceType();
  return (
    <div>
      {openModal && (
        <div>
          <div
            onClick={() => setOpenModal(false)}
            className={`z-10000 fixed w-[100%] h-[100%] top-0 left-0 z-50 bg-black opacity-75`}
          ></div>
          <div
            className={`z-10000 fixed bg-white top-1/3 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl ${className}`}
          >
            <div className="flex flex-col items-center w-full">
              {!isMobile && (
                <button>
                  <ControlsClose
                    onClick={() => setOpenModal(false)}
                    height={35}
                    width={35}
                    color="black"
                    className="p-2 top-2 right-2 fixed"
                  />
                </button>
              )}

              {/* Modal Content */}
              <div>{modalContent}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
