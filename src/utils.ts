import { CardAttributes } from "./types";

export function createIdFromCardAttributes(card: CardAttributes): string {
  return `${card.amount}-${card.color}-${card.fillStyle}-${card.shape}`;
}

export function deepCloneObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
