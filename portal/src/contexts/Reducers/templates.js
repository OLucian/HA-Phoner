import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { setWithExpiry } from '../../utils/localStorage';

// 1h(in ms) * (how many hours you want)
const ttl = 3600000 * 6;

const addProduct = (state, payload) => {
  const newState = _.cloneDeep(state);
  if (newState.orders.active.products[payload.product.id] === undefined) {
    newState.orders.active.products[payload.product.id] = [{ toppings: [] }];
  } else {
    newState.orders.active.products[payload.product.id].push({ toppings: [] });
  }
  setWithExpiry(`order-${payload.state}-${payload.placeId}`, JSON.stringify(newState.orders), ttl);
  return newState;
};

const removeProduct = (state, payload) => {
  if (state.orders.active.products[payload.productId] === undefined) {
    return state;
  }

  const newState = _.cloneDeep(state);
  if (newState.orders.active.products[payload.productId].length === 1) {
    delete newState.orders.active.products[payload.productId];
  } else {
    newState.orders.active.products[payload.productId].pop();
  }
  setWithExpiry(`order-${payload.state}-${payload.placeId}`, JSON.stringify(newState.orders), ttl);
  return newState;
};

const removeProductByIndex = (state, payload) => {
  if (state.orders.active.products[payload.productId] === undefined) {
    return state;
  }

  const newState = _.cloneDeep(state);
  newState.orders.active.products[payload.productId].splice(payload.index, 1);
  if (newState.orders.active.products[payload.productId].length === 0) {
    delete newState.orders.active.products[payload.productId];
  }
  setWithExpiry(`order-${payload.state}-${payload.placeId}`, JSON.stringify(newState.orders), ttl);
  return newState;
};

const removeProductAll = (state, payload) => {
  if (state.orders.active.products[payload.productId] === undefined) {
    return state;
  }

  const newState = _.cloneDeep(state);
  delete newState.orders.active.products[payload.productId];
  setWithExpiry(`order-${payload.state}-${payload.placeId}`, JSON.stringify(newState.orders), ttl);
  return newState;
};

const setToppingsToProduct = (state, payload) => {
  if (state.orders.active.products[payload.productId] === undefined) {
    return state;
  }

  const { placeId, productId, toppings, position } = payload;

  const newState = _.cloneDeep(state);
  newState.orders.active.products[productId][position].toppings = toppings;
  setWithExpiry(`order-${payload.state}-${placeId}`, JSON.stringify(newState.orders), ttl);
  return newState;
};

const confirmActiveOrder = (state, payload) => {
  const hasProducts = Object.keys(state.orders.active.products).length > 0;
  if (!hasProducts) {
    return state;
  }

  const { placeId, cost } = payload;
  const newState = _.cloneDeep(state);
  const newConfirmedActiveOrder = {
    orderId: state.orders.active.orderId,
    status: 'pending',
    date: new Date().getTime(),
    products: state.orders.active.products,
    cost,
    orderNo: state.orders.active.orderNo,
    discount: 0,
  };
  const nextOrderIndex = state.orders.orderIndex + 1;
  const newOrders = {
    orderIndex: nextOrderIndex,
    history: [...state.orders.history, newConfirmedActiveOrder],
    active: {
      date: 0,
      orderId: uuidv4(),
      orderNo: nextOrderIndex,
      products: {},
      status: 'active',
      cost: 0,
      discount: 0,
    },
  };

  newState.orders = newOrders;
  setWithExpiry(`order-${payload.state}-${placeId}`, JSON.stringify(newState.orders), ttl);
  return newState;
};

const approveOrder = (state, payload) => {
  if (!payload.orderId) {
    return state;
  }

  const { placeId } = payload;
  const newState = _.cloneDeep(state);

  for (const order of newState.orders.history) {
    if (order.orderId === payload.orderId) {
      order.status = 'approved';
    }
  }

  setWithExpiry(`order-${payload.state}-${placeId}`, JSON.stringify(newState.orders), ttl);
  return newState;
};

const rejectOrder = (state, payload) => {
  if (!payload.orderId) {
    return state;
  }

  const { placeId } = payload;
  const newState = _.cloneDeep(state);

  const orderToApprove = state.orders.history.filter((order) => order.orderId === payload.orderId);
  orderToApprove.status = 'rejected';

  setWithExpiry(`order-${payload.state}-${placeId}`, JSON.stringify(newState.orders), ttl);
  return newState;
};

const cancelOrder = (state, payload) => {
  if (!payload.orderId) {
    return state;
  }

  const { placeId } = payload;
  const newState = _.cloneDeep(state);

  const history = state.orders.history.filter((order) => !(order.orderId === payload.orderId));

  newState.orders.history = history;

  setWithExpiry(`order-${payload.state}-${placeId}`, JSON.stringify(newState.orders), ttl);
  return newState;
};

export {
  addProduct,
  removeProduct,
  removeProductAll,
  removeProductByIndex,
  setToppingsToProduct,
  confirmActiveOrder,
  approveOrder,
  rejectOrder,
  cancelOrder,
};
