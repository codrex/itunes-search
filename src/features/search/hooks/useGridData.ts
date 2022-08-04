import { useMemo } from "react";

import { SearchResponsePayload } from "../../types";
import { formatMusicSearch } from "../helpers/formatter";
import { generateToDimensionalArray } from "../helpers/generateToDimensionalArray";

type formatMusicSearchReturnType = ReturnType<typeof formatMusicSearch>;

export const useGridData = (
  payload: SearchResponsePayload["results"],
  width: number) => {
  return useMemo(() => {
    if (!payload.length) return [];

    const height = Math.round(payload.length / width);

    return generateToDimensionalArray<formatMusicSearchReturnType>(
      (index) => {
        return formatMusicSearch(payload[index]);
      },
      { height, width, stopIndex: payload.length - 1 }
    );
  }, [payload, width]);
};
