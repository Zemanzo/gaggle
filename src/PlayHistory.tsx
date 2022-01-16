import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { CardAttributes } from "./types";
import { createIdFromCardAttributes } from "./utils";

const Container = styled.div`
  padding: 16px;
  box-sizing: border-box;
  text-align: center;
`;

const StyledCard = styled(Card)`
  animation: none;
  transform: scale(0.9);
  outline: none;
  border: none;
  cursor: default;

  :hover {
    outline: none;
    border: none;
  }
`;

const PlayHistory: React.FC<{ lastCards: CardAttributes[] }> = ({
  lastCards,
}) => {
  return (
    <Container>
      {lastCards.length > 0 && "Last match:"}
      {lastCards.map(({ ...cardAttributes }) => {
        const id = createIdFromCardAttributes(cardAttributes);
        return (
          <StyledCard
            {...cardAttributes}
            isSelected={false}
            shouldHighlight={false}
            key={id}
          />
        );
      })}
    </Container>
  );
};

export default PlayHistory;
