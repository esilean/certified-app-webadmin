import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { ToastProvider } from 'react-toast-notifications'

import AuthOrApp from './authOrApp'

export default props => (
    <ToastProvider autoDismissTimeout={4000}>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={AuthOrApp} />
                <Redirect from='*' to='/' />
            </Switch>
        </BrowserRouter>
    </ToastProvider>
)