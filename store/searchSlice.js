import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
  },
  reducers: {
    setSearchResultState: (state, action) => {
      state.results = action.payload;
    },
    clearSearchResultState: (state) => {
      state.results = [];
    },
  },
});

export const { setSearchResultState, clearSearchResultState } =
  searchSlice.actions;
export default searchSlice.reducer;
