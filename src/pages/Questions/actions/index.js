import toast from '../../../components/toastr'

import axios from 'axios'
import api from '../../../services/api'


export function load(dispatch) {

    api.get('questions', { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
    ).then(response => {
        dispatch({ type: 'QUESTIONS_LOADED', payload: response.data })
    }).catch(err => {
        toast.error("Erro ao carregar as perguntas.", { autoClose: 3000, pauseOnFocusLoss: false })
    })
}

export async function addOrUpdate(dispatch, values) {
    const method = values.id && values.id !== '0' ? 'put' : 'post'
    values.active = (values.active) ? 1 : 0

    dispatch({ type: 'QUESTIONS_LOADING', payload: true })

    let id = 0

    if (method === 'post')
        id = create(dispatch, values)
    else
        id = update(dispatch, values)

    return id
}


async function create(dispatch, values) {

    try {
        const response = await api.post(`questions/`, values, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
        return response.data.id
    } catch (err) {
        toast.error("Erro ao inserir esta pergunta.", { autoClose: 3000, pauseOnFocusLoss: false })
    }

}

async function update(dispatch, values) {

    const { id } = values

    try {
        const response = await api.put(`questions/${id}`, values, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
        return response.data.id
    } catch (err) {
        toast.error("Erro ao atualizar esta pergunta.", { autoClose: 3000, pauseOnFocusLoss: false })
    }

}

export function destroy(dispatch, question) {

    const { id, title, description, image_url, value } = question

    api.put(`questions/${id}`,
        {
            title, description, image_url, value, active: 0
        },
        {
            headers: { 'Authorization': axios.defaults.headers.common['Authorization'] }
        }).then(response => {
            const questionUpdated = { id: question.id, title, description, image_url, value, active: 0 }
            dispatch({ type: 'QUESTION_DELETED', payload: questionUpdated })
            toast.success("A Pergunta foi inativada.", { autoClose: 2000, pauseOnFocusLoss: false })
        }).catch(err => {
            toast.error("Erro ao inativar a pergunta.", { autoClose: 3000, pauseOnFocusLoss: false })
        })
}