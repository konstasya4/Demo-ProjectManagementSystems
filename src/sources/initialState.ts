import { State } from "../types/types";

const savedItemBoard = localStorage.getItem("itemBoardData");
const savedBords = localStorage.getItem("boardsData");

export const initialState: State = {
  dataBoards: {
    boardsData: savedBords ? JSON.parse(savedBords) : [],
    itemBoardData: savedItemBoard
      ? JSON.parse(savedItemBoard)
      : {
          id: 0,
          name: "",
          description: "",
          taskCount: 0,
        },
    tasksBoard: [],
  },
  dataIssues: {
    dataAllIssues: [],
    dataItemIssue: {
      id: 0,
      title: "",
      description: "",
      status: "",
      priority: "",
      assignee: {
        id: 0,
        fullName: "",
        email: "",
        avatarUrl: "",
      },
      boardId: 0,
      boardName: "",
    },
    dataFormsIssue: {
      assigneeId: 0,
      boardId: 0,
      status: "",
      description: "",
      priority: "",
      title: "",
    },
  },
  dataUsers: [],
};
