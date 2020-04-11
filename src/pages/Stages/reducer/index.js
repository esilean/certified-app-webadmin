export const INITIAL_STATE = {}

export function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'XXX':
            return { ...state }

        default:
            return state
    }
}
