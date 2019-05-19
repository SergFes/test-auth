import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import T from 'prop-types'

import Button from '../components/Button'
import Input from '../components/Input'
import FormControls from '../services/FormControls'
import { authRequest, getError, authError } from '../ducks/auth'

const AuthWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    width: 368px;
    height: 448px;
    border: 1px solid grey;
    padding: 64px;
    box-sizing: border-box;
    & div {
        cursor: pointer;
        position: relative;
        & p {
            color: #e1325a;
            position: absolute;
            top: 8px;
        }
    }
`

class Auth extends React.PureComponent {
    static propTypes = {
        onAuth: T.func,
        resetError: T.func,
        errorMsg: T.any,
    }
    state = {
        isFormValid: false,
        isLogin: true,
        formControls: {
            name: {
                value: '',
                type: 'text',
                label: 'Имя',
                errorMessage: 'Введите корректное имя',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    name: true,
                },
            },
            email: {
                value: '',
                type: 'email',
                label: 'E-mail',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                },
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Длина пароля не менее 6 символов',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
            },
        },
    }

    handleSubmit = event => {
        event.preventDefault()
        const { formControls, isLogin } = this.state

        const userData = { isLogin }
        Object.keys(formControls).forEach(key => {
            userData[key] = formControls[key].value
        })

        this.props.onAuth(userData)
    }

    toggleLoginAndRegistraition = () => {
        const formControls = { ...this.state.formControls }
        const excludeControls = this.state.isLogin ? [] : ['name']
        const isFormValid = FormControls.validateForm(
            formControls,
            excludeControls
        )

        this.setState({
            formControls,
            isFormValid,
            isLogin: !this.state.isLogin,
        })
        this.props.resetError()
    }

    handleChange = controlName => value => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = value
        control.touched = true
        control.valid = FormControls.validate(control.value, control.validation)

        formControls[controlName] = control

        const excludeControls = this.state.isLogin ? ['name'] : []
        const isFormValid = FormControls.validateForm(
            formControls,
            excludeControls
        )

        this.setState({
            formControls,
            isFormValid,
        })
    }

    renderInputs = () => {
        const { formControls, isLogin } = this.state

        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName]
            if (isLogin && controlName === 'name') return null
            return (
                <Input
                    key={controlName + index}
                    inputType={control.type}
                    value={control.value}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    isInvalid={FormControls.isInvalid(
                        control.valid,
                        control.touched,
                        !!control.validation
                    )}
                    onChange={this.handleChange(controlName)}
                />
            )
        })
    }

    render() {
        const {
            state: { isLogin, isFormValid },
            props: { errorMsg },
            handleSubmit,
            toggleLoginAndRegistraition,
        } = this
        return (
            <AuthWrapper onSubmit={handleSubmit}>
                {this.renderInputs()}
                <Button
                    title={isLogin ? 'Войти' : 'Зарегистрироваться'}
                    disabled={!isFormValid}
                    onSubmit={handleSubmit}
                    type="submit"
                />
                <div onClick={toggleLoginAndRegistraition}>
                    {errorMsg && <p>{errorMsg}</p>}
                    {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </div>
            </AuthWrapper>
        )
    }
}

export default connect(
    state => ({
        errorMsg: getError(state),
    }),
    dispatch => ({
        onAuth: params => dispatch(authRequest(params)),
        resetError: _ => dispatch(authError(null)),
    })
)(Auth)
