import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

type Option = {
  value: string;
  label: string;
};

interface SelectProps
  extends Omit<AutocompleteProps<Option, false, true, false>, "options" | "renderInput"> {
  options: Option[];
  label?: string;
}

export function Select(props: SelectProps) {
  const { options, label, ...rest } = props;
  return (
    <Autocomplete
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      multiple={false}
      disableClearable
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus
          label={label}
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
      {...rest}
    />
  );
}
