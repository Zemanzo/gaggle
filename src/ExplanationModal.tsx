import React from "react";
import styled from "styled-components";
import { default as LargeRect } from "./icons/Rect";
import { default as LargeDiamond } from "./icons/Diamond";
import { default as LargeTilde } from "./icons/Tilde";
import Modal, { CloseButton, Title } from "./Modal";
import { Color, FillStyle } from "./types";

const StyledModal = styled(Modal)`
  p {
    max-width: 70ch;
  }
`;

const AttributeParagraph = styled.div`
  text-align: center;
  margin: 8px 0;
  background: #111;
  padding: 8px;
  border-radius: 8px;
`;
const AttributeParagraphTitle = styled.h3`
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0.4em;
`;
const AttributesSideBySide = styled.div`
  display: flex;
  justify-content: space-around;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Rect = styled(LargeRect)`
  width: 80px;
  height: 40px;
`;
const Diamond = styled(LargeDiamond)`
  width: 80px;
  height: 40px;
`;
const Tilde = styled(LargeTilde)`
  width: 80px;
  height: 40px;
`;

const ExplanationModal: React.FC<{ close: () => void }> = ({ close }) => {
  return (
    <StyledModal>
      <Title>HOW TO PLAY</Title>
      <CloseButton onClick={close} />
      <p>
        The goal of this game is to match three cards. However, matching is
        limited based on the card's attributes. A card has FOUR attributes,
        represented by the icons on the card:
      </p>
      <AttributeParagraph>
        <AttributeParagraphTitle>Shape</AttributeParagraphTitle>
        <div>
          <Diamond color="#ccc" fillStyle={FillStyle.FULL} />
          <Rect color="#ccc" fillStyle={FillStyle.FULL} />
          <Tilde color="#ccc" fillStyle={FillStyle.FULL} />
        </div>
      </AttributeParagraph>
      <AttributeParagraph>
        <AttributeParagraphTitle>Amount</AttributeParagraphTitle>
        <AttributesSideBySide>
          <div>
            <Diamond color="#ccc" fillStyle={FillStyle.FULL} />
          </div>
          <div>
            <Diamond color="#ccc" fillStyle={FillStyle.FULL} />
            <Diamond color="#ccc" fillStyle={FillStyle.FULL} />
          </div>
          <div>
            <Diamond color="#ccc" fillStyle={FillStyle.FULL} />
            <Diamond color="#ccc" fillStyle={FillStyle.FULL} />
            <Diamond color="#ccc" fillStyle={FillStyle.FULL} />
          </div>
        </AttributesSideBySide>
      </AttributeParagraph>
      <AttributeParagraph>
        <AttributeParagraphTitle>Fill style</AttributeParagraphTitle>
        <div>
          <Rect color="#ccc" fillStyle={FillStyle.EMPTY} />
          <Rect color="#ccc" fillStyle={FillStyle.PARTIAL} />
          <Rect color="#ccc" fillStyle={FillStyle.FULL} />
        </div>
      </AttributeParagraph>
      <AttributeParagraph>
        <AttributeParagraphTitle>Color</AttributeParagraphTitle>
        <div>
          <Tilde color={Color.RED} fillStyle={FillStyle.FULL} />
          <Tilde color={Color.GREEN} fillStyle={FillStyle.FULL} />
          <Tilde color={Color.BLUE} fillStyle={FillStyle.FULL} />
        </div>
      </AttributeParagraph>
      <p>
        To be able to match three cards, either of the following rules should
        apply for each individual attribute:
      </p>
      <ol>
        <li>All variants of this attribute are same</li>
        <li>All variants of this attribute are different from each other</li>
      </ol>
      <p>
        In other words: Each attribute needs to clear one of the rules, but all
        four attributes need to clear a rule to count as a match.
      </p>
    </StyledModal>
  );
};

export default ExplanationModal;
