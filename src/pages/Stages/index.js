import React, { } from 'react'

import ContentHeader from '../../components/template/ContentHeader';
import Content from '../../components/template/Content';
import Row from '../../components/layout/Row'

import './styles.css'

export default function Questions() {

    return (
        <>
            <ContentHeader title='Etapas' subtitle='' />
            <Content>
                <Row>
                    <div className='col-12'>
                        STAGES
                    </div>
                </Row>
            </Content>
        </>
    )
}