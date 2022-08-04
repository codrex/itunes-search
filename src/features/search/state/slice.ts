import { createSlice } from "@reduxjs/toolkit";

import { LoadingStatus } from "../../types";
import { InitialState } from "./types";
import { musicSearch, musicSearchLoadMore } from "./thunks";


const initialState: InitialState = {
  musicSearch: [] as unknown as InitialState["musicSearch"],
  status: LoadingStatus.IDLE,
  limit: 10,
  offset: 0,
  hasNextPage: false
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(musicSearch.pending, (state) => {
        state.status = LoadingStatus.LOADING;
        state.musicSearch =  [] as unknown as InitialState["musicSearch"];
      })
      .addCase(musicSearch.fulfilled, (state, action) => {
        state.status = LoadingStatus.IDLE;
        state.offset = state.limit
        state.musicSearch = action.payload.results;
        state.hasNextPage = action.payload.results.length > 0
      })
      .addCase(musicSearch.rejected, (state) => {
        state.status = LoadingStatus.FAILED;
      })
      .addCase(musicSearchLoadMore.pending, (state) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(musicSearchLoadMore.fulfilled, (state, action) => {
        state.status = LoadingStatus.IDLE;
        state.offset += state.limit
        state.musicSearch = [...state.musicSearch, ...action.payload.results] as unknown as  InitialState["musicSearch"];
        state.hasNextPage = action.payload.results.length > 0
      })
      .addCase(musicSearchLoadMore.rejected, (state) => {
        state.status = LoadingStatus.FAILED;
      });
  },
});

export default searchSlice.reducer;
