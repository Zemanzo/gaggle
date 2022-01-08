import React from "react";
import Modal, { CloseButton, Title } from "./Modal";

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
