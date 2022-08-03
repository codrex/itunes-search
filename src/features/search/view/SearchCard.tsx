import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import styled from "styled-components";

const CardStyled = styled(Card)`
  height: 100%;
  width: 100%;
`;

export interface SearchCardProps {
  image?: string;
  type: string;
  name: string;
  genre: string;
}

export function SearchCard(props: SearchCardProps) {
  const { image, type, name, genre } = props;
  return (
    <CardStyled>
      <CardActionArea>
       {image && <CardMedia component="img" height="140" image={image} alt={name} />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {genre}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardStyled>
  );
}
