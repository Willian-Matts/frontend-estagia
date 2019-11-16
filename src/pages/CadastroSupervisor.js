import React, { Component } from 'react';
import axios from 'axios';
import { cpf, telefone } from './mask';
import { Button, Jumbotron, Container, Navbar, Col, Form, } from 'react-bootstrap';
const APIsupervisorInserir = 'http://localhost:3001/inserirsupervisor';
const APIempresaListar = 'http://localhost:3001/empresas';

export default class Cadastrosupervisor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
            empresas: [],
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
        const { data: empresas } = await axios.get(APIempresaListar);
        if (this._isMounted) {
            return this.setState({
                empresas: empresas
            });
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
            empresa_supervisor: this.state.idempresa
        };

        if (obj.nome_supervisor === "" || obj.CPF_supervisor === "" || obj.email_supervisor === "" || obj.telefone_supervisor === "" || obj.formacao_supervisor === "" || obj.data_nascimento_supervisor === "" || obj.empresa_supervisor === "") {
            alert("Campo(s) não preenchidos!");
        } else if (obj.CPF_supervisor.split("").length < 14) {
            alert("O CPF está inválido!");

        } else if (obj.telefone_supervisor.split("").length < 13) {
            alert("Número de Telefone inválido!");

        } else {

            axios.post(APIsupervisorInserir, obj);

            this.refs.form.reset();
            this.refs.nome.focus();
        }
    }

    render() {
        let empresas = this.state.empresas;
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
                                <Form.Control type="text" name="nome" ref="nome" placeholder="Nome do supervisor" required="required" maxLength="200"></Form.Control>

                                <Form.Label><p className="p-form">E-mail</p></Form.Label>
                                <Form.Control type="email" name="email" ref="email" placeholder="exemplo@exemplo.com" required="required" maxLength="200"></Form.Control>
                            </Form.Group>

                            <Form.Row>
                                <Col>
                                    <Form.Label><p className="p-form">CPF</p></Form.Label>
                                    <Form.Control type="text" name="CPF" ref="CPF" onChange={this.changeCpf} placeholder="000.000.000-00" required="required"  maxLength='14'></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Data de nascimento</p></Form.Label>
                                    <Form.Control type="Date" name="dataNasc" ref="dataNasc" required="required"></Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label><p className="p-form">Telefone</p></Form.Label>
                                    <Form.Control type="text" name="telefone" ref="telefone" onChange={this.changeTelefone} placeholder="Telefone do supervisor" required="required" maxLength="15"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Formação</p></Form.Label>
                                    <Form.Control type="text" name="formacao" ref="formacao" placeholder="Formação do supervisor" required="required" maxLength="100"></Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Empresas</Form.Label>
                                    <Form.Control as="select" multiple>
                                        {empresas.map((empresa, i) =>
                                            <option key={i} ref="nome_empresa" onClick={(e) => this.setState({ idempresa: empresa.idempresa })}>{empresa.nome_empresa}</option>
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