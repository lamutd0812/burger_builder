import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

//#region Handler
const purchaseInit = (state) => {
    return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state) => {
    return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const fetchOrdersStart = (state) => {
    return updateObject(state, { loading: true });
    // reuse loading property for both orders and checkout pages
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const fetchOrdersFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};
//#endregion

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
        default: return state;
    }
};

export default reducer;