import React from 'react'
import { connect } from 'react-redux'
import T from 'prop-types'

import './App.css'
import { getToken } from './ducks/auth'
import Loader from './components/Loader'

const LazyLogin = React.lazy(() => import('./containers/Auth'))
const LazyMainApp = React.lazy(() => import('./containers/MainApp'))

function App({ auth }) {
    if (auth === false) {
        return (
            <div className="App">
                <React.Suspense fallback={<Loader />}>
                    <LazyLogin />
                </React.Suspense>
            </div>
        )
    }

    return (
        <div className="App">
            <React.Suspense fallback={<Loader />}>
                <LazyMainApp />
            </React.Suspense>
        </div>
    )
}

export default connect(state => ({ auth: getToken(state) }))(App)

App.propTypes = {
    auth: T.any,
}
