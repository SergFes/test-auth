import { handleActions } from 'redux-actions'
import { authLoading, authSuccess, authError, authLogout } from './actions'

const defaultState = {
    token: false,
    loading: false,
    error: null,
}

const authReducer = handleActions(
    {
        [authLoading]: (state, action) => ({ ...state, loading: true }),
        [authSuccess]: (state, action) => ({
            ...state,
            loading: false,
            token: true,
        }),
        [authError]: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload,
        }),
        [authLogout]: (state, action) => ({ ...state, token: false }),
    },
    defaultState
)

export default authReducer
