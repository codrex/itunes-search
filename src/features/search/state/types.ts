import { LoadingStatus } from "../../types"
import { SearchResponsePayload } from "../api/types"

export interface InitialState {
  musicSearch: SearchResponsePayload["results"];
  status: LoadingStatus
}