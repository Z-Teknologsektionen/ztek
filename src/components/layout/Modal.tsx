import type { FC, PropsWithChildren } from "react";
import { useCallback, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

interface IModal {
  buttonText: string;
  disabled?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryOnSubmit?: () => void;
  secondayButtonText?: string;
  title?: string;
}

const Modal: FC<PropsWithChildren<IModal>> = ({
  children,
  onClose,
  isOpen,
  disabled = false,
  title = "",
  onSubmit,
  buttonText,
  secondaryOnSubmit,
  secondayButtonText,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-zDarkGray/50 outline-none focus:outline-none">
      <div className="h-fit max-h-[80%] w-full max-w-[80%]">
        <div
          className={`flex h-full flex-col space-y-8 rounded-lg bg-zWhite px-4 py-6 shadow duration-500 ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <header className="relative flex flex-row">
            <button className="absolute" onClick={handleClose} type="button">
              <MdClose className="h-8" size={24} />
            </button>
            <h1 className="mx-auto w-fit px-8 text-center text-2xl font-semibold">
              {title}
            </h1>
          </header>
          <div className="min-h-[64px] flex-grow overflow-y-auto">
            {children}
          </div>
          <footer className="flex flex-row gap-2">
            {secondaryOnSubmit && secondayButtonText && (
              <button
                className="w-full rounded border-2 border-zRed bg-gray-100 px-2 py-2 shadow"
                onSubmit={() => secondaryOnSubmit()}
                type="button"
              >
                {secondayButtonText}
              </button>
            )}
            <button
              className="w-full rounded border-2 border-zLightGray bg-zRed px-2 py-2 shadow"
              onClick={() => onSubmit()}
              type="button"
            >
              {buttonText}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Modal;
