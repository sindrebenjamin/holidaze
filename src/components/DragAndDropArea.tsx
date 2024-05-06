import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const DragAndDropArea = ({ children }: { children: React.ReactNode }) => {
  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };
  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </DndProvider>
  );
};

export default DragAndDropArea;
