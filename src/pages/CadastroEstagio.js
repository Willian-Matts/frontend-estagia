import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron, Container, Navbar, Col, Form, } from 'react-bootstrap';
const APIempresaInserir = 'http://localhost:3001/inserirEmpresa';

export default class CadastroEstagio extends Component {
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
            nome_aluno: this.refs.nome.value,
            CPF_aluno: this.refs.CPF.value,
            periodo_aluno: this.refs.periodo.value,
            data_nascimento_aluno: this.refs.dataNasc.value,
            endereco_aluno: this.refs.endereco.value,
            bairro_aluno: this.refs.bairro.value,
            nome_orientador_aluno: this.refs.orientador.value,
            email_aluno: this.refs.email.value,
            telefone_aluno: this.refs.telefone.value,
            matricula_aluno: this.refs.matricula.value
        };

        if (obj.nome_aluno === "" || obj.CPF_aluno === "" || obj.periodo_aluno === "" || obj.data_nascimento_aluno === "" || obj.endereco_aluno === "" || obj.nome_orientador_aluno === "" || obj.email_aluno === "" || obj.telefone_aluno === "" || obj.matricula_aluno === "") {
            alert("Campo(s) não preenchidos!");
        } else {

            axios.post(APIempresaInserir, obj);

            this.refs.formAluno.reset();
            this.refs.nome.focus();
        }
    }

    render() {
        return (
            <Jumbotron className="container-lista">
                <Container className="box-nav">
                    <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                        <h1>Cadastro</h1>
                    </Navbar>
                </Container>
                <Container className="box-lista shadow">
                    <Container>
                        <Form ref="formAluno">
                            <Form.Group>
                                <Form.Label><p className="p-form">Nome</p></Form.Label>
                                <Form.Control type="text" name="nome" ref="nome" placeholder="Nome do aluno" required="required"></Form.Control>

                                <Form.Label><p className="p-form">E-mail</p></Form.Label>
                                <Form.Control type="email" name="email" ref="email" placeholder="exemplo@exemplo.com" required="required"></Form.Control>

                                <Form.Label><p className="p-form">Orientador</p></Form.Label>
                                <Form.Control type="text" name="orientador" ref="orientador" placeholder="Nome do orientador do aluno" required="required"></Form.Control>

                                <Form.Label><p className="p-form">Matricula</p></Form.Label>
                                <Form.Control type="text" name="matricula" ref="matricula" placeholder="Matricula do aluno" required="required"></Form.Control>
                            </Form.Group>

                            <Form.Row>
                                <Col>
                                    <Form.Label><p className="p-form">CPF</p></Form.Label>
                                    <Form.Control type="text" name="CPF" ref="CPF" placeholder="000.000.000-00" required="required"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Periodo</p></Form.Label>
                                    <Form.Control type="numeric" name="periodo" ref="periodo" placeholder="Periodo do aluno" required="required"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Data de nascimento</p></Form.Label>
                                    <Form.Control type="Date" name="dataNasc" ref="dataNasc" required="required"></Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label><p className="p-form">Endereço</p></Form.Label>
                                    <Form.Control type="text" name="endereco" ref="endereco" placeholder="Endereço do aluno" required="required"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Telefone</p></Form.Label>
                                    <Form.Control type="text" name="telefone" ref="telefone" placeholder="telefone do aluno" required="required"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Bairro</p></Form.Label>
                                    <Form.Control type="text" name="bairro" ref="bairro" placeholder="Bairro do aluno" required="required"></Form.Control>
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