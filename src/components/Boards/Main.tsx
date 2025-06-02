import { useEffect, useState } from "react"
import { getAllBoards } from "../../shared/api"
import { DataBoards } from "../../types/types"
import BoardsList from "./BoardsList"
import { useDispatch } from "react-redux";
import { setBoardsData, setItemBoardData } from "../../slices/slice";
import { initialState } from "../../sources/initialState";



const Main = () =>{
    const [data, setData] = useState<DataBoards[]>();
    const dispatch = useDispatch()
     
    useEffect(() => {
      getAllBoards()
        .then((res) => {
            setData(res.data)
            if (res) dispatch(setBoardsData(res.data))}
        )
        .catch((err) => {
          console.error("Ошибка", err);
        });
    }, []);
    dispatch(setItemBoardData(initialState.dataBoards.itemBoardData))
  
    return <BoardsList data={data} />;
  };
export default Main