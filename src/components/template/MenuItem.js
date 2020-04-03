import React from 'react';
import { Link } from 'react-router-dom'

export default props => {

    return (
        <li className="nav-item">
            <Link to={props.path} className="nav-link">
                <i className={`nav-icon fa fa-${props.icon}`}></i>
                <p>
                    {props.label}
                    {props.badge && <span className={`right badge badge-${props.badge}`}>{props.badgetext}</span>}
                </p>
            </Link>
        </li>
    )
}