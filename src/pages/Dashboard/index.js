
import React from 'react'
import toast from '../../components/toastr'

import ContentHeader from '../../components/template/ContentHeader';
import Content from '../../components/template/Content';
import Row from '../../components/layout/Row'

export default function Dashboard() {

    function triggerSuccess(){
        toast.success("Atualizar com sucesso.")
      }
      
      function triggerError() {
        toast.error("Lemon drops donut marzipan gummi bears cotton candy cotton candy jelly-o carrot cake.")
      }

      function triggerInfo(){
        toast.info("Lemon drops donut marzipan gummi bears cotton candy cotton candy jelly-o carrot cake.")
      }
      
      function triggerWarn() {
        toast.warn("Lemon drops donut marzipan gummi bears cotton candy cotton candy jelly-o carrot cake.")
      }      


    return (
        <>
            <ContentHeader title='Dashboard' subtitle='' />
            <Content>
                <Row>
                    <button onClick={triggerSuccess}>Trigger Success</button>
                    <button onClick={triggerError}>Trigger Error</button>
                    <button onClick={triggerInfo}>Trigger Info</button>
                    <button onClick={triggerWarn}>Trigger Warn</button>                    
                </Row>
            </Content>
        </>
    )
}