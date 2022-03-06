import { ATLAS_SEARCH_RESULT } from './actions';

const atlasReducer = (previousState = [], { type, payload }) => {
  if (type === ATLAS_SEARCH_RESULT) {
    return payload.rs;
  }
  return previousState;
}

const init = {
  mappings: [],
  current_mapping: -1,
  filterMappedPrices: 0,
  filterBoardgamesWithNoRank: 0,
  term: "",
}

const bggReducer = (state=init, {type, payload}) => {
  switch(type) {
    case "BGG_SEARCH_RESULTS":
    case "ATLAS_SEARCH_RESULTS":
      return {...state,
        current_mapping: -1,
        mappings: [{
          id: -2,
          boardgame_id: 23953,
          name: "Outside the Scope of BGG",
        }, ...payload]
    }
    case "BGG_SET_MAPPING":
      return {...state, current_mapping: payload}
    case "SET_TERM":
      return {...state, term: payload}
    default:
      return state;
  }
}

export {
  atlasReducer,
  bggReducer
};
