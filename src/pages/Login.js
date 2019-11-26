import React, { useState } from 'react';
import axios from 'axios';
import './css/Login.css';
import logoNome from '../imagens/logoNomeB.png';
import { Button, Jumbotron, Container, Form, Navbar } from 'react-bootstrap';
const APIfuncionarioLogin = 'http://localhost:3001/funcionario';
const APIlogin = 'http://localhost:3001/login';

export default function Login({ history }) {
    const [userEmail, setUserEmail] = useState('');
    const [userSenha, setUserSenha] = useState('');


    async function hadleSubmit(e) {
        e.preventDefault();

        const obj = {
            login: userEmail,
            senha: userSenha,
        };

        if (obj.login === "" || obj.senha === "") {
            alert("Campo(s) não preenchidos!");
        } else {
            const { data: datas } = await axios.post(APIfuncionarioLogin, obj);
            if (datas[0] === undefined) {
                alert("Senha ou login incorretos!");
            } else {
                if (obj.login === datas[0].email_funcionario) {
                    if (obj.senha === datas[0].senha_funcionario) {

                        const valido = await axios.post(APIlogin, obj);
                        console.log(valido);
                        if(valido.data  === true){
                            history.push('/main/alunos');
                        }
                    }
                }
            }
        }
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
                        <Form.Control type="email" placeholder="Insira seu e-mail" value={userEmail} onChange={e => setUserEmail(e.target.value)} required maxLength="100" />
                    </Form.Group>
                    <Form.Group controlId="formSenha">
                        <Form.Label className="label-login">Senha</Form.Label>
                        <Form.Control type="password" placeholder="Insira sua senha" value={userSenha} onChange={e => setUserSenha(e.target.value)} required maxLength="100" />
                        <Button type="submit" variant="btn btn-estagia">Login</ Button>
                    </Form.Group>
                </Form>
            </Container>
        </Jumbotron>
    );
}