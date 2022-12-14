import { LoadingStatus } from "../../types"
import { SearchResponsePayload } from "../../types"

export interface InitialState {
  musicSearch: SearchResponsePayload["results"];
  status: LoadingStatus;
  limit: number;
  offset: number;
  hasNextPage: boolean;
}