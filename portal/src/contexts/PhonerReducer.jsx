import { getPhones, setLoading } from './Reducers/getPhones';
import { deletePhones } from './Reducers/deletePhones';
import { updatePhones } from './Reducers/updatePhones';

const PhonerReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PHONES':
      return getPhones(state, action.payload);
    case 'DELETE_PHONES':
      return deletePhones(state, action.payload);
    case 'UPDATE_PHONES':
      return updatePhones(state, action.payload);
    case 'SET_LOADING':
      return setLoading(state, action.payload);
    default:
      return state;
  }
};

export default PhonerReducer;
