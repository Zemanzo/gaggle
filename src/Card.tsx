import React from "react";
import styled, { css, keyframes } from "styled-components";
import Rect from "./icons/Rect";
import Diamond from "./icons/Diamond";
import Tilde from "./icons/Tilde";
import { CardAttributes, Shape, Color } from "./types";
import { usePageContext } from "./PageContext";

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
  showLetters: boolean;
}>`
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
  position: relative;

  animation: ${EntryFadeIn} 0.4s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  ${({ isSelected, shouldHighlight }) =>
    isSelected
      ? css`
          background: #444;
          border-color: #eee;
        `
      : shouldHighlight
      ? css`
          background: #333;
          border-color: #555;
          border-style: dashed;
        `
      : css`
          background: #222;
          border-color: transparent;
        `}

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

  ${({ showLetters }) =>
    showLetters
      ? css`
          padding-bottom: 16px;
          min-height: 180px;

          @media screen and (max-width: 600px), screen and (max-height: 650px) {
            min-height: 105px;
          }
        `
      : ""}
`;

const ColorLetter = styled.div<{
  color: Color;
  differentLetterPositions: boolean;
}>`
  position: absolute;
  font-style: sans-serif;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
  bottom: 0px;
  user-select: none;
  color: #bbb;

  ${({ color, differentLetterPositions }) => {
    let position;
    if (differentLetterPositions) {
      switch (color) {
        case Color.RED:
        default:
          position = css`
            left: 4px;
          `;
          break;
        case Color.GREEN:
          position = css`
            text-align: center;
          `;
          break;
        case Color.BLUE:
          position = css`
            right: 4px;
            text-align: right;
          `;
          break;
      }
    } else {
      position = css`
        left: 4px;
      `;
    }

    return css`
      /* color: ${color}; */
      ${position}
    `;
  }}
`;

const iconLookup = {
  [Shape.OVAL]: Diamond,
  [Shape.RECT]: Rect,
  [Shape.TILDE]: Tilde,
};

const colorLookup = {
  [Color.RED]: "R",
  [Color.GREEN]: "G",
  [Color.BLUE]: "B",
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
  const { config } = usePageContext();

  const ShapeComponent = iconLookup[shape];
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
      showLetters={Boolean(config?.colorLetters)}
      onClick={onClick}
    >
      {Icons}
      {config?.colorLetters && (
        <ColorLetter
          color={color}
          differentLetterPositions={Boolean(config?.colorLettersPosition)}
        >
          {colorLookup[color]}
        </ColorLetter>
      )}
    </CardContainer>
  );
};

export default Card;
