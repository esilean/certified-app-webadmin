import React from 'react';
import { useHistory  } from 'react-router-dom'

export default props => {

    const history = useHistory()

    function signOut() {
        localStorage.removeItem('_ceclient')
        history.push('/')
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-dark primary-color">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="/#/" role="button"><i className="fa fa-bars"></i></a>
                </li>
                {/* <li className="nav-item d-none d-sm-inline-block">
                    <a href="/#/" className="nav-link">Home</a>
                </li> */}
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" title='Sair do Sistema' href="/#/" onClick={e => signOut()} role="button">
                        <i className="fa fa-sign-out"></i>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="/#/" role="button">
                        <i className="fa fa-th-large"></i>
                    </a>
                </li>
            </ul>
        </nav>
    )
}