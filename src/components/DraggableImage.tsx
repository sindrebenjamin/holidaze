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
  return (
    <div
      className="bg-transparent"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      ref={(node) => dragRef(dropRef(node))}
    >
      <img
        src={url}
        alt=""
        draggable="false"
        className="aspect-square w-full object-cover rounded-lg"
      />
      <button onClick={onClick}>Remove</button>
    </div>
  );
};

export default DraggableImage;
