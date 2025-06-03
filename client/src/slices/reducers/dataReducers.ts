import { PayloadAction } from '@reduxjs/toolkit'

import { DataBoards, DataProjectIssue, DataUsers, NewIssues, State } from '../../types/types'

export const dataReducers = {
  setBoardsData: (state: State, action: PayloadAction<DataBoards[]>) => {
    state.dataBoards.boardsData = action.payload
    localStorage.setItem('boardsData', JSON.stringify(action.payload));
  },
  setItemBoardData: (state: State, action: PayloadAction<DataBoards>) => {
    state.dataBoards.itemBoardData = action.payload
    localStorage.setItem('itemBoardData', JSON.stringify(action.payload));
  },
  setTasksBoard:(state: State, action: PayloadAction<DataProjectIssue[]>) => {
    state.dataBoards.tasksBoard = action.payload
  },
  setIssuesData: (state: State, action: PayloadAction<DataProjectIssue[]>) => {
    state.dataIssues.dataAllIssues = action.payload
  },
  setItemIssuesData:(state: State, action: PayloadAction<DataProjectIssue>) => {
    state.dataIssues.dataItemIssue = action.payload
  },
  setUsersData: (state: State, action: PayloadAction<DataUsers[]>) => {
    state.dataUsers = action.payload
  },
  setDataFormsIssue: (state: State, action: PayloadAction<NewIssues>) => {
    state.dataIssues.dataFormsIssue = action.payload
  },
}
   