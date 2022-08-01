import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "styled-components";

import { Select } from "../../../components/Select";
import { useCountryToCodeOptions } from "../../../hooks/useCountryToCodeOptions";
import { codesToCountry } from "../../../constants/countries";


const OptionStyled = styled(Box)<
  BoxProps & React.HTMLAttributes<HTMLLIElement>
>`
  width: 100%;

  & img {
    flex-shrink: 0;
    margin-right: 5px;
  }
`;

const SelectStyled = styled(Select)`
  min-width: 180px; 
  width: 30%;

  & fieldset {
    border: none;
  }
`;

const DEFAULT_OPTION = {
  label: codesToCountry.US,
  value: "US"
}

export function CountrySelect() {
  const countries = useCountryToCodeOptions();

  return (
    <SelectStyled
      defaultValue={DEFAULT_OPTION}
      options={countries}
      renderOption={(props: any, option) => (
        <OptionStyled component="li" {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
            alt={`${option.label} icon`}
          />
          {option.label}
        </OptionStyled>
      )}
    />
  );
}
