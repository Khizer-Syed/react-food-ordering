import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, checkAuthStateSaga} from "./auth";
import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {initIngredientsSaga} from "./burgerBuilder";
import {fetchOrdersSaga, purchaseBurgerSaga} from "./order";


export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, checkAuthStateSaga)
    ])
}

export function* watchBurger() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
