import { createActions } from 'redux-actions'

export const {
    auth: { authRequest, authLoading, authSuccess, authError, authLogout },
} = createActions({
    AUTH: {
        AUTH_REQUEST: null,
        AUTH_LOADING: null,
        AUTH_SUCCESS: null,
        AUTH_ERROR: null,
        AUTH_LOGOUT: null,
    },
})
