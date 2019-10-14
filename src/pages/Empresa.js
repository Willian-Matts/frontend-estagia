import React, { Component } from 'react';
import './css/Lista.css';
import axios from 'axios';
import { Row, Button, Jumbotron, Card, Accordion, Container, ListGroup, Navbar, Col, Form, } from 'react-bootstrap';
const APIempresaListar = 'http://localhost:3001/empresas';
const APIempresaUpdate = 'http://localhost:3001/editarEmpresa/';
const APIempresaDelete = 'http://localhost:3001/deleteEmpresa/';

export default class Empresa extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
            datas: []
        }
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
        const { data: datas } = await axios.get(APIempresaListar);
        if (this._isMounted) {
            return this.setState({
                datas: datas
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
        };

        if (obj.nome_empresa === "" || obj.CNPJ === "" || obj.endereco_empresa === "" || obj.bairro_empresa === "" || obj.email_empresa === "" || obj.telefone_empresa === "") {
            alert("Campo(s) não preenchidos!");
        } else {

            axios.put(APIempresaUpdate + this.state.index, obj);
            this.refs.form.reset();
            this.componentDidUpdate();
        }
    }

    remover = (event, id) => {
        event.preventDefault();
        axios.delete(APIempresaDelete + id);

        this.refs.form.reset();
        this.componentDidUpdate();
    }

    editar = (event, id, i) => {
        event.preventDefault();

        let data = this.state.datas[i];
        this.refs.nome.value = data.nome_empresa;
        this.refs.CNPJ.value = data.CNPJ;
        this.refs.endereco.value = data.endereco_empresa;
        this.refs.bairro.value = data.bairro_empresa;
        this.refs.email.value = data.email_empresa;
        this.refs.telefone.value = data.telefone_empresa;

        this.refs.nome.focus();

        this.setState({
            index: id,
        });

    }

    render() {
        let datas = this.state.datas;
        return (
            <Jumbotron className="container-lista">
                <Container className="box-nav">
                    <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                        <h1>Lista de Empresas</h1>
                    </Navbar>
                </Container>
                <Container className="box-lista shadow">
                    <Accordion defaultActiveKey="1">

                        <Container align="Right">
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <p id="linkCadastro" className="border-link">Formulario de edição</p>
                            </Accordion.Toggle>
                        </Container>

                        <Accordion.Collapse eventKey="0">
                            <Container>
                                <Form ref="form">
                                    <Form.Group>
                                        <Form.Label><p className="p-form">Nome</p></Form.Label>
                                        <Form.Control type="text" name="nome" ref="nome" placeholder="Nome da empresa" required="required"></Form.Control>

                                        <Form.Label><p className="p-form">E-mail</p></Form.Label>
                                        <Form.Control type="email" name="email" ref="email" placeholder="exemplo@exemplo.com" required="required"></Form.Control>
                                    </Form.Group>

                                    <Form.Row>
                                        <Col>
                                            <Form.Label><p className="p-form">CNPJ</p></Form.Label>
                                            <Form.Control type="text" name="CNPJ" ref="CNPJ" placeholder="00.000.000/0000-00" required="required"></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label><p className="p-form">Endereço</p></Form.Label>
                                            <Form.Control type="text" name="endereco" ref="endereco" placeholder="Endereço da empresa" required="required"></Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label><p className="p-form">Telefone</p></Form.Label>
                                            <Form.Control type="text" name="telefone" ref="telefone" placeholder="Telefone da empresa" required="required"></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label><p className="p-form">Bairro</p></Form.Label>
                                            <Form.Control type="text" name="bairro" ref="bairro" placeholder="Bairro da empresa" required="required"></Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Container className="text-center">
                                        <Button variant="btn btn-estagia" onClick={(e) => this.cadastrar(e)}>Salvar</ Button>
                                    </Container>
                                </Form>
                            </Container>
                        </Accordion.Collapse>
                    </Accordion>
                    <Jumbotron className="jumbo">
                        <pre>
                            {datas.map((data, i) =>
                                <ListGroup key={data.idempresa}>
                                    <ListGroup.Item className="card">
                                        <Accordion defaultActiveKey="1">
                                            <Card >

                                                <Card.Header className="card-head sombra" >
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                        <h5 className="h5-form">{data.nome_empresa}</h5>
                                                    </Accordion.Toggle>
                                                </Card.Header>

                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body >
                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`CNPJ: ${data.CNPJ}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Cidade: ${data.nome_cidade}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Telefone: ${data.telefone_empresa}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Endereço: ${data.endereco_empresa}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Bairro: ${data.bairro_empresa}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`E-mail: ${data.email_empresa}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container className="text-center">
                                                            <ListGroup.Item>
                                                                <Button id="btnRemover" variant="btn btn-danger-list" onClick={(e) => this.remover(e, data.idempresa)}>Remover</ Button>
                                                                <Button variant="btn btn-list" onClick={(e) => this.editar(e, data.idempresa, i)}>Editar</ Button>
                                                            </ListGroup.Item>
                                                        </Container>

                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </ListGroup.Item>
                                </ListGroup>
                            )}
                        </pre>
                    </Jumbotron>
                </Container>
            </Jumbotron>
        );
    }
}