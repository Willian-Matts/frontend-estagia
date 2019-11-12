import React, { Component } from 'react';
import './css/Lista.css';
import axios from 'axios';
import { cpf, telefone } from './mask';
import { Row, Button, Jumbotron, Card, Accordion, Container, ListGroup, Navbar, Col, Form, } from 'react-bootstrap';
const APIalunoListar = 'http://localhost:3001/alunos';
const APIalunoUpdate = 'http://localhost:3001/editarAluno/';
const APIalunoDelete = 'http://localhost:3001/deleteAluno/';
const APIcidadeListar = 'http://localhost:3001/cidades';

export default class Aluno extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
            datas: [],
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
        const { data: datas } = await axios.get(APIalunoListar);
        const { data: cidades } = await axios.get(APIcidadeListar);
        if (this._isMounted) {
            return this.setState({
                datas: datas,
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

        if (obj.nome_aluno === "" || obj.CPF_aluno === "" || obj.periodo_aluno === "" || obj.data_nascimento_aluno === "" || obj.endereco_aluno === "" || obj.bairro_aluno === "" || obj.nome_orientador_aluno === "" || obj.email_aluno === "" || obj.telefone_aluno === "" || obj.matricula_aluno === "" || obj.cidade_aluno === "") {
            alert("Campo(s) não preenchidos!");
        } else {

            axios.put(APIalunoUpdate + this.state.index, obj);
            this.refs.form.reset();
            this.componentDidUpdate();
        }
    }

    remover = (event, id) => {
        event.preventDefault();
        axios.delete(APIalunoDelete + id);

        this.refs.form.reset();
        this.componentDidUpdate();
    }

    editar = (event, id, i) => {
        event.preventDefault();

        let data = this.state.datas[i];
        this.refs.nome.value = data.nome_aluno;
        this.refs.CPF.value = data.CPF_aluno;
        this.refs.periodo.value = data.periodo_aluno;
        this.refs.endereco.value = data.endereco_aluno;
        this.refs.bairro.value = data.bairro_aluno;
        this.refs.orientador.value = data.nome_orientador_aluno;
        this.refs.email.value = data.email_aluno;
        this.refs.telefone.value = data.telefone_aluno;
        this.refs.matricula.value = data.matricula_aluno;

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
        let cidades = this.state.cidades;
        return (
            <Jumbotron className="container-lista">
                <Container className="box-nav">
                    <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                        <h1>Lista de Alunos</h1>
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
                                            <Form.Control  type="text" name="CPF" ref="CPF" onChange={this.changeCpf} maxLength='14' placeholder="000.000.000-00" required="required"></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label><p className="p-form">Periodo</p></Form.Label>
                                            <Form.Control type="number" name="periodo" ref="periodo" placeholder="Periodo do aluno" required="required"></Form.Control>
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
                                            <Form.Label><p className="p-form">Bairro</p></Form.Label>
                                            <Form.Control type="text" name="bairro" ref="bairro" placeholder="Bairro do aluno" required="required"></Form.Control>
                                        </Col>

                                        <Col>
                                            <Form.Label><p className="p-form">Telefone</p></Form.Label>
                                            <Form.Control type="text" name="telefone" ref="telefone"  onChange={this.changeTelefone} maxLength="15" placeholder="Telefone do aluno" required="required"></Form.Control>
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
                        </Accordion.Collapse>
                    </Accordion>
                    <Jumbotron className="jumbo">
                        <pre>
                            {datas.map((data, i) =>
                                <ListGroup key={data.idaluno}>
                                    <ListGroup.Item className="card">
                                        <Accordion defaultActiveKey="1">
                                            <Card >

                                                <Card.Header className="card-head sombra" >
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                        <h5 className="h5-form">{data.nome_aluno}</h5>
                                                    </Accordion.Toggle>
                                                    <h5 className="h5-form">{`Período: ${data.periodo_aluno}º`}</h5>
                                                </Card.Header>

                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body >
                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`CPF: ${data.CPF_aluno}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Período: ${data.periodo_aluno}º`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Data de nascimento: ${this.dateFormat(data.data_nascimento_aluno)}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Endereço: ${data.endereco_aluno}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Bairro: ${data.bairro_aluno}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Telefone: ${data.telefone_aluno}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`E-mail: ${data.email_aluno}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Matricula: ${data.matricula_aluno}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Cidade: ${data.nome_cidade}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Orientador: ${data.nome_orientador_aluno}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container className="text-center">
                                                            <ListGroup.Item>
                                                                <Button id="btnRemover" variant="btn btn-danger-list" onClick={(e) => this.remover(e, data.idaluno)}>Remover</ Button>
                                                                <Button variant="btn btn-list" onClick={(e) => this.editar(e, data.idaluno, i)}>Editar</ Button>
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