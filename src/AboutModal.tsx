import react from "react";
import styled from "styled-components";
import Modal, { CloseButton } from "./Modal";

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;

  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1em;
`;

const AboutModal: React.FC<{ close: () => void }> = ({ close }) => {
  return (
    <Modal>
      <Title>ABOUT</Title>
      <p>Created on the last day of 2021.</p>
      <p>
        View on GitHub:
        <br />
        <a href="https://github.com/Zemanzo/gaggle">
          https://github.com/Zemanzo/gaggle
        </a>
      </p>
      <p>
        &copy; Merlijn van der Kamp -{" "}
        <a href="https://merlijn.me/">https://merlijn.me/</a>
      </p>
      <CloseButton onClick={close} />
    </Modal>
  );
};

export default AboutModal;
