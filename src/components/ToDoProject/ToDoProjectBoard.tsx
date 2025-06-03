import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DragDropContext,
  DropResult,
} from "@hello-pangea/dnd";

import { DataProjectIssue, State } from "../../types/types";
import { setItemIssuesData, setTasksBoard } from "../../slices/slice";
import {
  getItemBoard,
  getItemIssue,
  updateStatusIssue,
} from "../../shared/api";

import Column from "./Column";
import { COLUMN_STATUSES } from "../../constants/constants";
import TaskModal from "../modalWindow/ModalWindow";

type IssuesTasksProps = {
  tasks: DataProjectIssue[];
};

const ToDoProjectBoard = ({ tasks }: IssuesTasksProps) => {
  const dispatch = useDispatch();
  const selectedBoard = useSelector(
    (state: State) => state.dataBoards.itemBoardData
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number>();

  const tasksByColumnId: { [key: string]: DataProjectIssue[] } = Object.entries(
    COLUMN_STATUSES
  ).reduce((acc, [columnId, { status }]) => {
    acc[columnId] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as { [key: string]: DataProjectIssue[] });

  const openTaskModal = (taskId?: number) => {
    setEditingTaskId(taskId);
    setModalOpen(true);

    if (taskId) {
      getItemIssue(taskId).then((res) => dispatch(setItemIssuesData(res.data)));
    }
  };

  const closeTaskModal = () => {
    setModalOpen(false);
    setEditingTaskId(undefined);
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const taskId = Number(draggableId);
    const newStatus = COLUMN_STATUSES[destination.droppableId]?.status;
    if (!newStatus) return;
    const controller = new AbortController();
    try {
      await updateStatusIssue(taskId, newStatus);
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      dispatch(setTasksBoard(updatedTasks));
    } catch (error) {
      console.error("Ошибка обновления статуса", error);
    }
    return () => controller.abort();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>{selectedBoard?.name}</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "0 auto",
          maxWidth: 1300,
        }}
      >
        <thead>
          <tr>
            {Object.entries(COLUMN_STATUSES).map(([columnId, { title }]) => (
              <th
                key={columnId}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "lightblue",
                }}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.entries(COLUMN_STATUSES).map(([columnId]) => (
              <td
                key={columnId}
                style={{
                  border: "1px solid #ccc",
                  verticalAlign: "top",
                  padding: "8px",
                  minHeight: 500,
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Column
                  id={columnId}
                  tasks={tasksByColumnId[columnId] || []}
                  onClick={openTaskModal}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <TaskModal
        open={modalOpen}
        onClose={closeTaskModal}
        taskId={editingTaskId}
        currentBoardId={selectedBoard?.id}
        onSaveSuccess={() => {
          if (selectedBoard?.id) {
            getItemBoard(selectedBoard.id).then((res) => {
              dispatch(setTasksBoard(res.data));
            });
          }
          closeTaskModal();
        }}
      />
    </DragDropContext>
  );
};

export default ToDoProjectBoard;
