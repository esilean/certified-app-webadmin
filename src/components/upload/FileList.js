import React from 'react'

import { CircularProgressbar } from 'react-circular-progressbar'

const FileList = ({ file, onDelete, editing = true }) => {

    return (
        <ul className="dropzone-img-list" style={{ marginTop: (editing ? 15 : 0) }}>
            <li>
                <div className="dropzone-img-info">
                    <div className="dropzone-img-preview">
                        <img src={file.preview} alt={file.name}></img>
                    </div>
                    <div>
                        <strong>{file.name}</strong>
                        <span>{file.readableSize} {!!file.url && editing && (<button type='button' onClick={() => onDelete(file.id)}>Excluir</button>)}</span>
                    </div>
                </div>

                <div>
                    {!file.uploaded && !file.error && (
                        <CircularProgressbar
                            styles={{
                                root: { width: 50 },
                                path: { stroke: '#00264e' }
                            }}
                            strokeWidth={10}
                            value={file.progress}
                        />)}

                    {file.url &&
                        (<a
                            href={file.url}
                            target='_blank'
                            rel="noopener noreferrer"
                        >
                            <i className="fa fa-link" style={{ marginRight: 8, fontSize: 20, color: '#222' }}></i>
                        </a>)
                    }
                    {file.uploaded && <i className="fa fa-check" style={{ marginRight: 8, fontSize: 20, color: 'green' }}></i>}
                    {file.error && <i className="fa fa-exclamation-circle" style={{ marginRight: 8, fontSize: 20, color: 'red' }}></i>}
                </div>
            </li>
        </ul>
    )
}

export default FileList
