import React from "react";
import styled from "styled-components";
import { Color } from "./types";

const StyledSvg = styled.svg`
  position: absolute;
  pointer-events: none;
`;

const SvgGlobals: React.FC<{}> = ({}) => {
  return (
    <StyledSvg>
      {Object.values(Color).map((color) => {
        return (
          <pattern
            key={color}
            id={`diagonalHatch-${color}`}
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
          >
            <path
              d="M-1,1 l2,-2
                        M0,8 l8,-8
                        M6,10 l4,-4"
              strokeWidth="2"
              stroke={color}
            />
          </pattern>
        );
      })}
    </StyledSvg>
  );
};

export default SvgGlobals;
