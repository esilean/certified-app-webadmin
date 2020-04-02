
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { FaUserAlt, FaEnvelope } from 'react-icons/fa'

import { useToasts } from 'react-toast-notifications'

import AuthInput from './components/inputAuth'

import './styles.css'
import consts from '../../consts'
import logoImg from '../../assets/brand/logo.png'

import api from '../../services/api'

export default props => {
    const history = useHistory();
    const { addToast } = useToasts()

    async function handleLogin(values) {

        try {

            //localStorage.removeItem(consts.USER_KEY)
            const response = await api.post('sec/login', values)
            localStorage.setItem(consts.USER_KEY, response.data.token)

            //addToast('Acesso garantido...', { appearance: 'success', autoDismiss: true })
            history.push('/')

        } catch (err) {
            addToast('Usuário e/ou senha incorretos.', { appearance: 'error', autoDismiss: true })
            //console.log(err)
        }
    }

    //form validation control
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur'
    })

    return (
        <div className="logon-container">
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        <CardGroup>
                            <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '100%' }}>
                                <CardBody className="text-center">
                                    <div>
                                        <img src={logoImg} alt='Logo' height='120'></img>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="p-4">
                                <CardBody>
                                    <Form onSubmit={handleSubmit(handleLogin)}>
                                        <h2>CE - Login</h2>
                                        <p className="text-muted"></p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <FaUserAlt />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <AuthInput
                                                register={register({ required: true })}
                                                //value={email}
                                                //onChange={e => setEmail(e.target.value)}
                                                name='email'
                                                type="email"
                                                err={errors.email}
                                                placeholder="Usuário"
                                                autoComplete="username" />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <FaEnvelope />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <AuthInput
                                                register={register({ required: true })}
                                                //value={password}
                                                //onChange={e => setPassword(e.target.value)}
                                                name='password'
                                                type="password"
                                                err={errors.password}
                                                placeholder="Password"
                                                autoComplete="current-password" />
                                        </InputGroup>
                                        <Row>
                                            <Col>
                                                <Button color="primary" className="px-4">Login</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>

                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}