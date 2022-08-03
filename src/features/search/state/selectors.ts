import { RootState } from "../../../store";
import { LoadingStatus } from "../../types";


export const selectMusicSearch = (state: RootState) => state.search.musicSearch;
export const selectIsLoading = (state: RootState) => state.search.status === LoadingStatus.LOADING;
export const selectHasNextPage = (state: RootState) => state.search.hasNextPage;