import { useEffect, useState } from "react"
import { getAllBoards } from "../../shared/api"
import { BoardsListProps, DataBoards } from "../../types/types"
import BoardsList from "./BoardsList"
import { useDispatch } from "react-redux";
import { setBoardsData } from "../../slices/slice";



const Main = () =>{
    const [data, setData] = useState<DataBoards[]>();
    const dispatch = useDispatch()
     
    useEffect(() => {
      getAllBoards()
        .then((res) => {
            setData(res.data)
            if (data) dispatch(setBoardsData(data))}
        )
        .catch((err) => {
          console.error("Ошибка", err);
          setData([]);
        });
    }, []);
  
    return <BoardsList data={data} />;
  };
export default Main