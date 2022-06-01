import { createSlice } from "@reduxjs/toolkit";


export interface Global {
    page: number;
    eventsQueryString: string;
    statusFilter: '' | 'Failed';
}

export const initialState: Global = {
    page:0,
    eventsQueryString: '',
    statusFilter: ""
};


const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    setEventsQueryString(state, action) {
        state.eventsQueryString = action.payload
      },
    setStatusFilter(state, action) {
        state.statusFilter = action.payload
      },
  },
});

export const { setPage, setEventsQueryString, setStatusFilter } = globalSlice.actions;

export default globalSlice.reducer;