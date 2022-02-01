import { CardAttributes, Statistics, StatisticsReducerAction } from "./types";
import { deepCloneObject } from "./utils";

const initialStatisticsReducerState: Statistics = {
  timesPlayed: 0,
  timesFinished: 0,
  timesPerfectGames: 0,
  hintsUsed: 0,
  revealsUsed: 0,
  matchesFound: 0,
  validMoreCardsRequest: 0,
  invalidMoreCardsRequest: 0,
  attributes: {
    color: {
      equal: 0,
      different: 0,
    },
    fillStyle: {
      equal: 0,
      different: 0,
    },
    shape: {
      equal: 0,
      different: 0,
    },
    amount: {
      equal: 0,
      different: 0,
    },
  },
  fastestCompletionTime: 0,
  averageCompletionTime: 0,
};

export function statisticsReducer(
  state: Statistics,
  action: StatisticsReducerAction
) {
  let newState: Statistics;
  switch (action.type) {
    case "timesPlayed":
    case "timesFinished":
    case "timesPerfectGames":
    case "hintsUsed":
    case "revealsUsed":
    case "validMoreCardsRequest":
    case "invalidMoreCardsRequest":
      newState = { ...state, [action.type]: state[action.type] + 1 };
      break;
    case "matchesFound":
      const newAttributes = getIncrementsBySelection(
        state.attributes,
        action.args
      );
      newState = {
        ...state,
        matchesFound: state.matchesFound + 1,
        attributes: newAttributes,
      };
      break;
    case "reset":
      newState = deepCloneObject(initialStatisticsReducerState);
      break;
    default:
      throw new Error(`No action found with type ${action.type}`);
  }
  asyncWriteStatsToStorage(newState);
  return newState;
}

export function getInitialStatisticsReducerState(): Statistics {
  const storedStatistics = window.localStorage.getItem("statistics");
  if (storedStatistics) {
    const parsedStoredStatistics = JSON.parse(storedStatistics);

    // Add potentially missing keys.
    const clonedObject = deepCloneObject(initialStatisticsReducerState);
    for (let key in clonedObject) {
      if (!parsedStoredStatistics[key]) {
        parsedStoredStatistics[key] = clonedObject[key];
      }
    }

    return parsedStoredStatistics;
  }
  return deepCloneObject(initialStatisticsReducerState);
}

async function asyncWriteStatsToStorage(newValue: Statistics) {
  window.localStorage.setItem("statistics", JSON.stringify(newValue));
}

function getIncrementsBySelection(
  attributesStats: Statistics["attributes"],
  selection: [CardAttributes, CardAttributes, CardAttributes]
): Statistics["attributes"] {
  const newAttributesStats: Statistics["attributes"] = {
    color: { ...attributesStats.color },
    shape: { ...attributesStats.shape },
    amount: { ...attributesStats.amount },
    fillStyle: { ...attributesStats.fillStyle },
  };
  for (const k in selection[0]) {
    const key = k as keyof CardAttributes;
    let attributeValues: any = [];
    selection.forEach((attributes) => {
      if (!attributeValues.includes(attributes[key])) {
        attributeValues.push(attributes[key]);
      }
    });
    if (attributeValues.length === 1) {
      newAttributesStats[key].equal += 1;
    } else if (attributeValues.length === 3) {
      newAttributesStats[key].different += 1;
    } else {
      console.error(selection);
      throw new Error("This is impossible!");
    }
  }

  return newAttributesStats;
}
