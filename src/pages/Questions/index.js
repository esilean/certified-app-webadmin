import React, { } from 'react'

import { StateProvider as TabProvider } from '../../components/tab/store'
import { StateProvider as QuestionProvider } from '../Questions/store'

import ContentHeader from '../../components/template/ContentHeader';
import Content from '../../components/template/Content';
import Row from '../../components/layout/Row'
import Tabs from '../../components/tab/tabs'
import TabsHeader from '../../components/tab/tabsHeader'
import TabHeader from '../../components/tab/tabHeader'
import TabsContent from '../../components/tab/tabsContent'
import TabContent from '../../components/tab/tabContent'

import { init } from './actions'

import List from './components/QuestionsList'
import Form from './components/QuestionForm'

import './styles.css'

export default function Questions() {

    return (
        <>
            <ContentHeader title='Perguntas' subtitle='' />
            <Content>
                <Row>
                    <div className='col-12'>
                        <TabProvider>
                            <Tabs init={init}>
                                <QuestionProvider>
                                    <TabsHeader init={init} page='questions'>
                                        <TabHeader label='Lista' icon='bars' target='tabList' />
                                        <TabHeader label='Incluir' icon='plus' target='tabAdd' />
                                        <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                                    </TabsHeader>

                                    <TabsContent>
                                        <TabContent id='tabList'>
                                            <List />
                                        </TabContent>
                                        <TabContent id='tabAdd'>
                                            <Form submitLabel='Salvar' init={init} />
                                        </TabContent>
                                        <TabContent id='tabUpdate'>
                                            <Form submitLabel='Salvar' init={init} />
                                        </TabContent>
                                    </TabsContent>
                                </QuestionProvider>
                            </Tabs>
                        </TabProvider>
                    </div>
                </Row>
            </Content>
        </>
    )
}