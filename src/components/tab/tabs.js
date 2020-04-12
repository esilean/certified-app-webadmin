import React, { useEffect, useContext, useMemo } from 'react'
import { store } from './store'

export default ({ init, children }) => {

    const dispatch = useContext(store).dispatch

    useEffect(() => {
        init(dispatch)
    }, [dispatch, init])

    return useMemo(() => {
        return (
            <div className="card card-outline card-tabs" style={{ borderTop: '3px solid #00264e' }}>
                {children}
            </div>
        )
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

}