import { createSlice } from '@reduxjs/toolkit'

import { initialState } from '../sources/initialState.ts'
// import { dataReducers } from './reducers/dataReducers.ts'
// import { loadingReducers } from './reducers/loadingReducers.ts'
// import { valuesReducers } from './reducers/valuesReducers.ts'
// import { nsiReducers } from './reducers/nsiReducers.ts'

const slice = createSlice({
  name: 'slice',
  initialState: initialState,
  reducers: {
    // ...dataReducers,
    // ...loadingReducers,
    // ...valuesReducers,
    // ...nsiReducers,
  },
})

export const {
//   setData,
//   setMainFormValues,
//   startLoading,
//   endLoading,
//   startLoadingRoads,
//   endLoadingRoads,
//   startLoadingDepots,
//   endLoadingDepots,
//   startLoadingSeries,
//   endLoadingSeries,
//   setRoads,
//   setDepots,
//   setSeries,
} = slice.actions

export default slice.reducer
