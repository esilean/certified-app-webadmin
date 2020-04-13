import React, { useState, useEffect, useContext } from 'react'
import toast from '../../../components/toastr'
import filesize from 'filesize'
import { useForm } from 'react-hook-form'

import { store as tabStore } from '../../../components/tab/store'
import { store as questionStore } from '../store'

import axios from 'axios'
import api from '../../../services/api'
import { addOrUpdate } from '../actions'

import Upload from '../../../components/upload/Upload'
import FileList from '../../../components/upload/FileList'

export default function QuestionForm({ init, submitLabel }) {

    //reducer das tabs
    const dispatchTabs = useContext(tabStore).dispatch

    //reducer das tabs
    const questionState = useContext(questionStore)
    const { state, dispatch } = questionState

    const [uploadedFile, setUploadedFile] = useState({})
    const [newId, setNewId] = useState(0)

    const [answer, setAnswer] = useState('')
    const [answers, setAnswers] = useState([])

    //form validation control
    const { register, setValue, handleSubmit, errors, reset, clearError } = useForm({
        mode: 'onBlur',
    })

    useEffect(() => {
        // inicializar form
        reset({
            title: state.question.title,
            description: state.question.description,
            value: state.question.value,
            active: state.question.active ?? true,
            erranswer: state.question.id || ''
        })
    }, [state.question, reset])

    useEffect(() => {
        const data = {
            id: state.question.id,
            name: state.question.image_name,
            readableSize: filesize((state.question.image_size > 0) ? state.question.image_size : 0),
            preview: state.question.image_url,
            progress: 0,
            uploaded: true,
            error: false,
            url: state.question.image_url,
            new: false
        }
        setUploadedFile(data)

        setNewId(state.question.id || 0)
        setAnswers(state.question.answers || [])
    }, [state.question])



    async function handleAddOrUpdate(data) {

        //adicionar respostas ao objeto
        data.answers = answers

        //obter id inserido dps do primeiro clique
        if (newId !== 0)
            data.id = `${newId}`

        const id = await addOrUpdate(dispatch, data)
        //gravar id do registro inserido para nao duplicar caso de erro
        setNewId(id)

        if (id > 0 && uploadedFile.new) {
            processUpload(id, uploadedFile)
        }
        else if (id > 0 && (!uploadedFile.new || !!uploadedFile.new)) {
            resetForm()
            toast.success("Pergunta atualizada com sucesso!")
        } else {
            resetForm()
            toast.error("Erro desconhecido. Entre em contato!")
        }

    }

    function processUpload(id, file) {

        const data = new FormData()
        data.append('file', file.file, file.name)

        api.post(`questions/img/${id}`, data,
            {
                headers: {
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
                onUploadProgress: e => {
                    const progress = parseInt(Math.round((e.loaded * 100) / e.total))
                    setUploadedFile({ ...uploadedFile, progress })
                }
            }).then(response => {
                setUploadedFile({ ...uploadedFile, id: response.data.id, uploaded: true, url: response.data.image_url })
                resetForm()
                toast.success("Pergunta atualizada com sucesso!")

            }).catch(err => {
                setUploadedFile({ ...uploadedFile, error: true })
                toast.error("Erro ao atualizar imagem. Verifique o tamanho...")
            })
    }

    async function handleImageDelete(id) {

        await api.delete(`questions/img/${id}`,
            {
                headers: {
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
            })

        setUploadedFile({})
    }

    function handleDrop(files) {
        if (files.length === 0)
            return
        else if (files.length > 1)
            return

        return
    }

    function handleUpload(files) {
        const data = {
            file: files[0],
            id: files[0].name,
            name: files[0].name,
            readableSize: filesize(files[0].size),
            preview: URL.createObjectURL(files[0]),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
            new: true
        }

        setUploadedFile(data)
    }

    function resetForm() {

        URL.revokeObjectURL(uploadedFile.preview)
        reset()
        setAnswers([])
        init(dispatchTabs, dispatch)

    }

    function addAnswer() {
        if (answer !== '') {
            const answerduplicated = answers.filter(ans => ans.name === answer)
            if (answerduplicated.length === 0) {
                setAnswers([...answers, { name: answer, valid: false, active: true }])
                setAnswer('')
            }
        }
    }

    function editAnswer(name) {
        removeAnswer(name)
        setAnswer(name)
    }

    function removeAnswer(name) {
        if (answers.length <= 1)
            setValue('erranswer', '')

        const newAnswers = answers.filter(ans => ans.name !== name)
        setAnswers(newAnswers)

        const checkedAnswer = newAnswers.filter(ans => ans.valid === true)
        if (checkedAnswer.length > 0)
            setValue('erranswer', '1')
        else
            setValue('erranswer', '')

    }

    function selectAnswer(name) {
        const newAnswers = answers.map(ans => {
            return name === ans.name ? { ...ans, valid: true } : { ...ans, valid: false }
        })
        setAnswers(newAnswers)

        setValue('erranswer', '1')
        clearError('erranswer')
    }

    function handleKeyEnter(e) {
        if (e.ctrlKey && e.keyCode === 13) {
            addAnswer()
        }
    }

    return (
        <form onSubmit={handleSubmit(handleAddOrUpdate)} noValidate >
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Pergunta</label>
                    <textarea
                        name='title'
                        ref={register({ required: true })}
                        className={`form-control form-control-sm ${(errors.title && 'is-invalid')}`}
                        rows={2}
                        placeholder="Informe a pergunta" />
                    {errors.title && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                </div>
                <div className="form-group col-12">
                    <label>Descritivo Auxiliar</label>
                    <textarea
                        name='description'
                        ref={register({ required: false })}
                        className={`form-control form-control-sm ${(errors.description && 'is-invalid')}`}
                        rows={2}
                        placeholder="Informe algum descritivo auxiliar" />
                    {errors.description && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                </div>
                <div className="form-group col-12">
                    {(<label>Imagem</label>)}
                    {(<Upload onDrop={handleDrop} onUpload={handleUpload} />)}
                    {!!uploadedFile.name && (<FileList file={uploadedFile} onDelete={handleImageDelete} editing={true} />)}
                </div>
                <div className="form-group col-12">
                    <label>Pontos</label>
                    <input
                        name='value'
                        ref={register({ required: true, min: 1 })}
                        type='number'
                        className={`form-control form-control-sm ${(errors.value && 'is-invalid')}`}
                        placeholder="Informe o valor da pergunta" />
                    {errors.value && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                </div>
                <div className="form-group col-12">
                    <label>Ativo</label>
                    <div className="custom-control custom-switch">
                        <input
                            name='active'
                            ref={register({ required: false })}
                            type="checkbox"
                            className="custom-control-input"
                            id="activeQuestion" />
                        <label className="custom-control-label" htmlFor="activeQuestion"></label>
                    </div>
                </div>

                <div className="form-group col-12">
                    <label>Adicionar resposta</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button
                                type="button"
                                onClick={() => addAnswer()}
                                className="btn btn-success"><i className='fa fa-plus'></i>
                            </button>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Para inserir clique no + ou "ctrl + enter"'
                            value={answer}
                            onKeyDown={(e) => handleKeyEnter(e)}
                            onChange={(e) => setAnswer(e.target.value)} />
                    </div>
                </div>

                {answers.map((ans, index) => {
                    return (
                        <div key={index} className="form-group  col-12">
                            <div className="input-group">
                                <div className="input-group-prepend" >
                                    <span className="input-group-text" style={(ans.valid) ? { backgroundColor: '#d4ebd0' } : {}}>
                                        <input
                                            type="radio"
                                            name={`${ans.name}`}
                                            className='answers-radio'
                                            id={`${ans.name}`}
                                            onChange={(e) => selectAnswer(e.target.id)}
                                            checked={ans.valid} />
                                    </span>
                                </div>
                                <input type="text" className="form-control" style={(ans.valid) ? { background: '#d4ebd0' } : {}} value={ans.name} readOnly={true} />
                                <div className="input-group-append">
                                    <button type="button" onClick={() => editAnswer(ans.name)} className={`btn btn-warning`}><i className='fa fa-pencil'></i></button>
                                </div>
                                <div className="input-group-append">
                                    <button type="button" onClick={() => removeAnswer(ans.name)} className={`btn btn-danger`}><i className='fa fa-trash-o'></i></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {errors.erranswer && <span className="invalid-feedback" style={{ display: 'block' }}>Este campo é obrigatório. Escolha uma resposta correta.</span>}
                <input
                    type="text"
                    style={{ visibility: "hidden", fontSize: 1 }}
                    id="erranswer"
                    ref={register({ required: true })}
                    name="erranswer" />
            </div>

            <div className="card-footer">
                <button type="button" className="btn btn-default" onClick={() => resetForm()}>Voltar</button>{' '}
                <button type="submit" className="btn primary-color text-color">{submitLabel}</button>
            </div>

        </form>
    )
}