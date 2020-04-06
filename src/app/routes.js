import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { ToastProvider, DefaultToastContainer } from 'react-toast-notifications'

import AuthOrApp from './authOrApp'

const ToastContainer = props => (
    <DefaultToastContainer
        className='toast-container'
        style={{ zIndex: 9000 }}
        {...props}
    />
)


export default props => (
    <ToastProvider components={{ ToastContainer }} autoDismissTimeout={4000}>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={AuthOrApp} />
                <Redirect from='*' to='/' />
            </Switch>
        </BrowserRouter>
    </ToastProvider>
)