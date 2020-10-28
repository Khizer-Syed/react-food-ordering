import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyBW9NJlzporsuv4dB_03mBNgXzy017EdRo';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

export const logout = () => {
   /* localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');*/
  return {
      type: actionTypes.AUTH_INITIATE_LOGOUT
  }
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    /*return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }*/
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime
    }
};

export const setAuthRedirectPath = (path) => {
  return {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path
  }
};

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignUp
    }
    /*return dispatch => {
        dispatch(authStart());
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
        }
        axios.post(url + API_KEY, {
            email,
            password,
            returnSecureToken: true
        }).then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch(err => dispatch(authFail(err.response.data.error)));
    }*/
};

export const checkAuthState = () => {
    /*return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (!token || !userId || (expirationDate && expirationDate < Date.now())) {
            dispatch(logout());
        } else {
           dispatch(authSuccess(token, userId));
           dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        }
    }*/
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
};

