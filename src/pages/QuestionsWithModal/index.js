import React from 'react'

import ContentHeader from '../../components/template/ContentHeader';
import Content from '../../components/template/Content';

import QuestionsList from './components/QuestionsList'

import './styles.css'

export default function Questions() {

    return (
        <>
            <ContentHeader title='Perguntas' subtitle='' />
            <Content>
                <QuestionsList />
            </Content>
        </>
    )
}