import React from "react";
import styled, { css, keyframes } from "styled-components";
import Rect from "./icons/Rect";
import Diamond from "./icons/Diamond";
import Tilde from "./icons/Tilde";
import { CardAttributes, Shape } from "./types";

const EntryFadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0px);
	}
`;

const CardContainer = styled.div<{
  isSelected: boolean;
  shouldHighlight: boolean;
}>`
  ${({ isSelected, shouldHighlight }) =>
    isSelected
      ? css`
          background: #444;
          border-color: #eee;
        `
      : shouldHighlight
      ? css`
          background: #262;
          border-color: transparent;
        `
      : css`
          background: #222;
          border-color: transparent;
        `}
  max-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 100%;
  box-sizing: border-box;
  padding: 8px;
  min-height: 170px;
  height: 25vh;
  border-width: 2px;
  border-style: solid;
  outline-width: 2px;
  outline-style: solid;
  outline-color: transparent;
  transition: border-color 0.2s, outline-color 0.1s;
  cursor: pointer;

  animation: ${EntryFadeIn} 0.4s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  @media (hover: hover) {
    :hover {
      border-color: transparent;
      outline-color: #eee;
    }
  }

  @media screen and (max-width: 600px), screen and (max-height: 650px) {
    max-width: 60px;
    min-height: 95px;

    svg {
      width: 75px;
      height: 25px;
    }
  }
`;

const IconLookup = {
  [Shape.OVAL]: Diamond,
  [Shape.RECT]: Rect,
  [Shape.TILDE]: Tilde,
};

interface CardProps extends CardAttributes {
  addToSelection: (card: CardAttributes) => void;
  removeFromSelection: (card: CardAttributes) => void;
  isSelected: boolean;
  shouldHighlight: boolean;
}

const Card: React.FC<CardProps> = ({
  shape,
  color,
  fillStyle,
  amount,
  addToSelection,
  removeFromSelection,
  isSelected,
  shouldHighlight,
}) => {
  const ShapeComponent = IconLookup[shape];
  const Icons = new Array(amount).fill(
    <ShapeComponent color={color} fillStyle={fillStyle} />
  );
  const onClick = () => {
    const thisCard = { shape, color, fillStyle, amount };
    if (isSelected) {
      removeFromSelection(thisCard);
    } else {
      addToSelection(thisCard);
    }
  };
  return (
    <CardContainer
      isSelected={isSelected}
      shouldHighlight={shouldHighlight}
      onClick={onClick}
    >
      {Icons}
    </CardContainer>
  );
};

export default Card;
