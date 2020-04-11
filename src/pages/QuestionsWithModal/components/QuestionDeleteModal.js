import React from 'react'

export default function QuestionDeleteModal({ question = {}, show, closeDeleteModal, handleDelete }) {

    return (
        <>
            <div className={`modal fade ${show}`} id="modal-danger" style={{ display: (show === 'show') ? 'block' : 'none' }} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-danger">
                        <div className="modal-header">
                            <h4 className="modal-title">Inativar esta pergunta?</h4>
                            <button type="button" className="close" onClick={() => closeDeleteModal()} aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{question.title}</p>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-outline-light" onClick={() => closeDeleteModal()}>Cancelar</button>
                            <button type="button" className="btn btn-outline-light" onClick={() => handleDelete(question)}>Inativar</button>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </>
    )
}