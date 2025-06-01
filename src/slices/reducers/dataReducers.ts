import { PayloadAction } from '@reduxjs/toolkit'

import { DataBoards, DataProjectIssue, State } from '../../types/types'

export const dataReducers = {
  setBoardsData: (state: State, action: PayloadAction<DataBoards[]>) => {
    state.dataBoards.boardsData = action.payload
  },
  setItemBoardData: (state: State, action: PayloadAction<DataBoards>) => {
    state.dataBoards.itemBoardData = action.payload
  },
  setIssuesData: (state: State, action: PayloadAction<DataProjectIssue[]>) => {
    state.dataIssues = action.payload
  },
}
   