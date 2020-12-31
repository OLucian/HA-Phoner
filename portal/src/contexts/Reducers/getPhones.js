import _ from 'lodash';

// const initialState = {
//   cachedPages: {},
//   cachedRequestSize: initialRequestParams,
//   currentRequestParams: initialRequestParams,
//   isLoading: true,
// };

const getPhones = (state, payload) => {
  const newState = _.cloneDeep(state);

  function handleInsertion() {
    newState.cachedPages[payload.requestParams.page] = payload.data;
    newState.cachedRequestSize = payload.requestParams.size;
    newState.currentRequestParams = payload.requestParams;
    newState.isLoading = false;
  }

  const hasSameRequestSize = state.cachedRequestSize === payload.requestParams.size;
  if (!hasSameRequestSize || payload.forced) {
    newState.cachedPages = {};
    handleInsertion();
  } else {
    handleInsertion();
  }
  return newState;
};

const setLoading = (state, payload) => {
  const newState = _.cloneDeep(state);
  newState.isLoading = true;
  return newState;
};

export { getPhones, setLoading };
