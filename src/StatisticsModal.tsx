import React from "react";
import styled from "styled-components";
import Modal, { CloseButton, Title } from "./Modal";
import { usePageContext } from "./PageContext";
import SectionSubtitle from "./SectionSubtitle";

const StyledModal = styled(Modal)`
  p {
    max-width: 70ch;
  }
`;

const StatisticsRow = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 16px;
  margin-bottom: 2px;
  border-radius: 8px;
  transition: background-color 0.15s, color 0.15s;

  :nth-child(even) {
    background-color: #111;
  }
  :nth-child(odd) {
    background-color: #222;
  }
  :hover {
    background-color: #eee;
    color: #111;
  }
`;

const StatisticsLabel = styled.div`
  flex: 1;
`;

const StatisticsValue = styled.div`
  font-family: monospace;
  font-weight: 600;
  margin-left: 32px;
`;

const AttributeStatsContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: auto repeat(4, 1fr);
  grid-gap: 2px;
  justify-content: center;

  > * {
    border-radius: 8px;
    background-color: #222;
    padding: 2px 8px;
  }
`;

const AttributeStatsHeader = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9em;
  color: #fff;
  padding: 4px 8px;
  background-color: #444;
  text-align: center;
`;

const AttributeStatsValue = styled.div`
  font-family: monospace;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AttributeStatsEmpty = styled.div`
  background-color: transparent;
`;

const DECIMAL_AMOUNT = 1;
const StatisticsModal: React.FC<{ close: () => void }> = ({ close }) => {
  const { statistics } = usePageContext();

  return (
    <StyledModal>
      <Title>STATISTICS</Title>
      <CloseButton onClick={close} />
      <SectionSubtitle>General</SectionSubtitle>
      <div>
        <StatisticsRow>
          <StatisticsLabel>Times played</StatisticsLabel>
          <StatisticsValue>{statistics.timesPlayed}</StatisticsValue>
        </StatisticsRow>
        <StatisticsRow>
          <StatisticsLabel>Times finished</StatisticsLabel>
          <StatisticsValue>{statistics.timesFinished}</StatisticsValue>
        </StatisticsRow>
        <StatisticsRow>
          <StatisticsLabel>
            Times finished with no cards remaining
          </StatisticsLabel>
          <StatisticsValue>{statistics.timesPerfectGames}</StatisticsValue>
        </StatisticsRow>
        <StatisticsRow>
          <StatisticsLabel>Hints used</StatisticsLabel>
          <StatisticsValue>{statistics.hintsUsed}</StatisticsValue>
        </StatisticsRow>
        <StatisticsRow>
          <StatisticsLabel>Reveals used</StatisticsLabel>
          <StatisticsValue>{statistics.revealsUsed}</StatisticsValue>
        </StatisticsRow>
        <StatisticsRow>
          <StatisticsLabel>Valid matches found</StatisticsLabel>
          <StatisticsValue>{statistics.matchesFound}</StatisticsValue>
        </StatisticsRow>
      </div>
      <SectionSubtitle>Attributes</SectionSubtitle>
      <p>
        For every match made, shows if the attributes were equal or different.
      </p>
      <div>
        <AttributeStatsContainer>
          {/* Headers row */}
          <AttributeStatsEmpty />
          <AttributeStatsHeader>Shape</AttributeStatsHeader>
          <AttributeStatsHeader>Amount</AttributeStatsHeader>
          <AttributeStatsHeader>Fill style</AttributeStatsHeader>
          <AttributeStatsHeader>Color</AttributeStatsHeader>
          {/* Equality row */}
          <div>Equal</div>
          <AttributeStatsValue>
            {statistics.attributes.shape.equal}
          </AttributeStatsValue>
          <AttributeStatsValue>
            {statistics.attributes.amount.equal}
          </AttributeStatsValue>
          <AttributeStatsValue>
            {statistics.attributes.fillStyle.equal}
          </AttributeStatsValue>
          <AttributeStatsValue>
            {statistics.attributes.color.equal}
          </AttributeStatsValue>
          {/* Difference row */}
          <div>Different</div>
          <AttributeStatsValue>
            {statistics.attributes.shape.different}
          </AttributeStatsValue>
          <AttributeStatsValue>
            {statistics.attributes.amount.different}
          </AttributeStatsValue>
          <AttributeStatsValue>
            {statistics.attributes.fillStyle.different}
          </AttributeStatsValue>
          <AttributeStatsValue>
            {statistics.attributes.color.different}
          </AttributeStatsValue>
          {/* Equality ratio row */}
          <div>Equal (ratio)</div>
          <AttributeStatsValue>
            {(
              (statistics.attributes.shape.equal / statistics.matchesFound) *
              100
            ).toFixed(DECIMAL_AMOUNT)}
            %
          </AttributeStatsValue>
          <AttributeStatsValue>
            {(
              (statistics.attributes.amount.equal / statistics.matchesFound) *
              100
            ).toFixed(DECIMAL_AMOUNT)}
            %
          </AttributeStatsValue>
          <AttributeStatsValue>
            {(
              (statistics.attributes.fillStyle.equal /
                statistics.matchesFound) *
              100
            ).toFixed(DECIMAL_AMOUNT)}
            %
          </AttributeStatsValue>
          <AttributeStatsValue>
            {(
              (statistics.attributes.color.equal / statistics.matchesFound) *
              100
            ).toFixed(DECIMAL_AMOUNT)}
            %
          </AttributeStatsValue>
          {/* Difference row */}
          <div>Different (ratio)</div>
          <AttributeStatsValue>
            {(
              (statistics.attributes.shape.different /
                statistics.matchesFound) *
              100
            ).toFixed(DECIMAL_AMOUNT)}
            %
          </AttributeStatsValue>
          <AttributeStatsValue>
            {(
              (statistics.attributes.amount.different /
                statistics.matchesFound) *
              100
            ).toFixed(DECIMAL_AMOUNT)}
            %
          </AttributeStatsValue>
          <AttributeStatsValue>
            {(
              (statistics.attributes.fillStyle.different /
                statistics.matchesFound) *
              100
            ).toFixed(DECIMAL_AMOUNT)}
            %
          </AttributeStatsValue>
          <AttributeStatsValue>
            {(
              (statistics.attributes.color.different /
                statistics.matchesFound) *
              100
            ).toFixed(DECIMAL_AMOUNT)}
            %
          </AttributeStatsValue>
        </AttributeStatsContainer>
      </div>
    </StyledModal>
  );
};

export default StatisticsModal;