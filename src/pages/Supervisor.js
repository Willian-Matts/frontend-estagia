import React, { Component } from 'react';
import './css/Lista.css';
import axios from 'axios';
import { Row, Button, Jumbotron, Card, Accordion, Container, ListGroup, Navbar, Col, Form, } from 'react-bootstrap';
const APISupervisorListar = 'http://localhost:3001/Supervisores';
const APISupervisorUpdate = 'http://localhost:3001/editarSupervisor/';
const APISupervisorDelete = 'http://localhost:3001/deleteSupervisor/';

export default class Supervisor extends Component {
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
        const { data: datas } = await axios.get(APISupervisorListar);
        if (this._isMounted) {
            return this.setState({
                datas: datas
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
        };

        if (obj.nome_supervisor === "" || obj.CPF_supervisor === "" || obj.email_supervisor === "" || obj.telefone_supervisor === "" || obj.formacao_supervisor === "" || obj.data_nascimento_supervisor === "") {
            alert("Campo(s) não preenchidos!");
        } else {

            axios.put(APISupervisorUpdate + this.state.index, obj);
            this.refs.form.reset();
            this.componentDidUpdate();
        }
    }

    remover = (event, id) => {
        event.preventDefault();
        axios.delete(APISupervisorDelete + id);

        this.refs.form.reset();
        this.componentDidUpdate();
    }

    editar = (event, id, i) => {
        event.preventDefault();

        let data = this.state.datas[i];
        this.refs.nome.value = data.nome_supervisor;
        this.refs.CPF.value = data.CPF_supervisor;
        this.refs.formacao.value = data.formacao_supervisor;
        this.refs.dataNasc.value = data.data_nascimento_supervisor;
        this.refs.email.value = data.email_supervisor;
        this.refs.telefone.value = data.telefone_supervisor;

        this.refs.nome.focus();

        this.setState({
            index: id,
        });

    }

    dateFormat(date) {
        let format = date.replace(/T/, " ").split(" ");
        let d = format[0].split("-").reverse().join("-");
        return d;
    }

    render() {
        let datas = this.state.datas;
        return (
            <Jumbotron className="container-lista">
                <Container className="box-nav">
                    <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                        <h1>Lista de Supervisores</h1>
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
                        </Accordion.Collapse>
                    </Accordion>
                    <Jumbotron className="jumbo">
                        <pre>
                            {datas.map((data, i) =>
                                <ListGroup key={data.idsupervisor}>
                                    <ListGroup.Item className="card">
                                        <Accordion defaultActiveKey="1">
                                            <Card >

                                                <Card.Header className="card-head sombra" >
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                        <h5 className="h5-form">{data.nome_supervisor}</h5>
                                                    </Accordion.Toggle>
                                                </Card.Header>

                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body >
                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`CNPJ: ${data.CPF_supervisor}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Empresa: ${data.nome_empresa}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Telefone: ${data.telefone_supervisor}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Formação: ${data.formacao_supervisor}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Data de nascimento: ${this.dateFormat(data.data_nascimento_supervisor)}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`E-mail: ${data.email_supervisor}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container className="text-center">
                                                            <ListGroup.Item>
                                                                <Button id="btnRemover" variant="btn btn-danger-list" onClick={(e) => this.remover(e, data.idsupervisor)}>Remover</ Button>
                                                                <Button variant="btn btn-list" onClick={(e) => this.editar(e, data.idsupervisor, i)}>Editar</ Button>
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