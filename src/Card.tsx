import React from "react";
import styled, { css } from "styled-components";
import Rect from "./icons/Rect";
import Diamond from "./icons/Diamond";
import Tilde from "./icons/Tilde";
import { CardAttributes, Shape } from "./types";

const CardContainer = styled.div<{
  isSelected: boolean;
  shouldHighlight: boolean;
}>`
  ${({ isSelected, shouldHighlight }) =>
    isSelected
      ? css`
          background: #444;
        `
      : shouldHighlight
      ? css`
          background: #262;
        `
      : css`
          background: #222;
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
  border: 2px solid transparent;
  transition: border-color 0.2s;
  cursor: pointer;

  :hover {
    border-color: #eee;
  }

  @media screen and ((max-width: 600px) or (max-height: 650px)) {
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
