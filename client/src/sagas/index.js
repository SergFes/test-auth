import { fork } from 'redux-saga/effects'
import { authRequestWatcher } from './authWatch'
import { xkcdRequestWatcher } from './xkcdWatch'

export default function*() {
    yield fork(authRequestWatcher)
    yield fork(xkcdRequestWatcher)
}
