import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoReSizer from "react-virtualized-auto-sizer";

import { SearchField, SearchFieldProps } from "../../../components/SearchField";
import { codesToCountry } from "../../../constants/countries";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { musicSearch } from "../state/thunks";
import { selectMusicSearch } from "../state/selectors";
import { useGridData } from "../hooks/useGridData";
import { CountrySelect, CountrySelectProps } from "./CountrySelect";
import { SearchCard, SearchCardProps } from "./SearchCard";

const MusicSearchStyled = styled(Box)``;
const CellStyled = styled.div`
  padding: 10px;
`;

const CellContainerStyled = styled(Box)`
  margin:  0 auto;
  position: relative;
`;


const SearchFieldStyled = styled(SearchField)`
  max-width: 800px;
`;

const DEFAULT_OPTION = {
  label: codesToCountry.US,
  value: "US",
};

function Cell(props: GridChildComponentProps<SearchCardProps[][]>) {
  const { data, columnIndex, rowIndex, style } = props;
  const cardData = data[rowIndex][columnIndex];

  if (!cardData) return null;

  return (
    <CellStyled style={style}>
      <SearchCard {...cardData} />
    </CellStyled>
  );
}

export function MusicSearch() {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    country: DEFAULT_OPTION.value,
    term: "",
    limit: 10,
  });

  const handleCountryChange: CountrySelectProps["onChange"] = (
    _,
    selectedOption
  ) => {
    setFormState((prev) => {
      return { ...prev, country: selectedOption.value };
    });
  };

  const handleSearchTermChange: SearchFieldProps["onChange"] = (event) => {
    setFormState((prev) => {
      return { ...prev, term: (event.target as HTMLInputElement).value };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(musicSearch(formState));
  };

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
        {/* <InfiniteLoader
          isItemLoaded={() => true}
          itemCount={9000}
          loadMoreItems={() => undefined}
        >
          {({ onItemsRendered, ref }) => ( */}
        <AutoReSizer>{(props) => <Grid {...props} />}</AutoReSizer>
        {/* )} */}
        {/* </InfiniteLoader> */}
      </Box>
    </MusicSearchStyled>
  );
}

function Grid({ height, width }: any) {
  const searchResults = useAppSelector(selectMusicSearch);
  const columnWidth = 350 > width ? width : 350;
  const columnCount = Math.floor(width / columnWidth);

  const gridData = useGridData(searchResults, columnCount);
  console.log(columnCount, gridData);
  return (
    <FixedSizeGrid<SearchCardProps[][]>
      // ref={ref}
      // onItemsRendered={onItemsRendered}
      columnCount={columnCount}
      columnWidth={columnWidth}
      height={height}
      rowCount={gridData.length}
      rowHeight={300}
      width={width}
      itemData={gridData as SearchCardProps[][]}
      innerElementType={CellContainerStyled}
    >
      {Cell}
    </FixedSizeGrid>
  );
}
