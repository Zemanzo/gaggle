export enum Shape {
  OVAL,
  RECT,
  TILDE,
}

export enum Color {
  RED = "#ff0000",
  GREEN = "#00ff00",
  BLUE = "#0099ff",
}

export enum FillStyle {
  EMPTY,
  PARTIAL,
  FULL,
}

export interface CardAttributes {
  shape: Shape;
  color: Color;
  fillStyle: FillStyle;
  amount: 1 | 2 | 3;
}

export interface CardType extends CardAttributes {
  id: string;
}

export enum MenuEvents {
  SHOW_MORE,
  HINT,
  REVEAL,
  RESET,
}

export interface ConfigurationOptions {
  minimumCards?: number;
  autoShowMore?: boolean;
  colorLetters?: boolean;
  colorLettersPosition?: boolean;
}

export type SetConfigOption = <T extends keyof ConfigurationOptions>(
  key: T,
  newValue: ConfigurationOptions[T]
) => void;

export interface Statistics {
  timesPlayed: number;
  timesFinished: number;
  timesPerfectGames: number;
  hintsUsed: number;
  revealsUsed: number;
  matchesFound: number;
  validMoreCardsRequest: number;
  invalidMoreCardsRequest: number;
  attributes: {
    [key in keyof CardAttributes]: AttributeStatistics;
  };
  fastestCompletionTime: number;
  averageCompletionTime: number;
}

interface AttributeStatistics {
  equal: number;
  different: number;
}

export interface StatisticsReducerAction {
  type: string;
  args?: any;
}
