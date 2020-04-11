import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from '../components/template/NavBar';
import SideBar from '../components/template/SideBar';
import SideBarRight from '../components/template/SideBarRight';
import Footer from '../components/template/Footer';

import Dashboard from '../pages/Dashboard'
import Questions from '../pages/Questions'
import Stages from '../pages/Stages'


export default props => {

    return (
        <div className="wrapper">

            <NavBar />
            <SideBar />
            <div className="content-wrapper" style={{ minHeight: '328px' }}>
                <Switch>
                    <Route exact path='/'><Dashboard /></Route>
                    <Route path='/stages'><Stages /></Route>
                    <Route path='/questions'><Questions /></Route>
                    <Redirect from='*' to='/' />
                </Switch>
            </div>
            <SideBarRight />
            <Footer />
            <div id="sidebar-overlay"></div>

        </div >

    )
}