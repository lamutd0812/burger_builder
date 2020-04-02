import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


// purchase (order) burger
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    };
};


export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                //console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error));
            });
        //Note: .json extensions: use with firebase only. 
    };
};

//fetch orders
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        // 327: display orders of specific user
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                //console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err));
            });
    };
};





