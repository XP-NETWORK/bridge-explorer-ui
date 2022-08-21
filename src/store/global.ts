import { createSlice } from "@reduxjs/toolkit";
export interface Global {
  page: number;
  eventsQueryString: any;
  statusFilter: '' | 'Failed';
  showChainModal: boolean,
  departureOrDestination: any,
  switchDestination: any,
  temporaryFrom: any,
  temporaryTo: any,
  to: string
  from: string
}

export const initialState: Global = {
  page: 0,
  eventsQueryString: "",
  statusFilter: "",
  showChainModal: false,
  departureOrDestination: "departure",
  switchDestination: "",
  temporaryFrom: undefined,
  temporaryTo: undefined,
  to: "To",
  from: "From"
};


const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    setTo(state, action) {
      state.to = action.payload;
    },
    setFrom(state, action) {
      state.from = action.payload;
    },
    setEventsQueryString(state, action) {
      state.eventsQueryString = action.payload
    },
    setTemporaryFrom(state, action) {
      state.temporaryFrom = action.payload;
    },
    setTemporaryTo(state, action) {
      state.temporaryTo = action.payload;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload
    },
    setChainModal(state, action) {
      state.showChainModal = action.payload;
    },
    setDepartureOrDestination(state, action) {
      state.departureOrDestination = action.payload;
    },
    setSwitchDestination(state, action) {
      state.switchDestination = action.payload;
    },
  },
});

export const { setTo , setFrom , setPage, setTemporaryFrom, setTemporaryTo, setEventsQueryString, setStatusFilter, setChainModal, setDepartureOrDestination, setSwitchDestination } = globalSlice.actions;

export default globalSlice.reducer;