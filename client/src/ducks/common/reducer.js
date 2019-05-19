import { handleActions } from 'redux-actions'
import { xkcdLoading, xkcdSuccess, xkcdError } from './actions'

const defaultState = {
    data: null,
    loading: false,
    error: null,
}

const authReducer = handleActions(
    {
        [xkcdLoading]: (state, action) => ({ ...state, loading: true }),
        [xkcdSuccess]: (state, action) => ({
            ...state,
            loading: false,
            data: action.payload,
        }),
        [xkcdError]: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),
    },
    defaultState
)

export default authReducer
