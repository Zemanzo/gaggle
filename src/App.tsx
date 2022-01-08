import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import Header from "./Header";
import PlayArea from "./PlayArea";
import SvgGlobals from "./SvgGlobals";
import { MenuEvents } from "./types";
import { PageContext } from "./PageContext";

const FullScreenModal = styled.div<{ visible: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: grayscale(100%) blur(10px);
  z-index: 100;
  ${({ visible }) =>
    css`
      display: ${visible ? "block" : "none"};
    `}
`;

function App() {
  const [message, setMessage] = useState("");
  const [menuEvent, setMenuEvent] = useState<MenuEvents | null>(null);
  const [cardCount, setCardCount] = useState<number>(0);
  const fullScreenModalRef = useRef<HTMLDivElement>(null);
  const [isShowingFullScreenModal, setIsShowingFullScreenModal] =
    useState(false);

  const onMenuEvent = (menuEvent: MenuEvents) => {
    setMenuEvent(menuEvent);
  };

  return (
    <PageContext.Provider
      value={{
        isShowingFullScreenModal,
        setIsShowingFullScreenModal,
        fullScreenModalRef,
      }}
    >
      <FullScreenModal
        ref={fullScreenModalRef}
        visible={isShowingFullScreenModal}
      />
      <Header
        message={message}
        setMessage={setMessage}
        onMenuEvent={onMenuEvent}
        cardCount={cardCount}
      />
      <SvgGlobals />
      <PlayArea
        setMessage={setMessage}
        menuEvent={menuEvent}
        setMenuEvent={setMenuEvent}
        setCardCount={setCardCount}
      />
    </PageContext.Provider>
  );
}

export default App;
