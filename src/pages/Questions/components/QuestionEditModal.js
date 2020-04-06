import React from 'react'
import { useForm } from 'react-hook-form'

export default function QuestionEditModal({ question = {}, show, editing, closeEditModal, handleData }) {

    async function handleSubmitForm(values) {
        const response = await handleData(values)
        //console.log(response)

        if (response)
            closeModal()
    }

    function closeModal() {
        reset()
        closeEditModal()
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
                        <form onSubmit={handleSubmit(handleSubmitForm)} >
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
                                <button type="button" className="btn btn-default" style={{visibility: (!editing) ? 'hidden' : 'visible'}} onClick={() => closeModal()}>Cancelar</button>
                                <button type="submit" className="btn primary-color text-color" style={{visibility: (!editing) ? 'hidden' : 'visible'}}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </>
    )
}