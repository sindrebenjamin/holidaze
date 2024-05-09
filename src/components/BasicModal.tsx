import { useScrollLock } from "../hooks/useScrollLock";
import Close from "./icons/Close";

interface BasicModalProps {
  title: string;
  onCloseModal: () => void;
  children: React.ReactNode;
  modalIsOpen: boolean;
}

const BasicModal = ({
  title,
  onCloseModal,
  children,
  modalIsOpen,
}: BasicModalProps) => {
  useScrollLock(modalIsOpen);
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex items-center justify-center z-[1002]">
      {/* Overlay */}
      <div
        onClick={onCloseModal}
        className="bg-black bg-opacity-80 z-[1003] h-screen w-full fixed top-0 right-0"
      ></div>
      {/* Modal */}
      <div className="bg-white p-4 md:p-6 w-full md:max-w-[600px] shadow-2xl md:shadow rounded-t-lg md:rounded-lg fixed bottom-0 left-0 md:static z-[1004] max-h-[70%] flex flex-col">
        {/* Topbar  */}
        <div className="flex justify-between items-center pb-4">
          <p className="text-gray-500">{title}</p>
          <div
            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={onCloseModal}
          >
            <Close color="#9CA3AF" />
          </div>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default BasicModal;
