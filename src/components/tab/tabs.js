import React, { useEffect, useContext } from 'react'
import { store } from './store'

export default ({ init, children }) => {

    const dispatch = useContext(store).dispatch

    useEffect(() => {
        init(dispatch)
    }, [dispatch, init])

    return (
        
            <div className="card card-outline card-tabs" style={{ borderTop: '3px solid #00264e' }}>
                {children}
            </div>
        
    )

}