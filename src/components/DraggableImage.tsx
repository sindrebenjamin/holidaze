import { useDrag, useDrop } from "react-dnd";

type DraggableImageProps = {
  id: number;
  url: string;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  onClick: () => void;
};

type DragItem = {
  id: number;
  index: number;
};

const DraggableImage: React.FC<DraggableImageProps> = ({
  id,
  url,
  index,
  moveImage,
  onClick,
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "image",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: "image",
    hover(item: DragItem) {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  const classes = !isDragging
    ? "hover:opacity-90"
    : isDragging
    ? "opacity-50"
    : "";

  return (
    <div
      className={` flex flex-col gap-2`}
      ref={(node) => dragRef(dropRef(node))}
    >
      <img
        src={url}
        alt=""
        draggable="false"
        className={`${classes} duration-100 cursor-move aspect-square w-full object-cover rounded-lg`}
      />
      <button className="hover:opacity-50 duration-100" onClick={onClick}>
        Remove
      </button>
    </div>
  );
};

export default DraggableImage;
