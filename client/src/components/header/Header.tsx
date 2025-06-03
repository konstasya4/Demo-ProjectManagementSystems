import { Button, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import paths from "../../constants/routes/paths";
import TaskModal from "../modalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../types/types";
import { getItemBoard } from "../../shared/api";
import { setTasksBoard } from "../../slices/slice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const pathMap: { [key: number]: string } = {
    0: paths.issues,
    1: paths.boards,
  };

  const getIndexByPath = (pathname: string) => {
    if (pathname === paths.issues) return 0;
    if (pathname === paths.boards) return 1;
    return 1;
  };

  const selectedBoard = useSelector(
    (state: State) => state.dataBoards.itemBoardData
  );

  const [value, setValue] = useState(getIndexByPath(location.pathname));
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const isOnProjectBoardPage = location.pathname.startsWith(
    paths.toDoProject + "/"
  );

  useEffect(() => {
    const currentIndex = getIndexByPath(location.pathname);
    if (currentIndex !== value) {
      setValue(currentIndex);
    }
  }, [location.pathname, value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const path = pathMap[newValue];
    if (path) {
      navigate(path);
    }
  };

  const handleOpenTaskModal = () => setIsTaskModalOpen(true);
  const handleCloseTaskModal = () => setIsTaskModalOpen(false);

  const handleSaveSuccess = () => {
    getItemBoard(selectedBoard.id).then((res) => {
      dispatch(setTasksBoard(res.data));
    });
    setIsTaskModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "2px solid rgba(0,0,0,0.2)",
        paddingBottom: "1vh",
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Все задачи" />
        <Tab
          label="Проекты"
          onClick={(event) => {
            handleChange(event, 1);
          }}
        />
      </Tabs>
      <Button style={{ marginRight: "2vw" }} onClick={handleOpenTaskModal}>
        Создать задачу
      </Button>
      <TaskModal
        open={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onSaveSuccess={() => handleSaveSuccess()}
        {...(isOnProjectBoardPage && selectedBoard?.id
          ? { currentBoardId: selectedBoard.id }
          : {})}
      />
    </div>
  );
};

export default Header;
