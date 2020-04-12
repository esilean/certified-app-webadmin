import React from 'react'

export default function QuestionYesNoModal({ modal, question = {}, show, closeModal, handleYesClick, labelSubmit }) {

    return (
        <>
            <div className={`modal fade ${show}`} id={`modal-${modal}`} style={{ display: (show === 'show') ? 'block' : 'none' }} aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content bg-${(modal === 'delete') ? 'danger' : 'info'}`}>
                        <div className="modal-header">
                            <h4 className="modal-title">{labelSubmit} esta pergunta?</h4>
                            <button type="button" className="close" onClick={() => closeModal(modal)} aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{question.title}</p>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-outline-light" onClick={() => closeModal(modal)}>Cancelar</button>
                            <button type="button" className="btn btn-outline-light" onClick={() => handleYesClick(question)}>{labelSubmit}</button>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </>
    )

}