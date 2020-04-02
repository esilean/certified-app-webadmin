import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'

export default props => {

    return (
        <>
            <Switch>
                <Route exact path='/'><Dashboard></Dashboard></Route>
            </Switch>
        </>
    )
}