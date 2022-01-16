import { CardAttributes } from "./types";

export function createIdFromCardAttributes(card: CardAttributes): string {
  return `${card.amount}-${card.color}-${card.fillStyle}-${card.shape}`;
}
