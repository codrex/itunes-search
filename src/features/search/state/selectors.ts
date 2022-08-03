import { RootState } from "../../../store";

export const selectMusicSearch = (state: RootState) => state.search.musicSearch
export const selectLoading = (state: RootState) => state.search.status