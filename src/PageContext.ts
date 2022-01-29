import { createContext, useContext } from "react";
import {
  ConfigurationOptions,
  SetConfigOption,
  Statistics,
  StatisticsReducerAction,
} from "./types";

export interface PageContextType {
  isShowingFullScreenModal: boolean;
  setIsShowingFullScreenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreenModalRef: React.MutableRefObject<HTMLDivElement | null>;
  config: ConfigurationOptions | undefined;
  setConfigOption: SetConfigOption;
  statistics: Statistics;
  updateStatistics: (action: StatisticsReducerAction) => void;
}

export const PageContext = createContext<PageContextType>(
  {} as PageContextType
);

export function usePageContext() {
  const context = useContext(PageContext);
  if (context !== undefined) {
    return context;
  }
  throw new Error(
    "The usePageContext hook must be used within a PageContext.Provider"
  );
}
