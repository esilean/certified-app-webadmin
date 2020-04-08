import React, { Component } from 'react'

import Dropzone from 'react-dropzone'

export default class Upload extends Component {


    handleDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive)
            return <span className='dropzone-msg'>Clique aqui ou arraste sua imagem...</span>
        if (isDragReject)
            return <span className='dropzone-msg dropzone-error'>Tipo de arquivo não suportado...</span>
        return <span className='dropzone-msg dropzone-success'>Solte sua imagem aqui...</span>
    }

    render() {

        const { onDrop, onUpload, multiple = false } = this.props

        return (
            <Dropzone
                accept='image/*'
                onDrop={onDrop}
                multiple={multiple}
                onDropAccepted={onUpload}>
                {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <div className={`dropzone ${(isDragActive) ? 'is-drag-active' : ''} ${(isDragReject) ? 'is-drag-reject' : ''}`}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        {this.handleDragMessage(isDragActive, isDragReject)}
                    </div>
                )}
            </Dropzone>
        )
    }
}