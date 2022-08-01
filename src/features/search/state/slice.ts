import { createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";
import { musicSearch } from "./thunks";
import { LoadingStatus } from "../../types";


const initialState: InitialState = {
  musicSearch: [] as unknown as InitialState["musicSearch"],
  status: LoadingStatus.IDLE,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(musicSearch.pending, (state) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(musicSearch.fulfilled, (state, action) => {
        state.status = LoadingStatus.IDLE;
        state.musicSearch = action.payload.results;
      })
      .addCase(musicSearch.rejected, (state) => {
        state.status = LoadingStatus.FAILED;
      });
  },
});

export default searchSlice.reducer;
