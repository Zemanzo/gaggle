import { useMemo, useState } from "react";
import styled from "styled-components";
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
    margin: 8px 16px;
  }

  @media screen and ((max-width: 600px) or (max-height: 650px)) {
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

const IsValid = styled.div`
  min-width: 25ch;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardsContainer = styled.section`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(6, auto);
  grid-gap: 16px;
  justify-content: center;

  @media screen and ((max-width: 600px) or (max-height: 650px)) {
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

function getCombinations(): CardType[] {
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
  const initialCards = useMemo(() => randomizeArray(getCombinations()), []);
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
  const [isValidSet, setIsValidSet] = useState("");

  const addToSelection = (card: CardAttributes) => {
    setIsValidSet("");
    const selection = [...currentSelection, card];
    if (selection.length === 3) {
      const isValid = checkSelected(
        selection as [CardAttributes, CardAttributes, CardAttributes]
      );
      setIsValidSet(isValid ? "Correct!!!" : "Incorrect :(");
      if (isValid) {
        setHightlightedCards([]);
        if (visibleCards.length > INITIAL_CARDS) {
          removeFromVisible(selection);
        } else {
          overwriteExisting(selection);
        }
      }
      setCurrentSelection([]);
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
    setAvailableCards(availableCards.slice(cardIdsToRemove.length));
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
      const newCards = availableCards.slice(0, ADD_CARDS_AMOUNT);
      setAvailableCards(availableCards.slice(ADD_CARDS_AMOUNT));
      setVisibleCards([...visibleCards, ...newCards]);
    } else {
      setIsValidSet("There's more to be found!");
    }
  };

  const reset = () => {
    const newCards = randomizeArray(getCombinations());
    setAvailableCards(newCards.slice(INITIAL_CARDS));
    setVisibleCards(newCards.slice(0, INITIAL_CARDS));
    setCurrentSelection([]);
    setHightlightedCards([]);
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

  const getHelp = () => {
    const combo = checkCombinations().pop();
    if (combo) {
      setHightlightedCards(combo);
    }
  };

  return (
    <>
      <StyledHeader>
        <Title>
          <h1>GAGGLE!</h1>
          <h2>/ˈɡaɡ(ə)l/ - noun</h2>
        </Title>
        <IsValid>{isValidSet}</IsValid>
        <button onClick={showMore}>Show more</button>
        <button onClick={getHelp}>Stuck?</button>
        <button onClick={reset}>Reset</button>
      </StyledHeader>
      <SvgGlobals />
      <CardsContainer>
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
