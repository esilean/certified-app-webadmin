import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export default props => {

    const [opened, setOpened] = useState(false)

    function handleMenu() {
        setOpened(!opened)
    }

    return (
        <li className={`nav-item has-treeview ${(opened) ? 'menu-open' : ''}`}>
            <Link to={''} className="nav-link" type='button' onClick={() => handleMenu()}>
                <i className={`nav-icon fa fa-${props.icon}`}></i>
                <p>
                    {props.label} <i className="right fa fa-angle-left"></i>
                </p>
            </Link>
            <ul className="nav nav-treeview" style={{}}>
                {props.children}
            </ul>
        </li>
    )
}