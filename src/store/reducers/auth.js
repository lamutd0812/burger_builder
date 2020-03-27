import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    err: null,
    loading: false,
    authRedirectPath: '/' //see 322
};

//#region Handler
const authStart = (state) => {
    return updateObject(state, { err: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
};
//#endregion 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default reducer;