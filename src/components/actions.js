export const ATLAS_SEARCH_RESULT = 'ATLAS_SEARCH_RESULT';
export const atlasSearchReceived = (rs) => ({
  type: ATLAS_SEARCH_RESULT,
  payload: { rs },
});
