// import toast from '../../../components/toastr'

// import axios from 'axios'
// import api from '../../../services/api'

import { showTabs, selectedTab } from '../../../components/tab/tabActions'


export function init(dispatch) {

    showTabs(dispatch, 'tabStage1', 'tabStage2', 'tabStage3', 'tabStage4')
    selectedTab(dispatch, 'tabStage1')
}