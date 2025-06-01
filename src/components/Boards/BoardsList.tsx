import { DataBoards } from "../../types/types";
import { Button, CircularProgress, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import './style.css'
import { useNavigate } from "react-router-dom";
import paths from "../../constants/routes/paths";
import { useDispatch } from "react-redux";
import { setItemBoardData } from "../../slices/slice";

type BoardsListProps = {
  data?: DataBoards[];
};

 const BoardsList = ({ data }: BoardsListProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  if (!data) return <CircularProgress />;

  if (data.length === 0) return <Typography>Список досок пуст</Typography>;

  const handleChange= (id:number) => {
    navigate(`${paths.toDoProject}/${id}`)
    dispatch(setItemBoardData(data[id]))
  }

  return (
      <List>
        {data.map((board) => (
          <ListItem key={board.id} divider className="list-item">
            <ListItemText
              primary={board.name}
            />
            <Button onClick={()=>handleChange(board.id)}>Перейти к доске</Button>
          </ListItem>
        ))}
      </List>
  );
}

export default BoardsList
