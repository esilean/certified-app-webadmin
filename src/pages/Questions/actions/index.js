import toast from '../../../components/toastr'

import axios from 'axios'
import api from '../../../services/api'

import { showTabs, selectedTab } from '../../../components/tab/tabActions'


export function init(dispatchTabs, dispatch) {

    //é preciso limpar a questao selecionada antes de liberar o form
    if (dispatch) {
        dispatch({ type: 'QUESTION_SELECTED', payload: { id: 0 } })
    }

    showTabs(dispatchTabs, 'tabList', 'tabAdd')
    selectedTab(dispatchTabs, 'tabList')
}

export function selectUpdateTab(dispatchTabs, dispatch, question) {
    showTabs(dispatchTabs, 'tabUpdate')
    selectedTab(dispatchTabs, 'tabUpdate')
    dispatch({ type: 'QUESTION_SELECTED', payload: question })
}

export function load(dispatch) {

    api.get('questions', { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
    ).then(response => {
        dispatch({ type: 'QUESTIONS_LOADED', payload: response.data })
    }).catch(err => {
        toast.error("Erro ao carregar as perguntas.")
    })
}

export async function addOrUpdate(dispatch, data) {
    const method = data.id && data.id !== '0' ? 'put' : 'post'
    data.active = (data.active) ? 1 : 0

    dispatch({ type: 'QUESTIONS_LOADING', payload: true })

    let id = 0
    if (method === 'post')
        id = create(dispatch, data)
    else
        id = update(dispatch, data)

    return id
}


async function create(dispatch, data) {

    try {
        const response = await api.post(`questions/`, data, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
        return response.data.id
    } catch (err) {
        toast.error("Erro ao inserir esta pergunta.")
    }

}

async function update(dispatch, data) {

    const { id } = data
    try {
        const response = await api.put(`questions/${id}`, data, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
        return response.data.id
    } catch (err) {
        toast.error("Erro ao atualizar esta pergunta.")
    }

}

export function destroy(dispatch, question) {

    const { id } = question

    api.put(`questions/${id}`,
        {
            ...question, active: 0
        },
        {
            headers: { 'Authorization': axios.defaults.headers.common['Authorization'] }
        }).then(response => {
            dispatch({ type: 'QUESTION_DELETED', payload: id })
            toast.success("A Pergunta foi inativada.")
        }).catch(err => {
            toast.error("Erro ao inativar a pergunta.")
        })
}