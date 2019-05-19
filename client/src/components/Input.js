import React from 'react'
import T from 'prop-types'
import styled from 'styled-components'

const InputWrapper = styled.div`
    display: inline-block;
    height: ${({ height }) => (height ? height : '48px')};
    width: ${({ width }) => (width ? width : '100%')};
    position: relative;
    background: #ffffff;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    border-radius: 2px;
    position: relative;
    transition: border-bottom 0.3s;
    cursor: pointer;
    & input {
        position: relative;
        top: -2px;
        background: transparent;
        border: 0px;
        outline: 0px;
        color: #424242;
        cursor: auto;
        padding-left: 8px;
        width: 100%;
        height: 100%;
    }
    & label {
        position: absolute;
        height: 24px;
        left: ${({ isShrink }) => (isShrink ? '0px' : '8px')};
        right: 16px;
        top: ${({ isShrink }) => (isShrink ? '-22px' : 'calc(50% - 24px / 2)')};
        font-style: normal;
        font-weight: normal;
        font-size: ${({ isShrink }) => (isShrink ? '11px' : '15px')};
        line-height: ${({ isShrink }) => (isShrink ? '20px' : '24px')};
        display: flex;
        align-items: center;
        color: ${({ isFocus, isInvalid }) =>
            isFocus ? (isInvalid ? '#E1325A' : '#6040B0') : '#424242'};
        opacity: ${({ isFocus }) => (isFocus ? '1' : '0.4')};
        transition: all 0.3s;
        cursor: pointer;
    }
    & div {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: ${({ isInvalid, isFocus }) =>
            isInvalid ? '#E1325A' : isFocus ? '#6040B0' : '#424242'};
        height: ${({ isFocus }) => (isFocus ? '2px' : '1px')};
        border-radius: 0px 0px 2px 2px;
        opacity: ${({ isDisabled }) => (isDisabled ? '0.4' : '0.8')};
        transition: all 0.3s;
    }
    & span {
        position: absolute;
        height: 16px;
        right: 0px;
        bottom: -19px;
        font-style: normal;
        font-weight: normal;
        font-size: 11px;
        line-height: 16px;
        color: #424242;
        opacity: 0.8;
    }
`

export default class Input extends React.PureComponent {
    static defaultProps = {
        inputType: 'text',
        onChange: () => {},
        isInvalid: false,
        errorMessage: 'Введите верное значение',
        disabled: false,
        value: '',
    }

    static propTypes = {
        inputType: T.string,
        label: T.string,
        onChange: T.func,
        errorMessage: T.string,
        value: T.string,
        isInvalid: T.bool,
        disabled: T.bool,
    }

    state = {
        isFocus: false,
        isShrink: this.props.value !== '',
    }

    handleFocus = () => this.setState({ isFocus: true, isShrink: true })
    handleBlur = () =>
        this.setState({ isFocus: false, isShrink: this.props.value !== '' })
    handleChange = e => this.props.onChange(e.target.value)

    render() {
        const {
            props: {
                inputType,
                label,
                errorMessage,
                isInvalid,
                disabled,
                value,
            },
            state: { isFocus, isShrink },
            handleFocus,
            handleBlur,
            handleChange,
        } = this
        const htmlFor = `${inputType}-${Math.random()}`
        return (
            <InputWrapper
                isFocus={isFocus}
                isShrink={isShrink}
                isInvalid={isInvalid}
                isDisabled={disabled}
            >
                <label htmlFor={htmlFor}>{label}</label>
                <input
                    type={inputType}
                    id={htmlFor}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                />
                <div />
                {isInvalid ? <span>{errorMessage}</span> : null}
            </InputWrapper>
        )
    }
}
