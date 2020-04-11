export const INITIAL_STATE = { selected: '', visible: {} }

export function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'TAB_SELECTED':
            return { ...state, selected: action.payload }
        case 'TAB_VISIBLE':
            return { ...state, visible: action.payload }
        default:
            return state
    }
}