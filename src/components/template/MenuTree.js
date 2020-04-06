import React from 'react';
import { Link } from 'react-router-dom'

export default props => {

    return (
        <li className="nav-item has-treeview">
            <Link to={''} className="nav-link">
                <i className={`nav-icon fa fa-${props.icon}`}></i>
                <p>
                    {props.label} <i className="right fa fa-angle-left"></i>
                </p>
            </Link>
            <ul className="nav nav-treeview" style={{ display: 'none' }}>
                {props.children}
            </ul>
        </li>
    )
}