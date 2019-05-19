import { xkcdRequest, xkcdError, xkcdSuccess } from '../ducks/common'
import { takeEvery, call, put } from 'redux-saga/effects'
import HTTP from '../services/HTTP'

function* xkcdRequestFlow() {
    try {
        yield put(xkcdSuccess(null))
        const response = yield call(HTTP.get, '/xkcd')
        yield put(xkcdSuccess(response.data))
    } catch (error) {
        yield put(xkcdError(error))
    }
}

export function* xkcdRequestWatcher() {
    yield takeEvery(xkcdRequest, xkcdRequestFlow)
}
