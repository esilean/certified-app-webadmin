import React, { useContext } from 'react'

import { store } from './store'

import { selectedTab } from './tabActions'
import If from '../../utils/if'

export default ({ label, icon, target }) => {

    const globalState = useContext(store)
    const selected = globalState.state.selected === target
    const visible = globalState.state.visible[target]

    function handleSelectedTab(target) {
        selectedTab(globalState.dispatch, target)
    }

    return (
        <If test={visible}>
            <li className="nav-item" >
                <a href='#tab'
                    className={`nav-link ${(selected ? 'active primary-text-color' : '')}`}
                    data-toggle={target}
                    onClick={() => handleSelectedTab(target)}
                    role="tab"
                    aria-selected={selected}
                ><i className={`fa fa-${icon}`}></i>&nbsp;&nbsp;{label}</a>
            </li>
        </If>
    )

}