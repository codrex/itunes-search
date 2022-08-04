import searchReducer from "../slice";
import { LoadingStatus } from "../../../types";
import { musicSearch, musicSearchLoadMore } from "../thunks";

describe("search reducer", () => {

  describe("musicSearch", () => {
    it("should handle initial state", () => {
      expect(searchReducer(undefined, { type: "unknown" })).toEqual({
        limit: 10,
        offset: 0,
        hasNextPage: false,
        status: LoadingStatus.IDLE,
        musicSearch: [],
      });
    });
  
    it("should set status to pending when music search is pending", () => {
      const actual = searchReducer(undefined, musicSearch.pending);
      expect(actual.status).toBe(LoadingStatus.LOADING);
    });
  
    it("should clear search result when music search is pending", () => {
      const actual = searchReducer(undefined, musicSearch.pending);
      expect(actual.musicSearch).toEqual([]);
    });
  
    it("should set status to failed when music search failed", () => {
      const actual = searchReducer(undefined, musicSearch.rejected);
      expect(actual.status).toBe(LoadingStatus.FAILED);
    });
  
    it("should set status to idle when music search is fulfilled", () => {
      const actual = searchReducer(
        undefined,
        musicSearch.fulfilled({results: [], resultCount:0} as any, undefined as any, undefined as any) 
      );
      expect(actual.status).toBe(LoadingStatus.IDLE);
    });
  
    it("should increase offset by 10 when music search is fulfilled", () => {
      const offset = 0
      const actual = searchReducer(
        {
          limit: 10,
          offset,
          hasNextPage: false,
          status: LoadingStatus.IDLE,
          musicSearch: [] as any,
        },
        musicSearch.fulfilled({results: [], resultCount:0} as any, undefined as any, undefined as any) 
      );
      expect(actual.offset).toBe(10);
    });
  
    it("should set hasNextPage to false when music search return no results", () => {
      const offset = 0
      const actual = searchReducer(
        {
          limit: 10,
          offset,
          hasNextPage: true,
          status: LoadingStatus.IDLE,
          musicSearch: [] as any,
        },
        musicSearch.fulfilled({results: [], resultCount:0} as any, undefined as any, undefined as any) 
      );
      expect(actual.hasNextPage).toBe(false);
    });
  
    it("should save result to the store when music search is fulfilled", () => {
      const results = ["some results"]
      const actual = searchReducer(
        {
          limit: 10,
          offset: 0,
          hasNextPage: true,
          status: LoadingStatus.IDLE,
          musicSearch: [] as any,
        },
        musicSearch.fulfilled({results , resultCount:0} as any, undefined as any, undefined as any) 
      );
      expect(actual.musicSearch).toEqual(results);
    });
  })

  describe("musicSearchLoadMore", () => {
    it("should set status to failed when loading more music failed", () => {
      const actual = searchReducer(undefined, musicSearchLoadMore.rejected);
      expect(actual.status).toBe(LoadingStatus.FAILED);
    });

    it("should set status to loading when loading more music is pending", () => {
      const actual = searchReducer(undefined, musicSearchLoadMore.pending);
      expect(actual.status).toBe(LoadingStatus.LOADING);
    });

    it("should set status to idle when load more music is complete", () => {
     const actual = searchReducer(
        {
          limit: 10,
          offset: 0,
          hasNextPage: false,
          status: LoadingStatus.LOADING,
          musicSearch: [] as any,
        },
        musicSearchLoadMore.fulfilled({results: [], resultCount:0} as any, undefined as any, undefined as any) 
      );
      expect(actual.status).toBe(LoadingStatus.IDLE);
    });

    it("should increase offset by 10 when music search is fulfilled", () => {
      const offset = 0
      const actual = searchReducer(
        {
          limit: 10,
          offset,
          hasNextPage: false,
          status: LoadingStatus.IDLE,
          musicSearch: [] as any,
        },
        musicSearchLoadMore.fulfilled({results: [], resultCount:0} as any, undefined as any, undefined as any) 
      );
      expect(actual.offset).toBe(10);
    });
  
    it("should set hasNextPage to true when music search return no results", () => {
      const offset = 0
      const actual = searchReducer(
        {
          limit: 10,
          offset,
          hasNextPage: true,
          status: LoadingStatus.IDLE,
          musicSearch: [] as any,
        },
        musicSearchLoadMore.fulfilled({results: [], resultCount:0} as any, undefined as any, undefined as any) 
      );
      expect(actual.hasNextPage).toBe(false);
    });

    it("should append result to the store when load more search is fulfilled", () => {
      const results = ["some results"]
      const actual = searchReducer(
        {
          limit: 10,
          offset: 0,
          hasNextPage: true,
          status: LoadingStatus.IDLE,
          musicSearch: ["some results 1"] as any,
        },
        musicSearchLoadMore.fulfilled({results , resultCount:0} as any, undefined as any, undefined as any) 
      );
      expect(actual.musicSearch).toEqual(["some results 1"].concat(results));
    });
  })
});
