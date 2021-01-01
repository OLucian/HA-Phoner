import _ from 'lodash';

// const initialState = {
//   cachedPages: {},
//   cachedRequestSize: initialRequestParams,
//   currentRequestParams: initialRequestParams,
//   isLoading: true,
// };

const deletePhones = (state, payload) => {
  const { page, ids } = payload;
  const newState = _.cloneDeep(state);
  const PHONEID_MAP = {};
  for (const phoneId of ids) {
    PHONEID_MAP[phoneId] = true;
  }
  const notDeletedPhones = [];
  for (const phone of newState.cachedPages[page]) {
    if (!PHONEID_MAP[phone.id]) notDeletedPhones.push(phone);
  }
  newState.cachedPages[page] = notDeletedPhones;
  newState.isLoading = false;
  return newState;
};

export { deletePhones };
