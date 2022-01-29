import React from "react";
import styled, { css } from "styled-components";
import Modal, { CloseButton, Title } from "./Modal";
import { usePageContext } from "./PageContext";
import SectionSubtitle from "./SectionSubtitle";

export const defaultConfiguration = {
  minimumCards: 12,
  autoShowMore: false,
  colorLetters: true,
  colorLettersPosition: false,
};

const ConfigRow = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  ${({ disabled = false }) =>
    disabled
      ? css`
          filter: grayscale(100%) brightness(50%);
          pointer-events: none;
        `
      : ""}
`;

const ConfigLabel = styled.div`
  flex: 1;
`;

const ConfigInputContainer = styled.div`
  display: flex;
  text-align: right;
  padding-left: 16px;
`;

const CheckboxButtonLabel = styled.label`
  display: flex;
  justify-content: center;
  padding: 4px;
  min-width: 2ch;
  color: #060606;
  background: #f55;
  border: #f55 2px solid;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;

  :hover {
    background: #f77;
    border-color: #f77;
  }
  margin: 0 4px;
`;

const HiddenCheckboxInput = styled.input`
  visibility: hidden;
  position: absolute;
  pointer-events: none;

  :checked + ${CheckboxButtonLabel} {
    background: #7f7;
    border-color: #7f7;

    :hover {
      background: #9f9;
      border-color: #9f9;
    }
  }
`;

const RadioButtonLabel = styled.label`
  display: flex;
  justify-content: center;
  padding: 4px;
  min-width: 2ch;
  color: #aaa;
  border: #aaa 2px solid;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;

  :hover {
    color: #eee;
    border-color: #eee;
  }
  margin: 0 4px;
`;

const HiddenRadioInput = styled.input`
  visibility: hidden;
  position: absolute;
  pointer-events: none;

  :checked + ${RadioButtonLabel} {
    border-color: #eee;
    background: #eee;
    color: #060606;
    cursor: initial;
  }
`;

const WarningExplanation = styled.p`
  font-style: italic;
  color: #aaa;
  font-size: 0.9em;

  span {
    font-style: normal;
    font-weight: bold;
    color: red;
  }
`;

const WarningSymbol = styled.sup`
  display: inline-block;
  font-style: normal;
  font-weight: bold;
  color: red;
  padding-left: 2px;
  cursor: help;
`;

const ConfigModal: React.FC<{ close: () => void }> = ({ close }) => {
  const { config, setConfigOption } = usePageContext();

  const onMinimumCardsChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = parseInt((event.target as HTMLInputElement).value);

    setConfigOption("minimumCards", value);
  };

  const onAutoShowMoreChange = (event: React.FormEvent<HTMLInputElement>) => {
    const isChecked = (event.target as HTMLInputElement).checked;

    setConfigOption("autoShowMore", isChecked);
  };

  const onColorLettersChange = (event: React.FormEvent<HTMLInputElement>) => {
    const isChecked = (event.target as HTMLInputElement).checked;

    setConfigOption("colorLetters", isChecked);
  };

  const onColorLetterPositionChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const isChecked = (event.target as HTMLInputElement).checked;

    setConfigOption("colorLettersPosition", isChecked);
  };
  const warningSymbol = (
    <WarningSymbol title="Changing this value will start a new game!">
      (!)
    </WarningSymbol>
  );

  return (
    <Modal>
      <Title>CONFIGURATION</Title>
      <CloseButton onClick={close} />
      <WarningExplanation>
        Options that are marked with a <span>(!)</span> will start a new game if
        they are changed.
      </WarningExplanation>
      <div>
        <SectionSubtitle>Gameplay</SectionSubtitle>
        <ConfigRow>
          <ConfigLabel>
            Minimum amount of cards visible{warningSymbol}
          </ConfigLabel>
          <ConfigInputContainer onChange={onMinimumCardsChange}>
            <HiddenRadioInput
              type="radio"
              id="minimumCards-9"
              name="minimumCards"
              value="9"
              checked={config?.minimumCards === 9}
            />
            <RadioButtonLabel htmlFor="minimumCards-9">9</RadioButtonLabel>
            <HiddenRadioInput
              type="radio"
              id="minimumCards-12"
              name="minimumCards"
              value="12"
              checked={config?.minimumCards === 12}
            />
            <RadioButtonLabel htmlFor="minimumCards-12">12</RadioButtonLabel>
            <HiddenRadioInput
              type="radio"
              id="minimumCards-15"
              name="minimumCards"
              value="15"
              checked={config?.minimumCards === 15}
            />
            <RadioButtonLabel htmlFor="minimumCards-15">15</RadioButtonLabel>
            <HiddenRadioInput
              type="radio"
              id="minimumCards-18"
              name="minimumCards"
              value="18"
              checked={config?.minimumCards === 18}
            />
            <RadioButtonLabel htmlFor="minimumCards-18">18</RadioButtonLabel>
          </ConfigInputContainer>
        </ConfigRow>

        <ConfigRow>
          <ConfigLabel>
            Automatically add more cards when there are no valid combinations
            available
          </ConfigLabel>
          <ConfigInputContainer>
            <HiddenCheckboxInput
              type="checkbox"
              id="autoShowMore"
              checked={config?.autoShowMore}
              onChange={onAutoShowMoreChange}
            />
            <CheckboxButtonLabel htmlFor="autoShowMore">
              {config?.autoShowMore ? "✔" : "✘"}
            </CheckboxButtonLabel>
          </ConfigInputContainer>
        </ConfigRow>

        <SectionSubtitle>Accessibility</SectionSubtitle>
        <ConfigRow>
          <ConfigLabel>
            Add letters to better distinguish different colors
          </ConfigLabel>
          <ConfigInputContainer>
            <HiddenCheckboxInput
              type="checkbox"
              id="colorLetters"
              checked={config?.colorLetters}
              onChange={onColorLettersChange}
            />
            <CheckboxButtonLabel htmlFor="colorLetters">
              {config?.colorLetters ? "✔" : "✘"}
            </CheckboxButtonLabel>
          </ConfigInputContainer>
        </ConfigRow>

        <ConfigRow disabled={!Boolean(config?.colorLetters)}>
          <ConfigLabel>Use different position for letters</ConfigLabel>
          <ConfigInputContainer>
            <HiddenCheckboxInput
              type="checkbox"
              id="colorLettersPosition"
              checked={config?.colorLettersPosition}
              onChange={onColorLetterPositionChange}
            />
            <CheckboxButtonLabel htmlFor="colorLettersPosition">
              {config?.colorLettersPosition ? "✔" : "✘"}
            </CheckboxButtonLabel>
          </ConfigInputContainer>
        </ConfigRow>
      </div>
    </Modal>
  );
};

export default ConfigModal;
