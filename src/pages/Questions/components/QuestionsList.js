import React, { useEffect, useState, useContext } from 'react'

import { store as tabStore } from '../../../components/tab/store'
import { selectedTab } from '../../../components/tab/tabActions'

import { store as questionStore } from '../store'
import { load, destroy, selectUpdateTab, addOrUpdate } from '../actions'

import QuestionsTable from './QuestionsTable'
import QuestionYesNoModal from './QuestionYesNoModal'


export default function QuestionsList({ onUpdateSelected }) {

    //reducer das tabs
    const dispatchTabs = useContext(tabStore).dispatch

    //reducer das tabs
    const questionState = useContext(questionStore)
    const { state, dispatch } = questionState

    const [question, setQuestion] = useState({})
    const [showDelete, setShowDelete] = useState('')
    const [showCopy, setShowCopy] = useState('')

    useEffect(() => {

        load(dispatch)
    }, [state.loading, dispatch])

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
                            <button disabled={(row.original.canUpdate === 0) ? true : false} className={`btn btn-warning btn-sm ${(row.original.canUpdate === 0) ? 'disabled' : ''}`} title={`${(row.original.canUpdate === 0) ? 'Pergunta não pode ser alterada' : 'Alterar pergunta'}`} onClick={() => selectUpdateTab(dispatchTabs, dispatch, row.original)} href="/#/" type='button'>
                                <i className="fa fa-pencil">
                                </i>
                            </button>
                            {' '}
                            <button className="btn btn-info btn-sm" title='Copiar Pergunta' onClick={() => showModal('copy', row.original)} href="/#/" type='button'>
                                <i className="fa fa-copy">
                                </i>
                            </button>
                            {' '}
                            <button className="btn btn-danger btn-sm" title='Inativar Pergunta' onClick={() => showModal('delete', row.original)} href="/#/" type='button'>
                                <i className="fa fa-trash-o">
                                </i>
                            </button>
                        </div>
                    )
                }
            },
        ],
        [dispatchTabs, dispatch]
    )

    function selectAddTab(question) {
        selectedTab(dispatchTabs, 'tabAdd')
    }

    function showModal(modal, question) {
        setQuestion(question)

        if (modal === 'delete')
            setShowDelete('show')
        else if (modal === 'copy')
            setShowCopy('show')
    }
    function closeModal(modal) {
        if (modal === 'delete')
            setShowDelete('')
        else if (modal === 'copy')
            setShowCopy('')
    }
    async function handleCopy(question) {
        //zerar id
        question.id = 0
        //zerar id das respostas
        const answers = question.answers.map(ans => {
            return { ...ans, id: 0 }
        })
        question.answers = answers
        await addOrUpdate(dispatch, question)
        setShowCopy('')
    }
    async function handleDelete(question) {

        destroy(dispatch, question)
        setShowDelete('')
    }

    return (
        <>
            <QuestionsTable columns={columns} questions={state.questions} selectAddTab={selectAddTab} />
            <QuestionYesNoModal modal='delete' handleYesClick={handleDelete} question={question} show={showDelete} closeModal={closeModal} labelSubmit='Inativar' />
            <QuestionYesNoModal modal='copy' handleYesClick={handleCopy} question={question} show={showCopy} closeModal={closeModal} labelSubmit='Copiar' />
        </>
    )
}