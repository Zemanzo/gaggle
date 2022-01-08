import React from "react";
import styled from "styled-components";
import { Color, FillStyle } from "../types";

const StyledSvg = styled.svg`
  width: 100px;
  height: 50px;
`;

const Tilde: React.FC<{ color: string; fillStyle: FillStyle }> = ({
  color,
  fillStyle,
  ...props
}) => {
  let fill;
  switch (fillStyle) {
    case FillStyle.FULL:
      fill = color;
      break;
    case FillStyle.PARTIAL:
      fill = `url(#diagonalHatch-${color})`;
      break;
    case FillStyle.EMPTY:
    default:
      fill = "transparent";
      break;
  }
  return (
    <StyledSvg viewBox="0 0 100 50" {...props}>
      <path
        d="
          M 50,15
          Q 70,0 90,25
          Q 70,50 50,35
          Q 30,50 10,25
          Q 30,0 50,15
          z
        "
        fill={fill}
        stroke={color}
        strokeWidth="3"
      />
    </StyledSvg>
  );
};

export default Tilde;
