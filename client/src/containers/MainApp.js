import React from 'react'
// import styled from 'styled-components';
import { connect } from 'react-redux'
import T from 'prop-types'

import Button from '../components/Button'
import Loader from '../components/Loader'
import { xkcdRequest, getData, getLoading } from '../ducks/common'
import { authLogout } from '../ducks/auth'

class MainApp extends React.PureComponent {
    static propTypes = {
        onFetchData: T.func,
        onLogout: T.func,
        data: T.any,
    }
    componentDidMount() {
        if (this.props.data === null) {
            this.props.onFetchData()
        }
    }

    handleNext = () => {
        this.props.onFetchData()
    }
    handleLogout = () => {
        this.props.onLogout()
    }

    render() {
        const {
            props: { data },
            handleNext,
            handleLogout,
        } = this
        if (data === null) {
            return <Loader />
        }
        return (
            <div>
                <Button title="Logout" onClick={handleLogout} />
                <h3>{data.title}</h3>
                <img src={data.img} alt={data.alt} />
                <p>{data.transcript}</p>
                <Button title="Next" onClick={handleNext} />
            </div>
        )
    }
}

export default connect(
    state => ({
        data: getData(state),
        loading: getLoading(state),
    }),
    dispatch => ({
        onFetchData: _ => dispatch(xkcdRequest()),
        onLogout: _ => dispatch(authLogout()),
    })
)(MainApp)
