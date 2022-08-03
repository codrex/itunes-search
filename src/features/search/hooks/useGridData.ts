import { useMemo } from "react";
import { SearchResponsePayload } from "../../types";
import { formatMusicSearch } from "../helpers/formatter";

type formatMusicSearchReturnType = ReturnType<typeof formatMusicSearch>;

export const useGridData = (
  payload: SearchResponsePayload["results"],
  width: number,
  currentGrid: formatMusicSearchReturnType[][]
) => {
  return useMemo(() => {
    if (!payload.length) return [];

    const height = Math.round(payload.length / width);

    return generateToDimensionalArray<formatMusicSearchReturnType>(
      (index) => {
        return formatMusicSearch(payload[index]);
      },
      { height, width, length: payload.length, currentGrid }
    );
  }, [payload, width, currentGrid]);
};

interface GenerateToDimensionalArrayParams<T> {
  height: number;
  width: number;
  length: number;
  currentGrid: T[][];
}

function generateToDimensionalArray<T>(
  getGridData: (index: number) => T,
  options: GenerateToDimensionalArrayParams<T>
) {
  const { height, width, length, currentGrid } = options;
  let startHeight = 0;
  let startWidth = 0;

  if (currentGrid) {
    startHeight = currentGrid.length;
    startWidth = startHeight ? currentGrid[startHeight - 1].length : 0;
  }

  const grid: T[][] = currentGrid || [];
  for (let h = startHeight; h <= height; h++) {
    for (let w = startWidth; w < width; w++) {
      const index = h * width + w;

      if (index > length - 1) break;

      const gridData = getGridData(index);
      if (!grid[h]) {
        grid[h] = [];
      }
      grid[h].push(gridData);
    }
  }
  return grid;
}
