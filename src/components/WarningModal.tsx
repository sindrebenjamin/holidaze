import { useScrollLock } from "../hooks/useScrollLock";
import Button from "./Button";
import Close from "./icons/Close";

interface WarningModalProps {
  onCloseModal: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  modalIsOpen: boolean;
}

const WarningModal = ({
  children,
  onCloseModal,
  onConfirm,
  modalIsOpen,
}: WarningModalProps) => {
  useScrollLock(modalIsOpen);
  return (
    <div
      className={`${
        !modalIsOpen && "hidden"
      } h-screen w-full fixed left-0 top-0 flex items-center justify-center z-[1002]`}
    >
      {/* Overlay */}
      <div
        onClick={onCloseModal}
        className="bg-black bg-opacity-80 z-[1003] h-screen w-full fixed top-0 right-0"
      ></div>
      {/* Modal */}
      <div className="bg-white w-full max-w-[400px] m-4 sm:m-6 shadow rounded-lg z-[1004] flex flex-col">
        {/* Topbar  */}
        <div className="flex justify-between items-center pt-4 px-4 sm:pt-6 sm:px-6 self-end">
          <div
            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
            onClick={onCloseModal}
          >
            <Close color="#9CA3AF" />
          </div>
        </div>
        {/* Content  */}
        <div className="flex flex-col gap-4 items-center p-4 sm:p-6 mt-[-16px]">
          <svg
            width={43}
            height={42}
            viewBox="0 0 43 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5 14V21M21.5 28H21.5175M37.25 21C37.25 23.0683 36.8426 25.1164 36.0511 27.0273C35.2596 28.9381 34.0995 30.6744 32.6369 32.1369C31.1744 33.5995 29.4381 34.7596 27.5273 35.5511C25.6164 36.3426 23.5683 36.75 21.5 36.75C19.4317 36.75 17.3836 36.3426 15.4727 35.5511C13.5619 34.7596 11.8256 33.5995 10.3631 32.1369C8.90055 30.6744 7.74041 28.9381 6.9489 27.0273C6.15739 25.1164 5.75 23.0683 5.75 21C5.75 16.8228 7.40937 12.8168 10.3631 9.86307C13.3168 6.90937 17.3228 5.25 21.5 5.25C25.6772 5.25 29.6832 6.90937 32.6369 9.86307C35.5906 12.8168 37.25 16.8228 37.25 21Z"
              stroke="#9CA3AF"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-gray-500 text-center">{children}</p>

          <div className="flex gap-4">
            <Button onClick={onConfirm} size="md" color="pink">
              Yes, I'm sure
            </Button>
            <Button onClick={onCloseModal} color="white" size="md">
              No, cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
