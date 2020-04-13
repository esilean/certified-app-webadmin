import React, { useContext } from 'react'
import { store as tabStore } from './store'
import { store as questionStore } from '../../pages/Questions/store'

import If from '../../utils/if'

export default ({ init, children, page }) => {

    //tabs
    const globalState = useContext(tabStore)
    const dispatchTabs = globalState.dispatch

    //question
    const dispatch = useContext(questionStore).dispatch

    const visible =
        (page === 'questions')
        && globalState.state.selected !== 'tabList'

    return (
        <div className="card-header p-0 pt-1">
            <ul className="nav nav-tabs">
                {children}
                <If test={visible}>
                    <li className="nav-item ml-auto">
                        <a href="#tab" onClick={() => init(dispatchTabs, dispatch)} className="nav-link float-right"><i className="fa fa-arrow-left"></i>&nbsp;&nbsp;Voltar</a>
                    </li>
                </If>
            </ul>
        </div>
    )

}