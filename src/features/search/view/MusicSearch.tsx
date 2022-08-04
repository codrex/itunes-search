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
import { Typography } from "@mui/material";

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

  const handleCountryChange = useCallback((_: any, selectedOption: any) => {
    setFormState((prev) => {
      return { ...prev, country: selectedOption.value };
    });
  }, []);

  const handleSearchTermChange: SearchFieldProps["onChange"] = useCallback(
    (event: any) => {
      setFormState((prev) => {
        return { ...prev, term: (event.target as HTMLInputElement).value };
      });
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      dispatch(musicSearch(formState));
    },
    [dispatch, formState]
  );

  const loadMore = useMemo(
    () =>
      debounce(
        (_: number, stopIndex: number) =>
          new Promise((resolve) => {
            if (!searchResults[stopIndex]) {
              dispatch(musicSearchLoadMore({ ...formState, cb: resolve }));
            }
          }),
        500
      ),
    [searchResults, formState, dispatch]
  );

  const notFound = !searchResults.length  && !isLoading;

  return (
    <MusicSearchStyled display="flex" flexDirection="column" height="100vh" alignItems="center">
      <Box
        component="header"
        height="10%"
        minHeight="100px"
        width="100%"
        bgcolor="black"
        paddingX={["5px", "30px"]}
      >
        <Box
          onSubmit={handleSubmit}
          component="form"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <SearchFieldStyled
            inputProps={{
              placeholder: "Search Artists, Albums, and Songs",
              required: true,
              "aria-label": "itunes music search field",
            }}
            onChange={handleSearchTermChange}
          >
            <CountrySelect
              defaultValue={DEFAULT_OPTION}
              onChange={handleCountryChange}
            />
          </SearchFieldStyled>
        </Box>
      </Box>
      {!!searchResults.length && (
        <Box width="100%" height="auto" flex="1" component="main">
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
      )}

      {notFound && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <Typography variant="h4">Oops, No Record found</Typography>
        </Box>
      )}
      {isLoading && <LoadingIndicator />}
    </MusicSearchStyled>
  );
}
