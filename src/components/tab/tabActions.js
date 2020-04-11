export function selectedTab(dispatch, tabId) {
    dispatch({
        type: 'TAB_SELECTED',
        payload: tabId
    })
}

export function showTabs(dispatch, ...tabIds) {
    const tabsToShow = {}
    tabIds.forEach(e => tabsToShow[e] = true)

    dispatch({
        type: 'TAB_VISIBLE',
        payload: tabsToShow
    })
}