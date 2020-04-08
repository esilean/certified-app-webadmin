import '../utils/templates/dependencies'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import consts from '../consts'
import api from '../services/api'

import App from '../app/app'
import Logon from '../pages/Logon'

export default props => {

    const [validToken, setValidToken] = useState(false)

    const token = localStorage.getItem(consts.USER_KEY)

    function validateToken() {
        api.post('sec/vtoken', { token }
        ).then(response => {
            setValidToken(response.data.valid)
        }).catch(err => {
            setValidToken(false)
            localStorage.removeItem(consts.USER_KEY)
            toast.error("Erro ao validar seu email...", { autoClose: 5000 })

        })
    }

    validateToken()
    // console.log("Validando Token..." + validToken)

    if (validToken) {
        axios.defaults.headers.common['Authorization'] = token
        return (<App></App>)
    }
    else {
        return (<Logon />)
    }

}