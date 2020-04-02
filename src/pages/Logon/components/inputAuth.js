import React from 'react'


export default props => {
    return (
        <>
            <input
                name={props.name}
                ref={props.register}
                className={`form-control ${(props.err && 'is-invalid')}`}
                placeholder={props.placeholder}
                type={props.type} />
            {props.err && <span className="invalid-feedback">Este campo é obrigatório</span>}
        </>
    )
}