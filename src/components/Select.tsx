import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import {InputBaseProps} from "@mui/material/InputBase";


type Option = {
  value: string;
  label: string;
};

export interface SelectProps
  extends Omit<AutocompleteProps<Option, false, true, false>, "options" | "renderInput"> {
  options: Option[];
  label?: string;
  inputProps?: InputBaseProps["inputProps"]
}

export function Select(props: SelectProps) {
  const { options, label,inputProps, ...rest } = props;
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
            ...inputProps,
            ...params.inputProps,
          }}
        />
      )}
      {...rest}
    />
  );
}
