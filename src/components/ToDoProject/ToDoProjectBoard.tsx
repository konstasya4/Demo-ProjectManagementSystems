// // src/KanbanBoard.js
// import React, { useState, useEffect, useCallback } from "react";
// import Column from "./Column";
// import { STATUSES } from "../../constants/constants";
// // import { buildKanbanData } from "./utils/buildKanbanData";
// import { MakeColumns } from "../../helpers/MakeColumns";
// import { DragDropContext } from "@hello-pangea/dnd";

// export default function ToDoProjectBoard({ data}) {
//   // 1) Получаем «сырые» задачи из AP

//   // 2) Локальный стейт для готовых к рендеру данных канбана
//   const [kanbanData, setKanbanData] = useState({
//     tasks:  {},
//     columns: {},
//     columnOrder: []
//   });

//   // 3) Как только rawTasks выполнились, формируем структуру
//   useEffect(() => {
//       const builtData = MakeColumns(data, STATUSES);
//       setKanbanData(builtData);
//   }, [data]);

//   // 4) Обработчик окончания перетаскивания
//   const onDragEnd = useCallback((result) => {
//     const { destination, source, draggableId } = result;

//     // 4.1. Если дропнули вне дропзоны
//     if (!destination) return;

//     // 4.2. Если попытались «перетащить» в то же самое место
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const startColumn = kanbanData.columns[source.droppableId];
//     const endColumn = kanbanData.columns[destination.droppableId];

//     // 4.3. Перетаскивание внутри одной колонки
//     if (startColumn === endColumn) {
//       const newTaskIds = Array.from(startColumn.taskIds);
//       newTaskIds.splice(source.index, 1);
//       newTaskIds.splice(destination.index, 0, draggableId);

//       const newColumn = {
//         ...startColumn,
//         taskIds: newTaskIds
//       };

//       setKanbanData((prev) => ({
//         ...prev,
//         columns: {
//           ...prev.columns,
//           [newColumn.id]: newColumn
//         }
//       }));
//       return;
//     }

//     // 4.4. Перетаскивание между разными колонками
//     // Удаляем из старой
//     const startTaskIds = Array.from(startColumn.taskIds);
//     startTaskIds.splice(source.index, 1);
//     const newStart = {
//       ...startColumn,
//       taskIds: startTaskIds
//     };
//     // Вставляем в новую
//     const endTaskIds = Array.from(endColumn.taskIds);
//     endTaskIds.splice(destination.index, 0, draggableId);
//     const newEnd = {
//       ...endColumn,
//       taskIds: endTaskIds
//     };

//     setKanbanData((prev) => ({
//       ...prev,
//       columns: {
//         ...prev.columns,
//         [newStart.id]: newStart,
//         [newEnd.id]: newEnd
//       }
//     }));
//   }, [kanbanData]);

//   if (loading) {
//     return <div>Загрузка задач…</div>;
//   }

//   // 5) Рендерим доску
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div style={{ display: "flex", gap: "16px" }}>
//         {kanbanData.columnOrder.map((columnId) => {
//           const column = kanbanData.columns[columnId];
//           // Для каждой колонки берём её список taskIds и достаём из tasks реальные объекты
//           const tasksInColumn = column.taskIds.map((taskId) => kanbanData.tasks[taskId]);
//           return (
//             <Column
//               key={column.id}
//               column={column}
//               tasks={tasksInColumn}
//             />
//           );
//         })}
//       </div>
//     </DragDropContext>
//   );
// }
