import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";

import { SearchField } from "../../../components/SearchField";
import { CountrySelect } from "./CountrySelect";

const MusicSearchStyled = styled.div``;

const SearchFieldStyled = styled(SearchField)`
  max-width: 800px;
`;

export function MusicSearch() {
  return (
    <MusicSearchStyled>
      <Box
        component="header"
        height="30%"
        minHeight="300px"
        bgcolor="gray"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX="30px"
      >
        <SearchFieldStyled inputProps={{
           placeholder:"Search Artists, Albums, and Songs"
        }}>
          <CountrySelect />
        </SearchFieldStyled>
      </Box>
    </MusicSearchStyled>
  );
}
