import React from 'react'


export default props => {
    return (
        <>
            <input
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                ref={props.register}
                className={`form-control ${(props.err && 'is-invalid')}`}
            />
            <div className="input-group-append">
                <div className="input-group-text">
                    <span className={`fa fa-${props.icon}`}></span>
                </div>
            </div>
            {props.err && <span className="invalid-feedback">Este campo é obrigatório</span>}
        </>
    )
}