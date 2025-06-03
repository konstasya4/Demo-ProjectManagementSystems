import { DataProjectIssue } from "../../types/types";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch} from "react-redux";
import { setItemIssuesData } from "../../slices/slice";
import TaskModal from "../modalWindow/ModalWindow";
import { useState } from "react";
import { getItemIssue } from "../../shared/api";

type IssuesListProps = {
  data?: DataProjectIssue[];
};

const IssuesList = ({ data }: IssuesListProps) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(
    undefined
  );

  if (!data) return <CircularProgress />;

  if (data.length === 0) return <Typography>Список задач пуст</Typography>;

  const openTaskModal = (taskId?: number) => {
    if (!taskId) return;
    getItemIssue(taskId)
      .then((res) => {
        dispatch(setItemIssuesData(res.data));
        setSelectedTaskId(taskId);
        setModalOpen(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeTaskModal = () => {
    setModalOpen(false);
    setSelectedTaskId(undefined);
  };

  return (
    <>
      <List sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        mb: 3,
        flexWrap: "wrap",
      }}>
        {data.map((task) => (
          <ListItem
            key={task.id}
            divider
            className="list-item"
            onClick={() => openTaskModal(task.id)}
          >
            <ListItemText primary={task.title} secondary={`Исполнитель: ${task.assignee.fullName}`}/>
          </ListItem>
        ))}
      </List>

      <TaskModal
        open={modalOpen}
        onClose={closeTaskModal}
        taskId={selectedTaskId}
        onSaveSuccess={closeTaskModal}
      />
    </>
  );
};

export default IssuesList