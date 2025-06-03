import { Draggable } from "@hello-pangea/dnd";
import { DataProjectIssue } from "../../types/types";

type CardProps = {
  task: DataProjectIssue;
  index: number;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ task, index, onClick }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            padding: 16,
            marginBottom: 8,
            backgroundColor: snapshot.isDragging ? "#bbdefb" : "#fff",
            boxShadow: snapshot.isDragging ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
            borderRadius: 4,
            border: "1px solid #ddd",
            ...provided.draggableProps.style,
          }}
          onClick={onClick}
        >
          <div>
            <small>#{task.id}</small>
          </div>
          <div>{task.title}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
