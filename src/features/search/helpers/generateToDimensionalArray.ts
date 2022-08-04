interface GenerateToDimensionalArrayParams {
    height: number;
    width: number;
    stopIndex: number;
  }

 export function generateToDimensionalArray<T>(
    getGridData: (index: number) => T,
    options: GenerateToDimensionalArrayParams
  ) {
    const { height, width, stopIndex } = options;

    const grid: T[][] = [];
    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        const index = h * width + w;
  
        if (index > stopIndex) break;
  
        const gridData = getGridData(index);
        if (!grid[h]) {
          grid[h] = [];
        }
        grid[h].push(gridData);
      }
    }
    return grid
  }
  