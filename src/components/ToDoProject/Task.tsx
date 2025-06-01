// import { Draggable } from "@hello-pangea/dnd";
// import React from "react";

// export default function Task({ task, index }) {
//   return (
//     <Draggable draggableId={task.id} index={index}>
//       {(provided, snapshot) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           style={{
//             userSelect: "none",
//             padding: 12,
//             margin: "0 0 8px 0",
//             backgroundColor: snapshot.isDragging ? "#90cdf4" : "#edf2f7",
//             border: "1px solid #cbd5e0",
//             borderRadius: 4,
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             ...provided.draggableProps.style
//           }}
//         >
//           {/* Если нужно отобразить аватарку исполнителя */}
//           {task.assignee && (
//             <img
//               src={task.assignee.avatarUrl}
//               alt={task.assignee.fullName}
//               style={{
//                 width: 24,
//                 height: 24,
//                 borderRadius: "50%"
//               }}
//             />
//           )}
//           <div style={{ fontSize: 14, fontWeight: 500 }}>
//             {task.title}
//           </div>
//         </div>
//       )}
//     </Draggable>
//   );
// }