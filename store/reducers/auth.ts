import { Action } from "redux";
import User from "../../models/user";
import { AUTH_ACTIONS } from "../actions/auth";
import createReducer from "../createReducer";

export interface AuthState extends User {
    user?: User;
}

export interface AuthAction extends Action<AUTH_ACTIONS.SIGN_IN | AUTH_ACTIONS.SIGN_UP | AUTH_ACTIONS.REFRESH_SIGN> {
    user: User;
}

function setUser(state: AuthState, action: AuthAction) {
    return {
        ...state,
        user: action.user
    }
}

function unsetUser(state: AuthState, action: Action<AUTH_ACTIONS.LOGOUT>) {
    return {
        ...state,
        user: undefined
    }
}

export default createReducer({ user: undefined }, {
    [AUTH_ACTIONS.SIGN_IN]: setUser,
    [AUTH_ACTIONS.SIGN_UP]: setUser,
    [AUTH_ACTIONS.LOGOUT]: unsetUser
})