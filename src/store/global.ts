import { createSlice } from "@reduxjs/toolkit";
export interface Global {
  page: number;
  eventsQueryString: any;
  eventsQueryStringSearch: string;
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
  resetStatusAndType: boolean;
  showByCollection: string;
  resetSearch: boolean;
}

export const initialState: Global = {
  page: 0,
  eventsQueryString: {},
  eventsQueryStringSearch: "",
  statusFilter: "",
  showChainModal: false,
  showfilterModal: false,
  chainSearch: "",
  departureOrDestination: "departure",
  switchDestination: "",
  temporaryFrom: undefined,
  temporaryTo: undefined,
  to: "All chains",
  from: "All chains",
  resetStatusAndType: true,
  showByCollection: "",
  resetSearch: false,
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
      console.log("search:", action.payload);
      state.to = "All chains";
      state.from = "All chains";
      state.resetStatusAndType = !state.resetStatusAndType;
      state.eventsQueryString = action.payload;
    },
    setEventsQueryStringTo(state, action) {
      // if (
      //   typeof state.eventsQueryString === "string" &&
      //   state.eventsQueryString.length > 0
      // ) {
      //   state.eventsQueryString = {};
      // }
      state.eventsQueryString = {
        ...state.eventsQueryString,
        toChainName:
          action.payload === "All chains" ? undefined : action.payload,
      };
    },
    setEventsQueryStringFrom(state, action) {
      if (
        typeof state.eventsQueryString === "string" &&
        state.eventsQueryString.length > 0
      ) {
        state.eventsQueryString = {};
        state.resetSearch = true;
      }
      state.eventsQueryString = {
        ...state.eventsQueryString,
        fromChainName:
          action.payload === "All chains" ? undefined : action.payload,
      };
    },
    setResetSearch(state, action) {
      state.resetSearch = action.payload;
    },
    setEventsQueryStringType(state, action) {
      // if (
      //   typeof state.eventsQueryString === "string" &&
      //   state.eventsQueryString.length > 0
      // ) {
      //   state.eventsQueryString = {};
      // }
      state.eventsQueryString = {
        ...state.eventsQueryString,
        type: action.payload,
      };
    },
    setEventsQueryStringSearch(state, action) {
      state.eventsQueryStringSearch = action.payload;
    },
    setTemporaryFrom(state, action) {
      state.temporaryFrom = action.payload;
    },
    setTemporaryTo(state, action) {
      state.temporaryTo = action.payload;
    },
    setStatusFilter(state, action) {
      // if (
      //   typeof state.eventsQueryString === "string" &&
      //   state.eventsQueryString.length > 0
      // ) {
      //   state.eventsQueryString = {};
      // }
      state.statusFilter = action.payload;
      state.eventsQueryString = {
        ...state.eventsQueryString,
        status: action.payload,
      };
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
    setShowByCollection(state, action) {
      state.showByCollection = action.payload;
      console.log("global nameCollection", state.showByCollection);
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
  setEventsQueryStringSearch,
  setStatusFilter,
  setChainModal,
  setFilterModal,
  setChainSearch,
  setDepartureOrDestination,
  setSwitchDestination,
  setShowByCollection,
  setResetSearch,
} = globalSlice.actions;

export default globalSlice.reducer;
