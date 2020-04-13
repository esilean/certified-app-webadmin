import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from '../../../components/toastr'

import axios from 'axios'
import api from '../../../services/api'

import { getEmbedURL } from '../../../utils/js/urlvideo'

export default function StageForm({ id, submitLabel }) {

    const [stageId, setStageId] = useState(0)

    const [videoURLIni, setVideoURLIni] = useState()
    const [videoURLEnd, setVideoURLEnd] = useState()


    //form validation control
    const { register, handleSubmit, reset, errors } = useForm({
        mode: 'onBlur',
    })

    function handleURLIni(url) {
        setVideoURLIni(getEmbedURL(url))
    }
    function handleURLEnd(url) {
        setVideoURLEnd(getEmbedURL(url))
    }

    useEffect(() => {

        async function getStage() {
            const response = await api.get(`stages/${id}`, {
                headers: {
                    'Authorization': axios.defaults.headers.common['Authorization']
                },
            })

            if (response.status === 200) {

                const { name, title_ini, description_ini, video_url_ini, title_end, description_end, video_url_end, duration_min, question_qty } = response.data

                reset({
                    name, title_ini, description_ini, video_url_ini, title_end, description_end, video_url_end, duration_min, question_qty,
                })

                handleURLIni(video_url_ini)
                handleURLEnd(video_url_end)

            } else {
                toast.error(`Erro ao carregar Etapa ${id}`)
            }
        }

        getStage()
        setStageId(id)
    }, [id, reset])


    async function handleUpdate(data) {

        try {
            data.id = stageId
            await api.put(`stages/${data.id}`, data,
                {
                    headers: {
                        'Authorization': axios.defaults.headers.common['Authorization']
                    },
                })

            toast.success('Etapa atualizada com sucesso.')
        } catch (err) {
            toast.error('Erro ao atualizar a Etapa.')
        }



    }

    return (
        <form onSubmit={handleSubmit(handleUpdate)} noValidate >

            <div className='form-row'>
                <div className="form-group col-12">
                    <label>Etapa</label>
                    <input
                        name='name'
                        ref={register({ required: true })}
                        className={`form-control form-control-sm ${(errors.name && 'is-invalid')}`}
                        placeholder="Informe o nome da etapa" />
                    {errors.name && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                </div>
                <div className="form-group col-lg-6">
                    <label>Quantidade de Perguntas</label>
                    <input
                        type="number"
                        name='question_qty'
                        ref={register({ required: true })}
                        className={`form-control form-control-sm ${(errors.question_qty && 'is-invalid')}`}
                        placeholder="Informe a quantidade de perguntas" />
                    {errors.question_qty && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                </div>
                <div className="form-group col-lg-6">
                    <label>Duração da Etapa <small>(Minutos)</small></label>
                    <input
                        type="number"
                        name='duration_min'
                        ref={register({ required: true })}
                        className={`form-control form-control-sm ${(errors.duration_min && 'is-invalid')}`}
                        placeholder="Informe a duração da etapa em minutos" />
                    {errors.duration_min && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                </div>
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-lg-6">
                            <div className="card card-default">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        Página Inicial
                            </h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Título</label>
                                        <input
                                            name='title_ini'
                                            ref={register({ required: true })}
                                            className={`form-control form-control-sm ${(errors.title_ini && 'is-invalid')}`}
                                            placeholder="Informe o título da página inicial" />
                                        {errors.title_ini && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Descritivo</label>
                                        <textarea
                                            name='description_ini'
                                            ref={register({ required: true })}
                                            className={`form-control form-control-sm ${(errors.description_ini && 'is-invalid')}`}
                                            rows={4}
                                            placeholder="Informe o descritivo da página inicial" />
                                        {errors.description_ini && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>URL Vídeo</label>
                                        <input
                                            name='video_url_ini'
                                            onBlur={(e) => handleURLIni(e.target.value)}
                                            ref={register({ required: false })}
                                            className={`form-control form-control-sm ${(errors.video_url_ini && 'is-invalid')}`}
                                            placeholder="Informe a URL do vídeo da página inicial" />
                                        {errors.video_url_ini && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                                        {
                                            videoURLIni && videoURLIni !== '' &&
                                            (
                                                <div className="embed-responsive embed-responsive-16by9">
                                                    <iframe title="Vídeo da Página Inicial" className="embed-responsive-item" src={videoURLIni} allowFullScreen />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card card-default">
                                <div className="card-header">
                                    <h4 className="card-title">
                                        Página Final
                            </h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Título</label>
                                        <input
                                            name='title_end'
                                            ref={register({ required: true })}
                                            className={`form-control form-control-sm ${(errors.title_end && 'is-invalid')}`}
                                            placeholder="Informe o título da página final" />
                                        {errors.title_end && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Descritivo</label>
                                        <textarea
                                            name='description_end'
                                            ref={register({ required: true })}
                                            className={`form-control form-control-sm ${(errors.description_end && 'is-invalid')}`}
                                            rows={4}
                                            placeholder="Informe o descritivo da página final" />
                                        {errors.description_end && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>URL Vídeo</label>
                                        <input
                                            name='video_url_end'
                                            onBlur={(e) => handleURLEnd(e.target.value)}
                                            ref={register({ required: false })}
                                            className={`form-control form-control-sm ${(errors.video_url_end && 'is-invalid')}`}
                                            placeholder="Informe a URL do vídeo da página final" />
                                        {errors.video_url_end && <span className="invalid-feedback">Este campo é obrigatório.</span>}
                                        {
                                            videoURLEnd && videoURLEnd !== '' &&
                                            (
                                                <div className="embed-responsive embed-responsive-16by9">
                                                    <iframe title="Vídeo da Página Inicial" className="embed-responsive-item" src={videoURLEnd} allowFullScreen />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card-footer">
                <button type="submit" className="btn primary-color text-color">Atualizar {submitLabel}</button>
            </div>

        </form >
    )
}