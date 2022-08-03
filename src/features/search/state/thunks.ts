import { createAsyncThunk } from "@reduxjs/toolkit";

import { searchApi } from "../api";
import { InitialState } from "./types";
import { SearchResponsePayload } from "../../types";



type SearchApiParams = Pick<Parameters<typeof searchApi>[number],"country" | "term" >;

export const musicSearch = createAsyncThunk(
  "search/music-search",
  async (searchParams: SearchApiParams, {getState}) => {
    const { search: { limit } } = getState() as { search: InitialState }
    const response = await searchApi({...searchParams, limit, offset: 0} );
    return response;
  }
);

export const musicSearchLoadMore = createAsyncThunk(
  "search/music-search-load-more",
  async (
    {cb, ...searchParams}: SearchApiParams & {cb?: (results: SearchResponsePayload) => any}, {getState}
  ) => {
    const { search: { limit, offset } } = getState() as { search: InitialState }
    const response = await searchApi({...searchParams, limit, offset});
    cb?.(response)
    return response;
  }
);
