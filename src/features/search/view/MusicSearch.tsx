import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";

import { SearchField, SearchFieldProps } from "../../../components/SearchField";
import { CountrySelect, CountrySelectProps } from "./CountrySelect";
import { codesToCountry } from "../../../constants/countries";
import {musicSearch} from "../state/thunks"
import {useAppDispatch} from "../../../store/hooks"

const MusicSearchStyled = styled.div``;

const SearchFieldStyled = styled(SearchField)`
  max-width: 800px;
`;


const DEFAULT_OPTION = {
  label: codesToCountry.US,
  value: "US"
}

export function MusicSearch() {
  const dispatch = useAppDispatch()
  const [formState, setFormState] = useState({
    country: DEFAULT_OPTION.value,
    term: "",
    limit: 10
  });

  const handleCountryChange: CountrySelectProps["onChange"] = (_, selectedOption) => {
    setFormState((prev) => {
      return {...prev, country: selectedOption.value}
    })
  }

  const handleSearchTermChange: SearchFieldProps["onChange"] = (event) => {
    setFormState((prev) => {
      return {...prev, term: (event.target as HTMLInputElement).value}
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(musicSearch(formState))
  }


  console.log(formState);

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
        <form onSubmit={handleSubmit}>
          <SearchFieldStyled
            inputProps={{
              placeholder: "Search Artists, Albums, and Songs",
              required: true
            }}
            onChange={handleSearchTermChange}
          >
            <CountrySelect defaultValue={DEFAULT_OPTION} onChange={handleCountryChange} />
          </SearchFieldStyled>
        </form>
      </Box>
    </MusicSearchStyled>
  );
}
