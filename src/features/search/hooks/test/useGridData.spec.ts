import {renderHook} from '@testing-library/react'

import { useGridData } from "../useGridData";
import  * as helpers from "../../helpers/generateToDimensionalArray";
import * as helpersFormatter from "../../helpers/formatter";


describe("useGridData", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should return an empty array if payload is empty", () => {
        const {result} = renderHook(() => useGridData([] as any, 3));
        expect(result.current).toEqual([]);
    })

    it("should generate a 2 dimensional array", () => {
        const generateToDimensionalArray = jest.spyOn(helpers, "generateToDimensionalArray").mockImplementationOnce(jest.fn());
        jest.spyOn(helpersFormatter, "formatMusicSearch").mockImplementationOnce(jest.fn());

        renderHook(() => useGridData([{}, {}, {}] as any, 1));
        expect(generateToDimensionalArray).toHaveBeenCalled();

    })
})