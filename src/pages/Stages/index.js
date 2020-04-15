import React, { } from 'react'

import { StateProvider as TabProvider } from '../../components/tab/store'

import ContentHeader from '../../components/template/ContentHeader'
import Content from '../../components/template/Content'
import Row from '../../components/layout/Row'
import Tabs from '../../components/tab/tabs'
import TabsHeader from '../../components/tab/tabsHeader'
import TabHeader from '../../components/tab/tabHeader'
import TabsContent from '../../components/tab/tabsContent'
import TabContent from '../../components/tab/tabContent'

import { init } from './actions'

import Form from './components/StageForm'

import './styles.css'

export default function Stages() {

    return (
        <>
            <ContentHeader title='Etapas' subtitle='' />
            <Content>
                <Row>
                    <div className='col-12'>
                        <TabProvider>
                            <Tabs init={init}>
                                <TabsHeader page='stages'>
                                    <TabHeader label='Etapa 1' icon='bars' target='tabStage1' />
                                    <TabHeader label='Etapa 2' icon='bars' target='tabStage2' />
                                    <TabHeader label='Etapa 3' icon='bars' target='tabStage3' />
                                    <TabHeader label='Etapa 4' icon='bars' target='tabStage4' />
                                </TabsHeader>

                                <TabsContent>
                                    <TabContent id='tabStage1' >
                                        <Form id={1} submitLabel='Etapa 1' />
                                    </TabContent >
                                    <TabContent id='tabStage2'>
                                        <Form id={2} submitLabel='Etapa 2' />
                                    </TabContent>
                                    <TabContent id='tabStage3' >
                                        <Form id={3} submitLabel='Etapa 3' />
                                    </TabContent>
                                    <TabContent id='tabStage4' >
                                        <Form id={4} submitLabel='Etapa 4' />
                                    </TabContent>
                                </TabsContent>
                            </Tabs>
                        </TabProvider>
                    </div>
                </Row>
            </Content>
        </>
    )
}