import React, { useCallback } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";

import { useAppSelector } from "../../../store/hooks";
import { selectMusicSearch } from "../state/selectors";
import { useGridData } from "../hooks/useGridData";
import { SearchCard, SearchCardProps } from "./SearchCard";

const CellStyled = styled.div`
  padding: 10px;
`;

const CellContainerStyled = styled(Box)`
  margin: 0 auto;
  position: relative;
`;

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

interface GridProps {
  height: number;
  width: number;
  onItemsRendered: (props: any) => any;
}

export const Grid = React.forwardRef<HTMLElement, GridProps>(
  ({ height, width, onItemsRendered }, ref) => {
    const searchResults = useAppSelector(selectMusicSearch);
    const maxColumnWidth = 350;
    const columnWidth = maxColumnWidth > width ? width : maxColumnWidth;
    const columnCount = Math.floor(width / columnWidth);
    let gridData: ReturnType<typeof useGridData> = [];
    gridData = useGridData(searchResults, columnCount);

    const HandleItemsRendered = useCallback(
      (gridProps: any) => {
        onItemsRendered({
          visibleStartIndex: gridProps.visibleRowStartIndex * columnCount,
          visibleStopIndex: gridProps.visibleRowStopIndex * columnCount,
        });
      },
      [columnCount, onItemsRendered]
    );

    return (
      <FixedSizeGrid<SearchCardProps[][]>
        innerRef={ref}
        onItemsRendered={HandleItemsRendered}
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
);
