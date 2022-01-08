import { createContext, useContext } from "react";

export interface PageContextType {
  isShowingFullScreenModal: boolean;
  setIsShowingFullScreenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreenModalRef: React.MutableRefObject<HTMLDivElement | null>;
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
