import React from 'react'

const Input = (props) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type={props.type}
                className="form-control"
                id={props.id}
                name={props.name}
                aria-describedby={props.aria_describedby}
                placeholder={props.placeholder}
                autoComplete='off'
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Input
