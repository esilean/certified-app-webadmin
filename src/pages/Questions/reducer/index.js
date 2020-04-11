export const INITIAL_STATE = {
    questions: [],
    loading: false,
    question: {}
}

export function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'QUESTIONS_LOADING':
            return { ...state, loading: action.payload, questions: state.questions }
        case 'QUESTIONS_LOADED':
            return { ...state, loading: false, questions: action.payload }
        case 'QUESTION_SELECTED':
            return { ...state, question: action.payload, loading: false, questions: state.questions }
        case 'QUESTION_DELETED':
            const questions = state.questions.map(q => {
                return action.payload === q.id ? { ...q, active: 0 } : q
            })
            return { ...state, loading: false, questions: questions }
            
        default:
            return state
    }
}
