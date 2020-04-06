import React, { useEffect, useState } from 'react'

import axios from 'axios'
import api from '../../../services/api'

import { useToasts } from 'react-toast-notifications'

import QuestionsTable from './QuestionsTable'
import QuestionDeleteModal from './QuestionDeleteModal'
import QuestionEditModal from './QuestionEditModal'

export default function QuestionsList() {

    const { addToast } = useToasts()

    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState({})

    const [showDelete, setShowDelete] = useState('')
    const [showEdit, setShowEdit] = useState('')
    const [editing, setEditing] = useState(false)


    async function loadQuestions() {

        const response = await api.get('questions', { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
        //console.log(response.data)

        setQuestions(response.data)
    }

    useEffect(() => {
        loadQuestions()
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Pergunta',
                accessor: 'title',
                Cell: ({ row }) => {
                    return (
                        <>
                            <span>
                                {row.original.title}
                            </span>
                            <br />
                            <small>
                                {row.original.description}
                            </small>
                        </>
                    )
                }
            },
            {
                Header: 'Pontos',
                accessor: 'value',
            },
            {
                accessor: d => d.active === true ? 0 : 1,
                Header: 'Ativo',
                Cell: ({ row }) => {
                    return (
                        <span className={`badge badge-${(row.original.active) ? 'success' : 'danger'}`}>{(row.original.active) ? 'Ativo' : 'Inativo'}</span>
                    )
                }
            },
            {
                Header: '',
                id: 'action',
                Cell: ({ row }) => {
                    return (
                        <div className="project-actions text-right">
                            <button className="btn btn-info btn-sm" title='Visualizar Pergunta' onClick={() => showEditModal(row.original, false)} href="/#/" type='button'>
                                <i className="fa fa-eye">
                                </i>
                            </button>
                            {' '}
                            <button className="btn btn-warning btn-sm" title='Alterar Pergunta' onClick={() => showEditModal(row.original, true)} href="/#/" type='button'>
                                <i className="fa fa-pencil">
                                </i>
                            </button>
                            {' '}
                            <button className="btn btn-danger btn-sm" title='Inativar Pergunta' onClick={() => showDeleteModal(row.original)} href="/#/" type='button'>
                                <i className="fa fa-trash-o">
                                </i>
                            </button>
                        </div>
                    )
                }
            },
        ],
        []
    )

    function showEditModal(question, editing) {
        setEditing(editing)
        setQuestion(question)
        setShowEdit('show')

    }
    function closeEditModal() {
        setShowEdit('')
    }
    function showDeleteModal(question) {
        setQuestion(question)
        setShowDelete('show')
    }
    function closeDeleteModal() {
        setShowDelete('')
    }
    async function handleDelete(question) {
        try {

            const { title, description, image_url, value } = question

            await api.put(`questions/${question.id}`,
                {
                    title, description, image_url, value, active: 0
                },
                {
                    headers: { 'Authorization': axios.defaults.headers.common['Authorization'] }
                })

            //remover e adicionar novo
            let filteredQuestion = questions.filter(q => q.id !== question.id)
            setQuestions(questions => [{ id: question.id, title, description, image_url, value, active: 0 }, ...filteredQuestion])

            setShowDelete('')

            addToast('A Pergunta foi inativada.', { appearance: 'success', autoDismiss: true })

        } catch (error) {
            addToast('Erro ao atualizar pergunta.', { appearance: 'error', autoDismiss: true })
        }
    }

    async function handleData(values) {

        const id = values.id && values.id !== '0' ? values.id : ''
        const method = values.id && values.id !== '0' ? 'put' : 'post'
        values.active = (values.active) ? 1 : 0

        try {

            const response = await api[method](`questions/${id}`, values, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
            if (response.data && response.data.id > 0) {

                if (id === '0') { //add
                    setQuestions(questions => [response.data, ...questions])
                }
                else {
                    //remover e adicionar novo
                    const filteredQuestion = questions.filter(q => q.id !== response.data.id)
                    setQuestions(questions => [response.data, ...filteredQuestion])
                }

                addToast(`Pergunta ${(id > 0) ? 'atualizada' : 'incluída'} com sucesso.`, { appearance: 'success', autoDismiss: true })
                return true
            }

            addToast(`Erro ao ${(id > 0) ? 'atualizar' : 'incluir'} pergunta.`, { appearance: 'error', autoDismiss: true })
        } catch (error) {
            addToast(`Erro ao ${(id > 0) ? 'atualizar' : 'incluir'} pergunta.`, { appearance: 'error', autoDismiss: true })
        }
        return false
    }


    return (
        <>
            <QuestionsTable columns={columns} questions={questions} showEditModal={showEditModal} />
            <QuestionDeleteModal handleDelete={handleDelete} question={question} show={showDelete} closeDeleteModal={closeDeleteModal} />
            <QuestionEditModal question={question} show={showEdit} editing={editing} closeEditModal={closeEditModal} handleData={handleData} />
        </>
    )
}