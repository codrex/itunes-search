import { useMemo } from "react"
import { SearchResponsePayload } from "../../types"
import { formatMusicSearch } from "../helpers/formatter"


type formatMusicSearchReturnType = ReturnType<typeof formatMusicSearch>

export const useGridData = (payload: SearchResponsePayload["results"], width: number) => {
    return useMemo(() => {
        if(!payload.length) return [];

        const height =Math.round( payload.length / width)
      return generateToDimensionalArray<formatMusicSearchReturnType>(height, width, (index) => {
        return formatMusicSearch(payload[index])
      })

       
    },[payload, width])
}

function generateToDimensionalArray<T> (height: number, width: number, getGridData: (index:number) => T ) {
    const grid: T[][] = []
    for(let h = 0; h < height; h++){
        for(let w = 0; w < width; w++){
            const index = (h * width) + w
            if(index > height + width) break;
            const gridData = getGridData(index);
            if(!grid[h]) {
                grid[h] = []
            } 
            grid[h].push(gridData)
        }
    }
    return grid
}