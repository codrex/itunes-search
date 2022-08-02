import { createAsyncThunk } from '@reduxjs/toolkit';

import { searchApi } from '../api';


type SearchApiParams = Parameters<typeof searchApi>

export const musicSearch = createAsyncThunk(
    'search/music-search',
    async (searchParams: SearchApiParams[0]) => {
      const response = await searchApi(searchParams);
      return response;
    }
  );

