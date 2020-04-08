import React, { useEffect, useState, useReducer } from 'react'

import { reducer, INITIAL_STATE } from '../reducer'
import { load, destroy } from '../actions'

import QuestionsTable from './QuestionsTable'
import QuestionDeleteModal from './QuestionDeleteModal'
import QuestionEditModal from './QuestionEditModal'

export default function QuestionsList() {

    const [question, setQuestion] = useState({})

    const [showDelete, setShowDelete] = useState('')
    const [showEdit, setShowEdit] = useState('')
    const [editing, setEditing] = useState(false)

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    useEffect(() => {
        load(dispatch)
    }, [state.loading])

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
                            <small style={{ color: '#00264e' }}>
                                {row.original.description}
                            </small>
                        </>
                    )
                },
                Footer: info => {
                    // Only calculate total visits if rows change
                    const total = React.useMemo(
                        () =>
                            info.rows.reduce((sum, row) => 1 + sum, 0),
                        [info.rows]
                    )

                    return <>Total: {total} pergunta(s)</>
                },
            },
            {
                Header: 'Imagem',
                id: 'image_url',
                Cell: ({ row }) => {
                    return (
                        <div className="question-img-preview">
                            <a
                                href={row.original.image_url}
                                target='_blank'
                                rel="noopener noreferrer"
                            >
                                <img src={row.original.image_url} alt={row.original.image_name}></img>
                            </a>
                        </div>
                    )
                }
            },
            {
                Header: 'Pontos',
                accessor: 'value',
            },
            {
                accessor: d => d.active === true ? '%ativo' : '%inativo',
                Header: 'Ativo',
                Cell: ({ row }) => {
                    return (
                        <span className={`badge badge-${(row.original.active) ? 'success' : 'danger'}`}>{(row.original.active) ? 'Sim' : 'Não'}</span>
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

        destroy(dispatch, question)
        setShowDelete('')
    }

    return (
        <>
            <QuestionsTable columns={columns} questions={state.questions} showEditModal={showEditModal} />
            <QuestionDeleteModal handleDelete={handleDelete} question={question} show={showDelete} closeDeleteModal={closeDeleteModal} />
            <QuestionEditModal question={question} show={showEdit} editing={editing} closeEditModal={closeEditModal} dispatch={dispatch} />
        </>
    )
}