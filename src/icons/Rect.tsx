import React from "react";
import styled from "styled-components";
import { Color, FillStyle } from "../types";

const StyledSvg = styled.svg`
  width: 100px;
  height: 50px;
`;

const Rect: React.FC<{ color: string; fillStyle: FillStyle }> = ({
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
      <rect
        x="10"
        y="5"
        width="80"
        height="40"
        rx="25"
        fill={fill}
        stroke={color}
        strokeWidth="3"
      />
    </StyledSvg>
  );
};

export default Rect;
