import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "../sources/initialState";
import { dataReducers } from "./reducers/dataReducers";

const slice = createSlice({
  name: "slice",
  initialState: initialState,
  reducers: {
    ...dataReducers,
  },
});

export const {
  setBoardsData,
  setItemBoardData,
  setTasksBoard,
  setIssuesData,
  setItemIssuesData,
  setUsersData,
  setDataFormsIssue,
} = slice.actions;

export default slice.reducer;