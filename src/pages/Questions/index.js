import React from 'react'

import ContentHeader from '../../components/template/ContentHeader';
import Content from '../../components/template/Content';

import QuestionsList from './components/QuestionsList'

export default function Questions() {

    return (
        <>
            <ContentHeader title='Demo' subtitle='' />
            <Content>
                <QuestionsList />
            </Content>
        </>
    )
}