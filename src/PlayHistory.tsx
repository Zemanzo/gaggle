import React from "react";
import styled, { keyframes } from "styled-components";
import Card from "./Card";
import { CardAttributes, Color, Shape, FillStyle } from "./types";
import { createIdFromCardAttributes } from "./utils";

const FadeAfterEntry = keyframes`
	from {
		opacity: 1;
	}
	to {
		opacity: .7;
	}
`;

const StyledCard = styled(Card)`
  animation-name: ${FadeAfterEntry};
  animation-duration: 0.5s;
  animation-delay: 5s;
  animation-fill-mode: forwards;
  transform: scale(0.9);
  outline: none;
  border: none;
  cursor: default;
  transition: none;

  :hover {
    outline: none;
    border: none;
  }
`;

const EmptyCard = styled(StyledCard)`
  animation: none;
  background: transparent;
  border: 2px dotted #444;
  padding: 6px;

  :hover {
    outline: none;
    border: 2px dotted #444;
  }

  svg {
    opacity: 0;
  }
`;

const Container = styled.div`
  padding: 16px;
  box-sizing: border-box;
  text-align: center;

  @media screen and (min-width: 1100px), screen and (max-height: 650px) {
    position: absolute;
    right: 0;
  }

  @media screen and (max-width: 600px), screen and (max-height: 650px) {
    display: none;
  }

  :hover ${StyledCard} {
    animation: none;
  }

  color: #999;
`;

const PlayHistory: React.FC<{ lastCards: CardAttributes[] }> = ({
  lastCards,
}) => {
  return (
    <Container>
      Last match:
      {lastCards.length > 0 ? (
        lastCards.map(({ ...cardAttributes }) => {
          const id = createIdFromCardAttributes(cardAttributes);
          return (
            <StyledCard
              {...cardAttributes}
              isSelected={false}
              shouldHighlight={false}
              key={id}
            />
          );
        })
      ) : (
        <>
          <EmptyCard
            amount={1}
            color={Color.BLUE}
            shape={Shape.OVAL}
            fillStyle={FillStyle.FULL}
            isSelected={false}
            shouldHighlight={false}
          />
          <EmptyCard
            amount={1}
            color={Color.BLUE}
            shape={Shape.OVAL}
            fillStyle={FillStyle.FULL}
            isSelected={false}
            shouldHighlight={false}
          />
          <EmptyCard
            amount={1}
            color={Color.BLUE}
            shape={Shape.OVAL}
            fillStyle={FillStyle.FULL}
            isSelected={false}
            shouldHighlight={false}
          />
        </>
      )}
    </Container>
  );
};

export default PlayHistory;
