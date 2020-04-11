import React from 'react';

import MenuTree from './MenuTree'
import MenuItem from './MenuItem'

export default props => {

    return (
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                <MenuItem path='/' label='Dashboard' icon='tachometer' badge='info' badgetext='New' />

                <MenuTree label='Cadastros' icon='clipboard'>
                    <MenuItem path='/stages' label='Etapas' icon='question-circle' badge='info' badgetext='New' />
                    <MenuItem path='/questions' label='Perguntas' icon='question-circle' badge='warning' badgetext='New' />
                </MenuTree>


            </ul>
        </nav>

    )
}