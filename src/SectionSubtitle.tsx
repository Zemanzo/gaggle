import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 32px;
  margin-bottom: 8px;

  h3 {
    margin: 0;
    text-transform: uppercase;
    padding: 0 8px;
    color: #666;
  }

  hr {
    border: none;
    border-bottom: 2px solid #666;

    :first-child {
      width: 32px;
    }
    :last-child {
      flex: 1;
    }
  }
`;

const SectionSubtitle: React.FC<{}> = ({ children }) => {
  return (
    <Container>
      <hr />
      <h3>{children}</h3>
      <hr />
    </Container>
  );
};

export default SectionSubtitle;
