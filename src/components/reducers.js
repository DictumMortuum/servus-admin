import { ATLAS_SEARCH_RESULT } from './actions';

const atlasReducer = (previousState = [], { type, payload }) => {
  if (type === ATLAS_SEARCH_RESULT) {
    return payload.rs;
  }
  return previousState;
}

export {
  atlasReducer,
};
