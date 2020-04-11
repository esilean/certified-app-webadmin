import React, { useState, useEffect } from 'react'
import toast from '../../../components/toastr'
import filesize from 'filesize'
import { useForm } from 'react-hook-form'

import axios from 'axios'
import api from '../../../services/api'
import { addOrUpdate } from '../actions/index'

import Upload from '../../../components/upload/Upload'
import FileList from '../../../components/upload/FileList'

export default function QuestionEditModal({ dispatch, question = {}, show, editing, closeEditModal }) {

    const [uploadedFile, setUploadedFile] = useState({})
    const [newId, setNewId] = useState(0)

    useEffect(() => {

        const data = {
            id: question.id,
            name: question.image_name,
            readableSize: filesize((question.image_size > 0) ? question.image_size : 0),
            preview: question.image_url,
            progress: 0,
            uploaded: true,
            error: false,
            url: question.image_url,
            new: false
        }

        setUploadedFile(data)
        setNewId(0)
    }, [question, show])

    async function handleAddOrUpdate(values) {

        //obter id inserido dps do primeiro clique
        if (newId !== 0)
            values.id = `${newId}`

        const id = await addOrUpdate(dispatch, values)
        //gravar id do registro inserido para nao duplicar caso de erro
        setNewId(id)

        if (id > 0 && uploadedFile.new) {
            processUpload(id, uploadedFile)
        }
        else if (id > 0 && (!uploadedFile.new || !!uploadedFile.new)) {
            closeModal()
            toast.success("Pergunta atualizada com sucesso!", { autoClose: 1500, pauseOnFocusLoss: false })
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

                setTimeout(() => {
                    closeModal()
                    toast.success("Pergunta atualizada com sucesso!", { autoClose: 1500, pauseOnFocusLoss: false })
                }, 500)

            }).catch(err => {
                setUploadedFile({ ...uploadedFile, error: true })
                toast.error("Erro ao atualizar imagem. Verifique o tamanho...", { autoClose: 3000, pauseOnFocusLoss: false })
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

    function closeModal() {

        URL.revokeObjectURL(uploadedFile.preview)

        reset()
        closeEditModal()
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

    //form validation control
    const { register, handleSubmit, errors, reset } = useForm({
        mode: 'onBlur',
    })

    return (

        <>
            <div className={`modal fade ${show}`} id="modal-lg" style={{ display: (show === 'show') ? 'block' : 'none' }} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{(editing) ? ((question.id > 0) ? 'Alterar' : 'Incluir') : 'Visualizar'} Pergunta</h4>
                            <button type="button" className="close" onClick={() => closeModal()} aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        {/* FORM INIT */}
                        <form onSubmit={handleSubmit(handleAddOrUpdate)} >
                            {/* Hidden Fields */}
                            <input
                                type="hidden"
                                id="id"
                                defaultValue={question.id}
                                ref={register({ required: true })}
                                name="id" />
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Pergunta</label>
                                            <textarea
                                                name='title'
                                                defaultValue={question.title}
                                                ref={register({ required: true })}
                                                readOnly={!editing}
                                                className={`form-control form-control-sm ${(errors.title && 'is-invalid')}`}
                                                rows={3}
                                                placeholder="Informe a pergunta" />
                                            {errors.title && <span className="invalid-feedback">Este campo é obrigatório</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Descritivo Auxiliar</label>
                                            <textarea
                                                name='description'
                                                defaultValue={question.description}
                                                ref={register({ required: false })}
                                                readOnly={!editing}
                                                className={`form-control form-control-sm ${(errors.description && 'is-invalid')}`}
                                                rows={3}
                                                placeholder="Informe algum descritivo auxiliar" />
                                            {errors.description && <span className="invalid-feedback">Este campo é obrigatório</span>}
                                        </div>
                                        <div className="form-group">
                                            {!!uploadedFile.name && (<label>Imagem</label>)}
                                            {editing && (<Upload onDrop={handleDrop} onUpload={handleUpload} />)}
                                            {!!uploadedFile.name && (<FileList file={uploadedFile} onDelete={handleImageDelete} editing={editing} />)}
                                        </div>
                                        <div className="form-group">
                                            <label>Pontos</label>
                                            <input
                                                name='value'
                                                defaultValue={question.value}
                                                ref={register({ required: true, min: 1 })}
                                                readOnly={!editing}
                                                type='number'
                                                className={`form-control form-control-sm ${(errors.value && 'is-invalid')}`}
                                                placeholder="Informe o valor da pergunta" />
                                            {errors.value && <span className="invalid-feedback">Este campo é obrigatório</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Ativo</label>
                                            <div className="custom-control custom-switch float-right">
                                                <input
                                                    name='active'
                                                    defaultChecked={question.active}
                                                    ref={register({ required: false })}
                                                    disabled={!editing}
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id="activeQuestion" />
                                                <label className="custom-control-label" htmlFor="activeQuestion"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" style={{ visibility: (!editing) ? 'hidden' : 'visible' }} onClick={() => closeModal()}>Fechar</button>
                                <button type="submit" className="btn primary-color text-color" style={{ visibility: (!editing) ? 'hidden' : 'visible' }}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </>
    )
}