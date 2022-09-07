import { createSlice } from "@reduxjs/toolkit";
export interface Global {
  page: number;
  eventsQueryString: any;
  statusFilter: "" | "Failed" | "Pending" | "Completed";
  showChainModal: boolean;
  showfilterModal: boolean;
  chainSearch: string;
  departureOrDestination: any;
  switchDestination: any;
  temporaryFrom: any;
  temporaryTo: any;
  to: string;
  from: string;
}

export const initialState: Global = {
  page: 0,
  eventsQueryString: {},
  statusFilter: "",
  showChainModal: false,
  showfilterModal: false,
  chainSearch: "",
  departureOrDestination: "departure",
  switchDestination: "",
  temporaryFrom: undefined,
  temporaryTo: undefined,
  to: "To",
  from: "From",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setTo(state, action) {
      state.to = action.payload;
    },
    setFrom(state, action) {
      state.from = action.payload;
    },
    setEventsQueryString(state, action) {
      state.eventsQueryString = action.payload;
    },
    setEventsQueryStringTo(state, action) {
      state.eventsQueryString = {
        ...state.eventsQueryString,
        toChainName: action.payload,
      };
    },
    setEventsQueryStringFrom(state, action) {
      state.eventsQueryString = {
        ...state.eventsQueryString,
        fromChainName: action.payload,
      };
    },
    setEventsQueryStringType(state, action) {
      state.eventsQueryString = {
        ...state.eventsQueryString,
        type: action.payload,
      };
    },
    setTemporaryFrom(state, action) {
      state.temporaryFrom = action.payload;
    },
    setTemporaryTo(state, action) {
      state.temporaryTo = action.payload;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    setChainModal(state, action) {
      state.showChainModal = action.payload;
    },
    setFilterModal(state, action) {
      state.showfilterModal = action.payload;
    },
    setChainSearch(state, action) {
      state.chainSearch = action.payload;
    },
    setDepartureOrDestination(state, action) {
      state.departureOrDestination = action.payload;
    },
    setSwitchDestination(state, action) {
      state.switchDestination = action.payload;
    },
  },
});

export const {
  setEventsQueryString,
  setEventsQueryStringType,
  setTo,
  setFrom,
  setPage,
  setTemporaryFrom,
  setTemporaryTo,
  setEventsQueryStringTo,
  setEventsQueryStringFrom,
  setStatusFilter,
  setChainModal,
  setFilterModal,
  setChainSearch,
  setDepartureOrDestination,
  setSwitchDestination,
} = globalSlice.actions;

export default globalSlice.reducer;
