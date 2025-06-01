// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   List,
//   ListItem,
//   Checkbox,
//   ListItemText,
//   IconButton,
//   Typography,
//   Paper,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
// import { getAllIssues } from '../../shared/api';

// interface Task {
//   id: string;
//   text: string;
//   completed: boolean;
// }

// // Функция перестановки элементов массива по индексам
// // const reorder = (list: Task[], startIndex: number, endIndex: number): Task[] => {
// //   const result = Array.from(list);
// //   const [removed] = result.splice(startIndex, 1);
// //   result.splice(endIndex, 0, removed);
// //   return result;
// // };

// const Main: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     getAllIssues('1')
//       .then((res) => setTasks(res.data))
//       .catch((err) => {
//         console.error("Ошибка", err);
//         setTasks([]);
//       });
//   }, []);

//   // Обработчик завершения Drag & Drop
//   const onDragEnd = (result: DropResult) => {
//     const { destination, source } = result;

//     if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
//       return;
//     }

//     // const newTasks = reorder(tasks, source.index, destination.index);
//     // setTasks(newTasks);
//   };
  

//   const addTask = () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;

//     const newTask: Task = {
//       id: Date.now().toString(),
//       text: trimmed,
//       completed: false,
//     };
//     setTasks((prev) => [newTask, ...prev]);
//     setInput('');
//   };

//   const toggleTask = (id: string) => {
//     setTasks((prev) =>
//       prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
//     );
//   };

//   const deleteTask = (id: string) => {
//     setTasks((prev) => prev.filter((task) => task.id !== id));
//   };

//   return (
//     <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
//       <Typography variant="h5" mb={2}>
//         To-Do List с react-beautiful-dnd и Material-UI
//       </Typography>

//       <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
//         <TextField
//           fullWidth
//           label="Новая задача"
//           variant="outlined"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') addTask();
//           }}
//         />
//         <Button variant="contained" onClick={addTask}>
//           Добавить
//         </Button>
//       </Box>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="todo-list">
//           {(provided) => (
//             <Paper
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//               sx={{ maxHeight: 400, overflowY: 'auto' }}
//             >
//               <List>
//                 {tasks.length === 0 && (
//                   <ListItem>
//                     <ListItemText primary="Нет задач" />
//                   </ListItem>
//                 )}
//                 {tasks.map(({ id, text, completed }, index) => (
//                   <Draggable key={id} draggableId={id} index={index}>
//                     {(providedDraggable, snapshot) => (
//                       <ListItem
//                         ref={providedDraggable.innerRef}
//                         {...providedDraggable.draggableProps}
//                         {...providedDraggable.dragHandleProps}
//                         secondaryAction={
//                           <IconButton edge="end" onClick={() => deleteTask(id)}>
//                             <DeleteIcon />
//                           </IconButton>
//                         }
//                         disablePadding
//                         sx={{
//                           userSelect: 'none',
//                           backgroundColor: snapshot.isDragging ? 'rgba(25, 118, 210, 0.1)' : 'inherit',
//                         }}
//                       >
//                         <Checkbox
//                           checked={completed}
//                           onChange={() => toggleTask(id)}
//                           sx={{ ml: 1 }}
//                         />
//                         <ListItemText
//                           primary={text}
//                           sx={{
//                             textDecoration: completed ? 'line-through' : 'none',
//                             ml: 1,
//                           }}
//                         />
//                       </ListItem>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </List>
//             </Paper>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </Box>
//   );
// };

// export default Main;

import { useEffect, useState } from "react"
import { getAllBoards, getItemBoard } from "../../shared/api"
import { BoardsListProps, DataBoards, DataProjectIssue, State } from "../../types/types"
import { useDispatch, useSelector } from "react-redux";
import { setBoardsData, setIssuesData, setItemBoardData } from "../../slices/slice";
// import ToDoProjectBoard from "./ToDoProjectBoard";



const Main = () =>{
    const [data, setData] = useState<DataProjectIssue[]>();
    const dispatch = useDispatch()
    const dataSelector = useSelector((state:State) => state.dataBoards.itemBoardData)
     
    useEffect(() => {
      getItemBoard(dataSelector.id)
        .then((res) => {
            setData(res.data)
            if (data) dispatch(setIssuesData(data))
            }
        )
        .catch((err) => {
          console.error("Ошибка", err);
          setData([]);
        });
    }, []);
  
    return <></>;
  };
export default Main