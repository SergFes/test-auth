import { createActions } from 'redux-actions'

export const {
    app: { xkcdRequest, xkcdLoading, xkcdSuccess, xkcdError },
} = createActions({
    APP: {
        XKCD_REQUEST: null,
        XKCD_LOADING: null,
        XKCD_SUCCESS: null,
        XKCD_ERROR: null,
    },
})
