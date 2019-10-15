import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron, Container, Navbar, Col, Form, } from 'react-bootstrap';
const APIsupervisorInserir = 'http://localhost:3001/inserirsupervisor';

export default class Cadastrosupervisor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
        }
    }

    cadastrar = (event) => {
        event.preventDefault();

        const obj = {
            nome_supervisor: this.refs.nome.value,
            CPF_supervisor: this.refs.CPF.value,
            formacao_supervisor: this.refs.formacao.value,
            data_nascimento_supervisor: this.refs.dataNasc.value,
            email_supervisor: this.refs.email.value,
            telefone_supervisor: this.refs.telefone.value,
        };

        if (obj.nome_supervisor === "" || obj.CPF_supervisor === "" || obj.email_supervisor === "" || obj.telefone_supervisor === "" || obj.formacao_supervisor === "" || obj.data_nascimento_supervisor === "") {
            alert("Campo(s) não preenchidos!");
        } else {

            axios.post(APIsupervisorInserir, obj);

            this.refs.form.reset();
            this.refs.nome.focus();
        }
    }

    render() {
        return (
            <Jumbotron className="container-lista">
                <Container className="box-nav">
                    <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                        <h1>Cadastro de Supervisor</h1>
                    </Navbar>
                </Container>
                <Container className="box-lista shadow">
                <Container>
                                <Form ref="form">
                                    <Form.Group>
                                        <Form.Label><p className="p-form">Nome</p></Form.Label>
                                        <Form.Control type="text" name="nome" ref="nome" placeholder="Nome do supervisor" required="required"></Form.Control>

                                        <Form.Label><p className="p-form">E-mail</p></Form.Label>
                                        <Form.Control type="email" name="email" ref="email" placeholder="exemplo@exemplo.com" required="required"></Form.Control>
                                    </Form.Group>

                                    <Form.Row>
                                        <Col>
                                            <Form.Label><p className="p-form">CPF</p></Form.Label>
                                            <Form.Control type="text" name="CPF" ref="CPF" placeholder="000.000.000-00" required="required"></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label><p className="p-form">Data de nascimento</p></Form.Label>
                                            <Form.Control type="Date" name="dataNasc" ref="dataNasc" required="required"></Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label><p className="p-form">Telefone</p></Form.Label>
                                            <Form.Control type="text" name="telefone" ref="telefone" placeholder="Telefone do supervisor" required="required"></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label><p className="p-form">Formação</p></Form.Label>
                                            <Form.Control type="text" name="formacao" ref="formacao" placeholder="Formação do supervisor" required="required"></Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Container className="text-center">
                                        <Button variant="btn btn-estagia" onClick={(e) => this.cadastrar(e)}>Salvar</ Button>
                                    </Container>
                                </Form>
                            </Container>
                </Container>
            </Jumbotron>
        );
    }
}