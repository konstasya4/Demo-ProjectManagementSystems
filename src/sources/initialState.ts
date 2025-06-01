import { State } from "../types/types";

export const initialState: State = {
  dataBoards: {
    boardsData: [],
    itemBoardData: {
      id: 0,
      name: "",
      description: "",
      taskCount: 0,
    },
  },
  dataIssues: []
};
