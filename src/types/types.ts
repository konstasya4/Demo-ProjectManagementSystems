export type DataBoards = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

export type BoardsListProps = DataBoards[];

export type State = {
  dataBoards: DataBoardsState;
  dataIssues: DataIssuesState;
  dataUsers: DataUsers[];
};
export type DataIssuesState = {
  dataAllIssues: DataProjectIssue[];
  dataItemIssue: DataProjectIssue;
  dataFormsIssue: NewIssues;
};

export type DataBoardsState = {
  boardsData: BoardsListProps;
  itemBoardData: DataBoards;
  tasksBoard: DataProjectIssue[];
};

export type DataProjectIssue = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: Assignee;
  boardId: number;
  boardName: string;
};

export type Assignee = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export type ToDoProjectBoard = {
  tasks: { [key: string]: TaskType };
  columns: { [key: string]: ColumnType };
};
export type TaskType = {
  id: string;
  title: string;
  columnOrder: string[];
};
export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type DataUsers = {
  id: number;
  fullName: string;
  email: string;
  description: string;
  avatarUrl: string;
  teamId: number;
  teamName: string;
  tasksCount: number;
};

export interface TaskFormValues {
  title: string;
  description: string;
  boardId: number | null;
  status: string;
  priority: string;
  assigneeId: number | null;
}

export type NewIssues = {
  assigneeId: number;
  boardId?: number | null;
  status?: string;
  description: string;
  priority: string;
  title: string;
};
