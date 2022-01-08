import React from "react";
import styled from "styled-components";

const StyledSvg = styled.svg`
  width: 32px;
  height: 32px;
`;

const Rect: React.FC<{}> = () => {
  return (
    <StyledSvg viewBox="0 0 32 32">
      <rect x="6" y="8" width="20" height="4" rx="4" fill="currentColor" />
      <rect x="6" y="16" width="20" height="4" rx="4" fill="currentColor" />
      <rect x="6" y="24" width="20" height="4" rx="4" fill="currentColor" />
    </StyledSvg>
  );
};

export default Rect;
