import React, { Component } from 'react';
import axios from 'axios';
import { cpf, telefone } from './mask';
import { Button, Jumbotron, Container, Navbar, Col, Form, } from 'react-bootstrap';
const APIalunoInserir = 'http://localhost:3001/inserirAluno';
const APIcidadeListar = 'http://localhost:3001/cidades';

export default class CadastroAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
            cidades: [],
            maskcpf: '',
            masktelefone: ''
        }
        this.changeCpf = this.changeCpf.bind(this);
        this.changeTelefone = this.changeTelefone.bind(this);

    }

    async changeCpf(e) {
        await this.setState({ maskcpf: cpf(e.target.value) })
        console.log(this.state.maskcpf);
        this.refs.CPF.value = this.state.maskcpf;

    }

    async changeTelefone(e) {
        await this.setState({ masktelefone: telefone(e.target.value) })
        this.refs.telefone.value = this.state.masktelefone;

    }

    async componentDidMount() {
        this._isMounted = true;
        this.listar();
    }

    async componentDidUpdate() {
        this.listar();
    }
    async componentWillUnmount() {
        this._isMounted = false;
    }

    async listar() {
        const { data: cidades } = await axios.get(APIcidadeListar);
        if (this._isMounted) {
            return this.setState({
                cidades: cidades
            });
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
            matricula_aluno: this.refs.matricula.value,
            cidade_aluno: this.state.idcidade
        };

        if (obj.nome_aluno === "" || obj.CPF_aluno === "" || obj.periodo_aluno === "" || obj.data_nascimento_aluno === "" || obj.endereco_aluno === "" || obj.nome_orientador_aluno === "" || obj.email_aluno === "" || obj.telefone_aluno === "" || obj.matricula_aluno === "" || obj.cidade_aluno === "") {
            alert("Campo(s) não preenchidos!");

        } else if (obj.CPF_aluno.split("").length < 14) {
            alert("O CPF está inválido!");

        } else if (obj.telefone_aluno.split("").length < 13) {
            alert("Número de Telefone inválido!");

        } else {

            axios.post(APIalunoInserir, obj);

            this.refs.form.reset();
            this.refs.nome.focus();
        }
    }

    render() {
        let cidades = this.state.cidades;
        return (
            <Jumbotron className="container-lista">
                <Container className="box-nav">
                    <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                        <h1>Cadastro de Aluno</h1>
                    </Navbar>
                </Container>
                <Container className="box-lista shadow">
                    <Container>
                        <Form ref="form">
                            <Form.Group>
                                <Form.Label><p className="p-form">Nome</p></Form.Label>
                                <Form.Control type="text" name="nome" ref="nome" placeholder="Nome do aluno" required="required" maxLength="200"></Form.Control>

                                <Form.Label><p className="p-form">E-mail</p></Form.Label>
                                <Form.Control type="email" name="email" ref="email" placeholder="exemplo@exemplo.com" required="required" maxLength="200"></Form.Control>

                                <Form.Label><p className="p-form">Orientador</p></Form.Label>
                                <Form.Control type="text" name="orientador" ref="orientador" placeholder="Nome do orientador do aluno" required="required" maxLength="200"></Form.Control>

                                <Form.Label><p className="p-form">Matricula</p></Form.Label>
                                <Form.Control type="text" name="matricula" ref="matricula" placeholder="Matricula do aluno" required="required" maxLength="20"></Form.Control>
                            </Form.Group>

                            <Form.Row>
                                <Col>
                                    <Form.Label><p className="p-form">CPF</p></Form.Label>
                                    <Form.Control type="text" name="CPF" ref="CPF" onChange={this.changeCpf} placeholder="000.000.000-00" required="required" maxLength='14' ></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Periodo</p></Form.Label>
                                    <Form.Control type="number" name="periodo" ref="periodo" placeholder="Periodo do aluno" required="required" maxLength='11' ></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Data de nascimento</p></Form.Label>
                                    <Form.Control type="Date" name="dataNasc" ref="dataNasc" required="required"></Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label><p className="p-form">Endereço</p></Form.Label>
                                    <Form.Control type="text" name="endereco" ref="endereco" placeholder="Endereço do aluno" required="required" maxLength='200' ></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Telefone</p></Form.Label>
                                    <Form.Control type="text" name="telefone" ref="telefone" onChange={this.changeTelefone} placeholder="telefone do aluno" required="required" maxLength="15"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Bairro</p></Form.Label>
                                    <Form.Control type="text" name="bairro" ref="bairro" placeholder="Bairro do aluno" required="required" maxLength="50"></Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Cidades</Form.Label>
                                    <Form.Control as="select" multiple>
                                        {cidades.map((cidade, i) =>
                                            <option key={i} ref="nome_cidade" onClick={(e) => this.setState({ idcidade: cidade.idcidade })}>{cidade.nome_cidade}</option>
                                        )}
                                    </Form.Control>
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