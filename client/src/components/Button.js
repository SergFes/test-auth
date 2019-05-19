import React from 'react'
import styled from 'styled-components'
import T from 'prop-types'

const Button = styled.button`
    background: #6040b0;
    border-radius: 1px;
    color: #ffffff;
    border: none;
    outline: none;
    height: ${({ height }) => (height ? height : '48px')};
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
    &:hover {
        box-shadow: ${({ disabled }) =>
            disabled ? 'none' : '0 0 10px rgba(0, 0, 0, 0.9)'};
    }
`

const Btn = ({ title, onClick, disabled, onSubmit, type }) => (
    <Button
        disabled={disabled}
        onClick={onClick}
        onSubmit={onSubmit}
        type={type}
    >
        {title}
    </Button>
)

Btn.propTypes = {
    title: T.string,
    type: T.string,
    disabled: T.bool,
    onClick: T.func,
    onSubmit: T.func,
}

Btn.defaultProps = {
    type: 'button',
}

export default Btn
