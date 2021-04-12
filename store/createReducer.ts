import { Action } from "redux"

export default function createReducer<T>(
    initialState: T,
    handlers: Record<string, (prevState: T, action: Action, root: any) => T>
): (prevState: T, action: Action, root: any) => T {
    return function reducer(state: T = initialState, action: Action, root: any): T {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action, root)
        } else {
            return state
        }
    }
}