import { Action } from "redux"

export default function createReducer<S, A extends Action, R = any>(
    initialState: S,
    handlers: Record<string, (prevState: S, action: A, root: R) => S>
): (prevState: S, action: A, root: R) => S {
    return function reducer(state: S = initialState, action: A, root: R): S {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action, root)
        } else {
            return state
        }
    }
}