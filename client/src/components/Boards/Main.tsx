import { useEffect, useState } from "react"
import { getAllBoards } from "../../shared/api"
import { DataBoards } from "../../types/types"
import BoardsList from "./BoardsList"
import { useDispatch } from "react-redux";
import { setBoardsData, setItemBoardData } from "../../slices/slice";
import { initialState } from "../../sources/initialState";
import { Box } from "@mui/material";



const Main = () =>{
    const [data, setData] = useState<DataBoards[]>();
    const dispatch = useDispatch()
     
    useEffect(() => {
      const controller = new AbortController()
      getAllBoards()
        .then((res) => {   
            setData(res.data)
            if (res) dispatch(setBoardsData(res.data))}
        )
        .catch((err) => {
          console.error("Ошибка", err);
        });
        return () => controller.abort();
    }, []);
    dispatch(setItemBoardData(initialState.dataBoards.itemBoardData))
  
    return (<Box sx={{ p: 2 }}><BoardsList data={data} /></Box>)
    
  };
export default Main