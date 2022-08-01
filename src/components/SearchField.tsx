import React from "react";
import Paper, { PaperProps } from "@mui/material/Paper";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

interface SearchFieldProps extends PaperProps {
  inputProps?: InputBaseProps["inputProps"];
  children?: React.ReactNode;
}

const PaperStyled = styled(Paper)`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  border-radius: 50px;
  padding-left: 15px;
  padding-right: 10px;
  box-sizing: border-box;

`;

export function SearchField(props: SearchFieldProps) {
  const { children, inputProps, ...rest } = props;
  return (
    <PaperStyled {...rest} elevation={3}>
      <InputBase sx={{ ml: 1, flex: 1 }} inputProps={inputProps} />
      {children}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </PaperStyled>
  );
}
