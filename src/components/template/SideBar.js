import React from 'react';

import Menu from './Menu'

import logoImg from '../../assets/brand/logo-side-bar.jpg'
// import profilePic from '../../assets/user/profile.png'

// import { getUserName } from '../../utils/cookies'

export default props => {

    return (
        <aside className="main-sidebar sidebar-dark-primary primary-color elevation-3">
            {/* <!-- Brand Logo --> */}
            <div className="brand-link brand">
                <div className="brand-logo">
                    <img src={logoImg} alt="Bevixy CO Logo" className="brand-image img-circle elevation-3" style={{ opacity: '0.8' }} />
                    <span className="brand-text text-color">
                        O Corpo Explica ®
                    </span>
                </div>
                <div className="brand-arrow" data-widget="pushmenu">
                    <i className="right fa fa-angle-left"></i>
                </div>
            </div>

            <div className="sidebar os-host os-theme-light os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition os-host-scrollbar-vertical-hidden">
                <div className="os-resize-observer-host">
                    <div className="os-resize-observer observed" style={{ left: '0px', right: 'auto' }}></div>
                </div>
                <div className="os-size-auto-observer" style={{ height: 'calc(100% + 1px)', float: 'left' }}>
                    <div className="os-resize-observer observed"></div>
                </div>
                <div className="os-content-glue" style={{ margin: '0px -8px', width: '249px', height: '544px' }}></div>
                <div className="os-padding">
                    <div className="os-viewport os-viewport-native-scrollbars-invisible" style={{}}>
                        <div className="os-content" style={{ padding: '0px 8px', height: '100%', width: '100%' }}>
                            {/* <!-- Sidebar user panel (optional) --> */}
                            {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div className="image">
                                    <img src={profilePic} alt='Foto Perfil' className='img-circle elevation-2'></img>
                                </div>
                                <div className="info text-color">
                                    {getUserName()}
                                </div>
                            </div> */}

                            <Menu />
                        </div>
                    </div>
                </div>
                <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
                    <div className="os-scrollbar-track">
                        <div className="os-scrollbar-handle" style={{ width: '100%', transform: 'translate(0px, 0px)' }}></div>
                    </div>
                </div>
                <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-unusable os-scrollbar-auto-hidden">
                    <div className="os-scrollbar-track">
                        <div className="os-scrollbar-handle" style={{ height: '100%', transform: 'translate(0px, 0px)' }}></div>
                    </div>
                </div>
                <div className="os-scrollbar-corner"></div>
            </div>

        </aside>
    )
}