// import { ColumnType, DataProjectIssue, TaskType } from "../types/types";

// export function MakeColumns(rawTasks: DataProjectIssue[], statuses:Array<string>) {
   
// const tasks:{[key:string]: TaskType}={};
//   rawTasks.forEach((task:DataProjectIssue) => {
//     tasks[task.id] = {
//       id: task.id.toString(),
//       title: task.title,
//     };
//   });
//   const columns:{[key:string]: ColumnType} = {};
//   statuses.forEach((status: string) => {
//     columns[status] = {
//       id: status,
//       title: status,
//       taskIds: [] 
//     };
//   });

//   rawTasks.forEach((task:DataProjectIssue) => {
//     const status = task.status;
//     columns[status].taskIds.push(task.id.toString());
//   });
//   console.log ('tasks', tasks, 'columns', columns)

//   return {
//     tasks,
//     columns,
//     columnOrder: statuses.filter((st:string) => columns[st]) // гарантируем порядок
//   };
// }