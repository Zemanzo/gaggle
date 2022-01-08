import { useState } from "react";
import ReactDOM from "react-dom";
import styled, { css, keyframes } from "styled-components";
import { MenuEvents } from "./types";
import HamburgerMenu from "./icons/HamburgerMenu";
import { usePageContext } from "./PageContext";
import { CloseButton } from "./Modal";
import AboutModal from "./AboutModal";

const EntryFadeIn = keyframes`
	0% {
		opacity: 0;
		transform: scaleY(.2);
	}
  30% {
		opacity: 1;
	}
	100% {
		transform: scaleY(1);
		opacity: 1;
	}
`;

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;

  > button {
    margin: 4px 4px;
    min-width: 7ch;
  }

  @media screen and (max-width: 600px), screen and (max-height: 650px) {
    flex-wrap: wrap;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;

  > h1 {
    font-size: 1.7rem;
    margin: 0;
  }
  > h2 {
    font-weight: normal;
    font-size: 0.8rem;
    color: #aaa;
    margin: 0;
  }
`;

const Message = styled.div`
  padding: 0 8px;
  min-width: 25ch;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RemainingCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > button {
    width: 100%;
  }

  > span {
    font-size: 0.85em;
    display: block;
    padding: 2px 0;
  }

  margin-right: 8px;
`;

const DropDownMenuContainer = styled.div`
  position: relative;
  padding: 4px;

  > button {
    min-width: 7ch;
    height: 100%;
  }
`;

const DropDownMenu = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 100%;
  right: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 200px;
  z-index: 10;

  ${({ isVisible }) =>
    isVisible
      ? ""
      : css`
          display: none;
        `}
`;

const DropDownButton = styled.button<{ delay?: number }>`
  padding: 8px 24px;
  margin-bottom: 4px;
  transform-origin: center 0;

  opacity: 0;
  transform: scaleY(0.2);
  animation: ${EntryFadeIn};
  animation-duration: 0.15s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  ${({ delay = 0 }) =>
    css`
      animation-delay: ${delay}s;
    `}
`;

const MenuButton = styled.button<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen
      ? css`
          color: #060606;
          background: #eee;

          :hover {
            color: #060606;
            background: #ccc;
            border-color: #ccc;
          }
        `
      : ""}
`;

const Header: React.FC<{
  message: string;
  setMessage: (newMessage: string) => void;
  onMenuEvent: (menuEvent: MenuEvents) => void;
  cardCount: number;
}> = ({ message, setMessage, onMenuEvent, cardCount }) => {
  const [isDropDownMenuVisible, setIsDropDownMenuVisible] = useState(false);
  const pageContext = usePageContext();

  const toggleDropDownMenu = () => {
    setIsDropDownMenuVisible(!isDropDownMenuVisible);
  };

  const toggleAbout = () => {
    setIsDropDownMenuVisible(false);
    pageContext.setIsShowingFullScreenModal(
      !pageContext.isShowingFullScreenModal
    );
  };

  return (
    <StyledHeader>
      <Title>
        <h1>GAGGLE!</h1>
        <h2>/ˈɡaɡ(ə)l/ - noun</h2>
      </Title>
      <Message>{message}</Message>
      <RemainingCards>
        <button
          onClick={() => {
            onMenuEvent(MenuEvents.SHOW_MORE);
          }}
        >
          Show more
        </button>
        <span>Cards left: {cardCount}</span>
      </RemainingCards>
      <button
        onClick={() => {
          onMenuEvent(MenuEvents.HINT);
        }}
      >
        Hint
      </button>
      <button
        onClick={() => {
          onMenuEvent(MenuEvents.REVEAL);
        }}
      >
        Reveal
      </button>
      <DropDownMenuContainer>
        <MenuButton isOpen={isDropDownMenuVisible} onClick={toggleDropDownMenu}>
          <HamburgerMenu />
        </MenuButton>
        <DropDownMenu isVisible={isDropDownMenuVisible}>
          <DropDownButton
            onClick={() => {
              onMenuEvent(MenuEvents.RESET);
            }}
          >
            New game
          </DropDownButton>
          {/* <DropDownButton delay={0.1} onClick={() => {}}>
            View statistics
          </DropDownButton> */}
          {/* <DropDownButton delay={0.1} onClick={() => {}}>
            Configuration
          </DropDownButton> */}
          <DropDownButton delay={0.1} onClick={toggleAbout}>
            About
          </DropDownButton>
          {pageContext.fullScreenModalRef.current &&
            ReactDOM.createPortal(
              <AboutModal close={toggleAbout} />,
              pageContext.fullScreenModalRef.current
            )}
        </DropDownMenu>
      </DropDownMenuContainer>
    </StyledHeader>
  );
};

export default Header;
