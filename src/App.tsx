import {
  EventHandler,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import Card from "./Card";
import SvgGlobals from "./SvgGlobals";
import { CardAttributes, CardType, Color, FillStyle, Shape } from "./types";

const INITIAL_CARDS = 12;
const ADD_CARDS_AMOUNT = 3;

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

const CardsContainer = styled.div<{ isGameOver: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(6, auto);
  grid-gap: 16px;
  justify-content: center;
  transition: filter 1s;

  ${({ isGameOver }) =>
    isGameOver
      ? css`
          filter: grayscale(70%) brightness(150%) blur(2px);
          pointer-events: none;
        `
      : ""}

  @media screen and (max-width: 600px), screen and (max-height: 650px) {
    grid-gap: 4px;
  }
`;

/**
 * Modifies array in-place
 */
function randomizeArray<T>(arr: T[]): T[] {
  let currentIndex = arr.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
}

function enumKeys<O extends Object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

function generateAllCombinations(): CardType[] {
  const combinations = [];
  for (let Britta = 1; Britta < 4; Britta++) {
    for (const colorKey of enumKeys(Color)) {
      for (const fillStyleKey of enumKeys(FillStyle)) {
        for (const shapeKey of enumKeys(Shape)) {
          combinations.push({
            amount: Britta as 1 | 2 | 3,
            color: Color[colorKey],
            fillStyle: FillStyle[fillStyleKey],
            shape: Shape[shapeKey],
            id: `${Britta}-${Color[colorKey]}-${FillStyle[fillStyleKey]}-${Shape[shapeKey]}`,
          });
        }
      }
    }
  }
  return combinations;
}

function checkSelected(
  cards: [CardAttributes, CardAttributes, CardAttributes]
): boolean {
  for (const k in cards[0]) {
    const key = k as keyof CardAttributes;
    let attributeValues: any = [];
    cards.forEach((card) => {
      if (!attributeValues.includes(card[key])) {
        attributeValues.push(card[key]);
      }
    });
    if (attributeValues.length === 2) {
      return false;
    }
  }
  return true;
}

function createIdFromCardAttributes(card: CardAttributes): string {
  return `${card.amount}-${card.color}-${card.fillStyle}-${card.shape}`;
}

function App() {
  const initialCards = useMemo(
    () => randomizeArray(generateAllCombinations()),
    []
  );
  const [availableCards, setAvailableCards] = useState(
    initialCards.slice(INITIAL_CARDS)
  );
  const [visibleCards, setVisibleCards] = useState<CardType[]>(
    initialCards.slice(0, INITIAL_CARDS)
  );
  const [highlightedCards, setHightlightedCards] = useState<CardType[]>([]);
  const [currentSelection, setCurrentSelection] = useState(
    [] as CardAttributes[]
  );
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const availableCombinationsRef = useRef<CardType[][]>([]);

  const addToSelection = (cards: CardAttributes | CardAttributes[]) => {
    setMessage("");
    const selection = Array.isArray(cards)
      ? cards
      : [...currentSelection, cards];
    if (selection.length === 3) {
      const isValid = checkSelected(
        selection as [CardAttributes, CardAttributes, CardAttributes]
      );
      setMessage(isValid ? "Correct!!!" : "Incorrect :(");
      setCurrentSelection([]);
      if (isValid) {
        setHightlightedCards([]);
        if (visibleCards.length > INITIAL_CARDS) {
          removeFromVisible(selection);
        } else {
          overwriteExisting(selection);
        }
      }
    } else {
      setCurrentSelection(selection);
    }
  };

  const removeFromSelection = (card: CardAttributes) => {
    const cardIndex = currentSelection.findIndex((selection) => {
      for (let k in selection) {
        const key = k as keyof CardAttributes;
        if (selection[key] !== card[key]) {
          return false;
        }
      }
      return true;
    });
    if (cardIndex === -1) {
      return;
    }
    if (currentSelection.length === 2) {
      setCurrentSelection([currentSelection[cardIndex === 0 ? 1 : 0]]);
    } else {
      setCurrentSelection([]);
    }
  };

  const removeFromVisible = (cardsToRemove: CardAttributes[]) => {
    const cardIdsToRemove = cardsToRemove.map((card) =>
      createIdFromCardAttributes(card)
    );
    const updatedVisibleCards = visibleCards.reduce(
      (acc: CardType[], visible) => {
        if (!cardIdsToRemove.includes(visible.id)) {
          acc.push(visible);
        }
        return acc;
      },
      []
    );

    setVisibleCards(updatedVisibleCards);
  };

  const overwriteExisting = (cardsToRemove: CardAttributes[]) => {
    const cardIdsToRemove = cardsToRemove.map((card) =>
      createIdFromCardAttributes(card)
    );
    const newCards = availableCards.slice(0, cardIdsToRemove.length);
    const remainingAvailableCards = availableCards.slice(
      cardIdsToRemove.length
    );
    setAvailableCards(remainingAvailableCards);
    const updatedVisibleCards = visibleCards.reduce(
      (acc: CardType[], visible) => {
        if (cardIdsToRemove.includes(visible.id)) {
          const newCard = newCards.pop();
          if (newCard) acc.push(newCard);
        } else {
          acc.push(visible);
        }
        return acc;
      },
      []
    );

    setVisibleCards(updatedVisibleCards);
  };

  const showMore = () => {
    const combinations = checkCombinations();
    if (combinations.length === 0) {
      if (availableCards.length === 0) {
        setMessage("No more cards left!");
      } else {
        setMessage("");
        const newCards = availableCards.slice(0, ADD_CARDS_AMOUNT);
        setAvailableCards(availableCards.slice(ADD_CARDS_AMOUNT));
        setVisibleCards([...visibleCards, ...newCards]);
      }
    } else {
      setMessage("There's more to be found!");
    }
  };

  const reset = () => {
    const newCards = randomizeArray(generateAllCombinations());
    setAvailableCards(newCards.slice(INITIAL_CARDS));
    setVisibleCards(newCards.slice(0, INITIAL_CARDS));
    setCurrentSelection([]);
    setHightlightedCards([]);
    setMessage("");
    setIsGameOver(false);
    availableCombinationsRef.current = [];
  };

  const checkCombinations = () => {
    const n = visibleCards.length;
    const combinations = [];
    let i, j, k;
    for (i = 0; i < n; i++) {
      for (j = i + 1; j < n; j++) {
        for (k = j + 1; k < n; k++) {
          const combo = [visibleCards[i], visibleCards[j], visibleCards[k]];
          const isValid = checkSelected(
            combo as [CardType, CardType, CardType]
          );
          if (isValid) {
            combinations.push(combo);
          }
        }
      }
    }
    return combinations;
  };

  const highlightSingle = () => {
    const combo = availableCombinationsRef.current[0]?.[0];
    if (combo) {
      setCurrentSelection([]);
      setHightlightedCards([combo]);
    } else {
      setMessage("No valid combinations found");
    }
  };

  const highlightAll = () => {
    const combo = availableCombinationsRef.current[0];
    if (combo) {
      setCurrentSelection([]);
      setHightlightedCards(combo);
    } else {
      setMessage("No valid combinations found");
    }
  };

  useEffect(() => {
    availableCombinationsRef.current = checkCombinations();
    if (
      availableCombinationsRef.current.length === 0 &&
      availableCards.length === 0
    ) {
      setMessage("Game over");
      setIsGameOver(true);
    }
  }, [availableCombinationsRef.current, visibleCards, availableCards.length]);

  useEffect(() => {
    const onKeyPress: EventHandler<any> = (ev: KeyboardEvent) => {
      if (ev.key === "End") {
        if (availableCombinationsRef.current.length > 0) {
          const combo = availableCombinationsRef.current[0];
          if (combo) {
            const comboWithoutIds: CardAttributes[] = combo.map((card) => {
              const { id, ...newCard } = card;
              return newCard;
            });
            addToSelection(comboWithoutIds);
          }
        } else {
          showMore();
        }
      }
    };
    document.addEventListener("keydown", onKeyPress, false);
    return () => {
      document.removeEventListener("keydown", onKeyPress, false);
    };
  }, [availableCombinationsRef.current]);

  return (
    <>
      <StyledHeader>
        <Title>
          <h1>GAGGLE!</h1>
          <h2>/ˈɡaɡ(ə)l/ - noun</h2>
        </Title>
        <Message>{message}</Message>
        <RemainingCards>
          <button onClick={showMore}>Show more</button>
          <span>Cards left: {availableCards.length}</span>
        </RemainingCards>
        <button onClick={highlightSingle}>Hint</button>
        <button onClick={highlightAll}>Reveal</button>
        <button onClick={reset}>Reset</button>
      </StyledHeader>
      <SvgGlobals />
      <CardsContainer isGameOver={isGameOver}>
        {visibleCards.map(({ id, ...cardAttributes }) => {
          const isSelected = currentSelection.some(
            (selection) => id === createIdFromCardAttributes(selection)
          );
          const shouldHighlight = highlightedCards.some(
            (selection) => id === createIdFromCardAttributes(selection)
          );
          return (
            <Card
              {...cardAttributes}
              addToSelection={addToSelection}
              removeFromSelection={removeFromSelection}
              isSelected={isSelected}
              shouldHighlight={shouldHighlight}
              key={id}
            />
          );
        })}
      </CardsContainer>
    </>
  );
}

export default App;
