import React, { useContext } from 'react'

import { store } from './store'

import If from '../../utils/if'

export default (props) => {

    const globalState = useContext(store)
    const selected = globalState.state.selected === props.id
    const visible = globalState.state.visible[props.id]

    return (
        <If test={visible}>
            <div className={`tab-pane ${(selected) ? 'active' : ''}`} id={props.id} role="tabpanel">
                {props.children}
            </div>
        </If>

    )

}