import { useEffect } from "react";
import { getItemBoard } from "../../shared/api";
import { State } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { setTasksBoard } from "../../slices/slice";
import ToDoProjectBoard from "./ToDoProjectBoard";

const Main = () => {
  const dispatch = useDispatch();
  const dataSelector = useSelector(
    (state: State) => state.dataBoards.itemBoardData
  );
  const data = useSelector((state: State) => state.dataBoards.tasksBoard);

  useEffect(() => {
    const controller = new AbortController();
    if (dataSelector?.id && dataSelector.id !== 0) {
      getItemBoard(dataSelector?.id)
        .then((res) => {
          dispatch(setTasksBoard(res.data));
        })
        .catch((err) => {
          console.error("Ошибка", err);
        });
    }
    return () => controller.abort();
  }, []);

  return <ToDoProjectBoard tasks={data} />;
};
export default Main;
