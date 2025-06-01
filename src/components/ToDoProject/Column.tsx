// import React from "react";
// import Task from "./Task";
// import { Droppable } from "@hello-pangea/dnd";

// export default function Column({ column, tasks }) {
//   return (
//     <div
//       style={{
//         backgroundColor: "#f7fafc",
//         border: "1px solid #e2e8f0",
//         borderRadius: 6,
//         width: 280,
//         display: "flex",
//         flexDirection: "column",
//         maxHeight: "80vh"
//       }}
//     >
//       <h3 style={{ padding: 12, borderBottom: "1px solid #e2e8f0" }}>
//         {column.title}
//       </h3>
//       <Droppable droppableId={column.id}>
//         {(provided, snapshot) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             style={{
//               padding: 12,
//               backgroundColor: snapshot.isDraggingOver ? "#e6fffa" : "#f7fafc",
//               flexGrow: 1,
//               minHeight: 64,
//               overflowY: "auto"
//             }}
//           >
//             {tasks.map((task, index) => (
//               <Task key={task.id} task={task} index={index} />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// }