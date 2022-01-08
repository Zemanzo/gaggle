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
  colorLetters?: boolean;
  minimumCards?: number;
}

export type SetConfigOption = <T extends keyof ConfigurationOptions>(
  key: T,
  newValue: ConfigurationOptions[T]
) => void;
