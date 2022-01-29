import { useEffect, useReducer, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useLocalStorage } from "react-use";
import { PageContext } from "./PageContext";
import Header from "./Header";
import PlayArea from "./PlayArea";
import SvgGlobals from "./SvgGlobals";
import { ConfigurationOptions, MenuEvents, SetConfigOption } from "./types";
import { defaultConfiguration } from "./ConfigModal";
import {
  statisticsReducer,
  initialStatisticsReducerState,
} from "./statisticsReducer";

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
  const [config, setConfig] = useLocalStorage<ConfigurationOptions>(
    "config",
    defaultConfiguration
  );
  const setConfigOption: SetConfigOption = (key, newValue) => {
    setConfig({
      ...config,
      [key]: newValue,
    });
  };
  const [statistics, updateStatistics] = useReducer(
    statisticsReducer,
    initialStatisticsReducerState
  );

  const onMenuEvent = (menuEvent: MenuEvents) => {
    setMenuEvent(menuEvent);
  };

  useEffect(() => {
    updateStatistics({ type: "timesPlayed" });
  }, []);

  return (
    <PageContext.Provider
      value={{
        isShowingFullScreenModal,
        setIsShowingFullScreenModal,
        fullScreenModalRef,
        config,
        setConfigOption,
        statistics,
        updateStatistics,
      }}
    >
      <SvgGlobals />
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
