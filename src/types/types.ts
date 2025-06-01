export type DataBoards={
    id: number,
    name: string,
    description:string,
    taskCount:number
}

export type BoardsListProps = DataBoards[];
// export type IssuesListProps = DataItemBoard[];

export type State = {
    dataBoards: DataBoardsState
    dataIssues: DataProjectIssue[]
}
   
export type DataBoardsState = {
    boardsData: BoardsListProps
    itemBoardData:DataBoards
}

export type DataProjectIssue = {
    id: number,
    title: string,
    description: string,
    status: string,
    priority: string,
    assignee: Assignee,
    boardId: number,
    boardName: string
}

export type Assignee = {
    id: number,
    fullName: string,
    email:string,
    avatarUrl: string
}

export type ToDoProjectBoard = {
tasks:{[key:string]: TaskType},
columns:{[key:string]: ColumnType}
}
 export type TaskType = {
    id: string;
    title: string;
    columnOrder: string[]
  };
   export type ColumnType = {
    id: string;
    title: string;
    taskIds: string[];
  };