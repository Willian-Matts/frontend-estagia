import React, { Component } from 'react';
import axios from 'axios';
import { cnpj, telefone } from './mask';
import { Button, Jumbotron, Container, Navbar, Col, Form, } from 'react-bootstrap';
const APIempresaInserir = 'http://localhost:3001/inserirEmpresa';
const APIcidadeListar = 'http://localhost:3001/cidades';

export default class CadastroEmpresa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
            cidades: [],
            maskcnpj: "",
            masktelefone: ''
        }

        this.changeCnpj = this.changeCnpj.bind(this);
        this.changeTelefone = this.changeTelefone.bind(this);
    }

    async changeCnpj(e) {
        await this.setState({ maskcnpj: cnpj(e.target.value) })
        this.refs.CNPJ.value = this.state.maskcnpj;
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
            nome_empresa: this.refs.nome.value,
            CNPJ: this.refs.CNPJ.value,
            endereco_empresa: this.refs.endereco.value,
            bairro_empresa: this.refs.bairro.value,
            email_empresa: this.refs.email.value,
            telefone_empresa: this.refs.telefone.value,
            cidade_empresa: this.state.idcidade
        };

        if (obj.nome_empresa === "" || obj.CNPJ === "" || obj.endereco_empresa === "" || obj.bairro_empresa === "" || obj.email_empresa === "" || obj.telefone_empresa === "" || obj.cidade_empresa === "") {
            alert("Campo(s) não preenchidos!");
        } else if (obj.CNPJ.split("").length < 18) {
            alert("O CNPJ está inválido!");

        } else if (obj.telefone_empresa.split("").length < 13) {
            alert("Número de Telefone inválido!");

        } else {

            axios.post(APIempresaInserir, obj);

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
                        <h1>Cadastro de Empresa</h1>
                    </Navbar>
                </Container>
                <Container className="box-lista shadow">
                    <Container>
                        <Form ref="form">
                            <Form.Group>
                                <Form.Label><p className="p-form">Nome</p></Form.Label>
                                <Form.Control type="text" name="nome" ref="nome" placeholder="Nome da empresa" required="required" maxLength="200"></Form.Control>

                                <Form.Label><p className="p-form">E-mail</p></Form.Label>
                                <Form.Control type="email" name="email" ref="email" placeholder="exemplo@exemplo.com" required="required" maxLength="100"></Form.Control>
                            </Form.Group>

                            <Form.Row>
                                <Col>
                                    <Form.Label><p className="p-form">CNPJ</p></Form.Label>
                                    <Form.Control type="text" name="CNPJ" ref="CNPJ" onChange={this.changeCnpj} placeholder="00.000.000/0000-00" required="required" maxLength="18"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Endereço</p></Form.Label>
                                    <Form.Control type="text" name="endereco" ref="endereco" placeholder="Endereço da empresa" required="required" maxLength="200"></Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label><p className="p-form">Telefone</p></Form.Label>
                                    <Form.Control type="text" name="telefone" ref="telefone" onChange={this.changeTelefone} placeholder="Telefone da empresa" required="required" maxLength="15" ></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Bairro</p></Form.Label>
                                    <Form.Control type="text" name="bairro" ref="bairro" placeholder="Bairro da empresa" required="required" maxLength="50"></Form.Control>
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