import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { DataProjectIssue } from "../../types/types";
import Card from "./Card";

type ColumnProps = {
  tasks: DataProjectIssue[];
  id: string;
  onClick?: (taskId: number) => void;
};

const Column: React.FC<ColumnProps> = ({ tasks, id, onClick }) => {
  return (
    <div className="column" style={{ margin: "0 8px", backgroundColor: "#f0f0f0", borderRadius: 4 }}>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: 500,
              padding: 8,
              backgroundColor: snapshot.isDraggingOver ? "#e0e7ff" : "#f0f0f0",
              transition: "background-color 0.3s ease",
            }}
          >
            {tasks.map((task, index) => (
              <Card key={task.id} task={task} index={index} onClick={() => onClick?.(task.id)}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
