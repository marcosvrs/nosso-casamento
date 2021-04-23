import * as SecureStore from 'expo-secure-store';
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import User from "../../models/user";
import { signIn as signInService, signUp as signUpService, refreshSign as refreshSignService } from "../../services/AuthService";

export enum AUTH_ACTIONS {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
    LOGOUT = 'LOGOUT'
};

const USER_DATA_KEY = 'userData';

export function signIn(email: string, password: string) {
    return async (dispatch: ThunkDispatch<{}, {}, Action<AUTH_ACTIONS.SIGN_IN>>) => {
        const user = await signInService(email, password);
        dispatch({
            type: AUTH_ACTIONS.SIGN_IN,
            user
        });
        SecureStore.setItemAsync(
            USER_DATA_KEY,
            JSON.stringify(user)
        );
    };
}

export function signUp(email: string, password: string) {
    return async (dispatch: ThunkDispatch<{}, {}, Action<AUTH_ACTIONS.SIGN_UP>>) => {
        const user = await signUpService(email, password);
        dispatch({
            type: AUTH_ACTIONS.SIGN_UP,
            user
        });
        SecureStore.setItemAsync(
            USER_DATA_KEY,
            JSON.stringify(user)
        );
    };
}

export function refreshSign() {
    return async (dispatch: ThunkDispatch<{}, {}, Action<AUTH_ACTIONS.SIGN_IN>>) => {
        try {
            const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
            console.log(userData);
            if (!userData) {
                return;
            }
            const { refreshToken, expires } = <User>JSON.parse(userData);
            const expirationDate = new Date(expires);

            if (expirationDate <= new Date()) {
                return dispatch({
                    type: AUTH_ACTIONS.SIGN_IN,
                    user: await refreshSignService(refreshToken)
                })
            }
            SecureStore.deleteItemAsync(USER_DATA_KEY);
        } catch (error) {
            SecureStore.deleteItemAsync(USER_DATA_KEY);
            throw error;
        }
    };
}

export function logout() {
    return async (dispatch: ThunkDispatch<{}, {}, Action<AUTH_ACTIONS.LOGOUT>>) => {
        dispatch({
            type: AUTH_ACTIONS.LOGOUT,
        });
        SecureStore.deleteItemAsync(USER_DATA_KEY);
    };
}