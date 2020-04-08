export const INITIAL_STATE = {
    questions: [],
    loading: false,
    error: {
        message: '',
        devmessage: ''
    },
}

export function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'QUESTIONS_LOADING':
            return { ...state, error: state.error, loading: action.payload, questions: state.questions }
        case 'QUESTIONS_LOADED':
            return { ...state, error: state.error, loading: false, questions: action.payload }
        case 'QUESTION_DELETED':
            const filteredQuestion = state.questions.filter(q => q.id !== action.payload.id)
            return { ...state, error: state.error, loading: false, questions: [action.payload, ...filteredQuestion] }
        case 'QUESTIONS_ERROR':
            return { ...state, error: action.payload, loading: state.loading, questions: state.questions }
        default:
            return state
    }
}
