import {put, delay, call} from 'redux-saga/effects';
import * as actions from '../actions';
import axios from "axios";
const API_KEY = 'AIzaSyBW9NJlzporsuv4dB_03mBNgXzy017EdRo';

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId');
/*    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');*/
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
    if (!action.isSignUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
    }
    try {
        const res = yield axios.post(url + API_KEY, authData);
        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', res.data.localId);
        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkAuthTimeout(res.data.expiresIn));
    } catch(error) {
        yield put(actions.authFail(error.response.data.error))
    }
}

export function* checkAuthStateSaga(action) {
    const token = yield localStorage.getItem('token');
    const userId = yield localStorage.getItem('userId');
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (!token || !userId || (expirationDate && expirationDate < Date.now())) {
        yield put(actions.logout());
    } else {
        yield put(actions.authSuccess(token, userId));
        yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
    }
}
