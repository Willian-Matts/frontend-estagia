import React, { useState } from 'react';
import './css/Login.css';
import logoNome from '../imagens/logoNomeB.png';
import { Button, Jumbotron, Container, Form, Navbar } from 'react-bootstrap';

export default function Login({ history }) {
    const [userEmail, setUserEmail] = useState('');
    const [userSenha, setUserSenha] = useState('');

    function hadleSubmit(e) {
        e.preventDefault();

        console.log(userEmail, "", userSenha);

        history.push('/main');
    }

    return (
        <Jumbotron className="container-login">
            <Container className="box-login shadow">
                <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                    <img id="logo" src={logoNome} alt="Estagía"></img>
                </Navbar>
                <Form onSubmit={hadleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label className="label-login">E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Insira seu e-mail" value={userEmail} onChange={e => setUserEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formSenha">
                        <Form.Label className="label-login">Senha</Form.Label>
                        <Form.Control type="password" placeholder="Insira sua senha" value={userSenha} onChange={e => setUserSenha(e.target.value)} required/>
                        <Button type="submit" variant="btn btn-estagia">Login</ Button>
                    </Form.Group>
                </Form>
            </Container>
        </Jumbotron>
    );
}