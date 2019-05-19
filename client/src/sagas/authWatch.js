import {
    authRequest,
    authError,
    authSuccess,
    authLoading,
    getToken,
    authLogout,
} from '../ducks/auth'
import { take, put, call, fork, cancel, select } from 'redux-saga/effects'
import AuthService from '../services/Auth.service'

export function* authRequestWatcher() {
    while (true) {
        const isToken = yield select(getToken)
        let task
        if (!isToken) {
            const {
                payload: { name, password, email, isLogin },
            } = yield take(authRequest)
            task = yield fork(authorize, { name, password, email, isLogin })
        }

        const action = yield take([authLogout, authError])

        if (action.type === authLogout) yield cancel(task)
        yield call(AuthService.deleteToken, 'token')
    }
}

function* authorize(authData) {
    try {
        yield call(authLoading)
        const res = yield call(AuthService.auth, authData)
        yield call(AuthService.setToken, res.data.token)
        yield put(authSuccess(res.data.token))
        return res
    } catch (error) {
        let err = 'Ошибка на сервере'
        if (error.response) {
            err = error.response.data.msg
        }
        yield put(authError(err))
    }
}
