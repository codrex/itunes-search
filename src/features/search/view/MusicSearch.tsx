import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import InfiniteLoader from "react-window-infinite-loader";
import AutoReSizer from "react-virtualized-auto-sizer";
import debounce from "lodash.debounce";

import { SearchField, SearchFieldProps } from "../../../components/SearchField";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { codesToCountry } from "../../../constants/countries";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { musicSearch, musicSearchLoadMore } from "../state/thunks";
import {
  selectMusicSearch,
  selectIsLoading,
  selectHasNextPage,
} from "../state/selectors";
import { CountrySelect } from "./CountrySelect";
import { Grid } from "./Grid";

const MusicSearchStyled = styled(Box)``;

const SearchFieldStyled = styled(SearchField)`
  max-width: 800px;
`;

const DEFAULT_OPTION = {
  label: codesToCountry.US,
  value: "US",
};

export function MusicSearch() {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(selectMusicSearch);
  const isLoading = useAppSelector(selectIsLoading);
  const hasNextPage: boolean = useAppSelector(selectHasNextPage);
  const [formState, setFormState] = useState({
    country: DEFAULT_OPTION.value,
    term: "",
  });
  
  const handleCountryChange = useCallback((
    _: any,
    selectedOption: any
  ) => {
    setFormState((prev) => {
      return { ...prev, country: selectedOption.value };
    });
  }, []);

  const handleSearchTermChange: SearchFieldProps["onChange"]  = useCallback((event: any) => {
    setFormState((prev) => {
      return { ...prev, term: (event.target as HTMLInputElement).value };
    });
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    dispatch(musicSearch(formState));
  }, [dispatch, formState]);

  const loadMore = useMemo(() => debounce((_: number, stopIndex: number) =>
      new Promise((resolve) => {
        if (!searchResults[stopIndex]) {
          dispatch(musicSearchLoadMore({ ...formState, cb: resolve }));
        }
      }),500),
    [searchResults, formState, dispatch]
  );

  return (
    <MusicSearchStyled display="flex" flexDirection="column" height="100vh">
      <Box
        component="header"
        height="10%"
        minHeight="100px"
        bgcolor="gray"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX="30px"
      >
        <form onSubmit={handleSubmit}>
          <SearchFieldStyled
            inputProps={{
              placeholder: "Search Artists, Albums, and Songs",
              required: true,
            }}
            onChange={handleSearchTermChange}
          >
            <CountrySelect
              defaultValue={DEFAULT_OPTION}
              onChange={handleCountryChange}
            />
          </SearchFieldStyled>
        </form>
      </Box>
      <Box width="100%" height="auto" flex="1">
        <AutoReSizer>
          {(props) => (
            <InfiniteLoader
              isItemLoaded={() => !hasNextPage && !isLoading}
              itemCount={searchResults.length + 1}
              loadMoreItems={loadMore as any}
              threshold={7}
            >
              {({ onItemsRendered, ref }) => (
                  <Grid
                    {...props}
                    ref={ref}
                    onItemsRendered={onItemsRendered}
                  />
              )}
            </InfiniteLoader>
          )}
        </AutoReSizer>
      </Box>
      {isLoading && <LoadingIndicator />}
    </MusicSearchStyled>
  );
}
