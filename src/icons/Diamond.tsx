import React from "react";
import styled from "styled-components";
import { Color, FillStyle } from "../types";

const StyledSvg = styled.svg`
  width: 100px;
  height: 50px;
`;

const Diamond: React.FC<{ color: Color; fillStyle: FillStyle }> = ({
  color,
  fillStyle,
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
    <StyledSvg viewBox="0 0 100 50">
      <polygon
        points="
        50, 5
        90, 25
        50, 45
        10, 25
      "
        rx="10"
        fill={fill}
        stroke={color}
        strokeWidth="3"
      />
    </StyledSvg>
  );
};

export default Diamond;
