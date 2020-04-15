import { showTabs, selectedTab } from '../../../components/tab/tabActions'

export function init(dispatch) {

    showTabs(dispatch, 'tabStage1', 'tabStage2', 'tabStage3', 'tabStage4')
    selectedTab(dispatch, 'tabStage1')
}