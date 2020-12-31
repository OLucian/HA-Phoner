import _ from 'lodash';

const updatePhones = (state, payload) => {
  const { page, editData, editDataIndexMap } = payload;
  const newState = _.cloneDeep(state);
  for (const id in editData) {
    for (const property in editData[id]) {
      const index = editDataIndexMap[id];
      newState.cachedPages[page][index][property] = editData[id][property];
      newState.cachedPages[page][index].updated_at = new Date();
    }
  }
  return newState;
};

export { updatePhones };
