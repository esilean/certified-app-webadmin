import React, { useState } from 'react'
import axios from 'axios'

import { useToasts } from 'react-toast-notifications'

import consts from '../consts'
import api from '../services/api'

import App from '../app/app'
import Logon from '../pages/Logon'

export default props => {

    const { addToast } = useToasts()
    const [validToken, setValidToken] = useState(false)

    const token = localStorage.getItem(consts.USER_KEY)

    function validateToken() {
        api.post('sec/vtoken', { token }
        ).then(response => {
            setValidToken(response.data.valid)
        }).catch(err => {
            setValidToken(false)
            localStorage.removeItem(consts.USER_KEY)
            addToast('Erro ao validar seu email...', { appearance: 'error', autoDismiss: true })
        })

    }

    validateToken()

    if (validToken) {

        axios.defaults.headers.common['authorization'] = token
        return (<App></App>)
    }
    else {
        return (<Logon />)
    }

}