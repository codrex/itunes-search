import { generateToDimensionalArray } from "../generateToDimensionalArray";


describe("generateToDimensionalArray", () => {
  it("should return a 3 by 3 grid", () => {
    const params = {
      height: 3,
      width: 3,
      stopIndex: 8,
    };
    const getGridData = () => 0;

    expect(generateToDimensionalArray(getGridData, params)).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("should return stop at the stop index", () => {
    const params = {
      height: 4,
      width: 3,
      stopIndex: 1,
     
    };
    const getGridData = () => 1;
    expect(generateToDimensionalArray(getGridData, params)).toEqual([
      [1, 1],
    ]);
  });
});
