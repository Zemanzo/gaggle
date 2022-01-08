import react from "react";
import styled, { keyframes } from "styled-components";

const EntryFadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #000c;

  animation: ${EntryFadeIn} 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

const MODAL_PADDING = 16;

const ModalContent = styled.div`
  min-width: 300px;
  min-height: 120px;
  max-width: 900px;
  max-height: 100vh;
  border: 2px solid #eee;
  border-radius: 8px;
  padding: ${MODAL_PADDING}px;
  box-sizing: border-box;
  background: #060606;
  position: relative;
  overflow-y: auto;
`;

const CloseButtonElement = styled.button`
  position: absolute;
  top: ${MODAL_PADDING}px;
  right: ${MODAL_PADDING}px;
  height: 28px;
  width: 28px;
  padding-top: 3px;
  font-weight: bold;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  border-color: #aaa;
  color: #aaa;

  :hover {
    border-color: #eee;
    color: #eee;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;

  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1em;
`;

const Modal: React.FC<{}> = ({ children, ...props }) => {
  return (
    <ModalContainer {...props}>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};

export default Modal;

export const CloseButton: React.FC<{ onClick: () => void }> = (props) => {
  return <CloseButtonElement {...props}>X</CloseButtonElement>;
};
