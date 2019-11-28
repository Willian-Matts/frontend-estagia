import React, { Component } from 'react';
import './css/Lista.css';
import axios from 'axios';
import { Row, Button, Jumbotron, Card, Accordion, Container, ListGroup, Navbar, Col, Form, } from 'react-bootstrap';
const APIestagioListar = 'http://localhost:3001/estagios';
const APIestagioUpdate = 'http://localhost:3001/editarEstagio/';
const APIestagioDelete = 'http://localhost:3001/deleteEstagio/';
const APIalunoListar = 'http://localhost:3001/alunos';
const APIempresaListar = 'http://localhost:3001/empresas';
const APIsupervisorListar = 'http://localhost:3001/supervisores';
const APIbusca = 'http://localhost:3001/buscarEstagio';

export default class Estagio extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
            datas: [],
            alunos: [],
            empresas: [],
            supervisores: [],
            order: "nome_aluno"
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

    async listar(index) {
        var dados;
        if (this.refs.empresa.value !== "" || this.refs.inicio.value !== "" || this.refs.final.value !== "") {

            const objeto = {
                nome_empresa: document.getElementById("empresa").value,
                data_inicio: document.getElementById("inicio").value,
                data_final: document.getElementById("final").value,
                ordem: this.state.order
            }
            dados = await axios.post(APIbusca, objeto);

        } else {
            dados = await axios.get(APIestagioListar);
        }
        var { data: datas } = dados;
        const { data: alunos } = await axios.get(APIalunoListar);
        const { data: empresas } = await axios.get(APIempresaListar);
        const { data: supervisores } = await axios.get(APIsupervisorListar);
        if (this._isMounted) {
            return this.setState({
                datas: datas,
                alunos: alunos,
                empresas: empresas,
                supervisores: supervisores
            });
        }
    }

    cadastrar = (event) => {
        event.preventDefault();

        const obj = {
            setor_estagio: this.refs.setor.value,
            horas_semanais_estagio: this.refs.semanais.value,
            horas_totais_estagio: this.refs.totais.value,
            horas_diarias_estagio: this.refs.diarias.value,
            data_inicio_estagio: this.refs.data_inicio.value,
            data_final_estagio: this.refs.data_final.value,
            aluno_estagio: this.state.idaluno,
            empresa_estagio: this.state.idempresa,
            supervisor_estagio: this.state.idsupervisor
        };

        if (obj.setor_estagio === "" || obj.horas_semanais_estagio === "" || obj.horas_totais_estagio === "" || obj.horas_diarias_estagio === "" || obj.data_inicio_estagio === "" || obj.data_final_estagio === "" || obj.aluno_estagio === "" || obj.empresa_estagio === "" || obj.supervisor_estagio === "") {
            alert("Campo(s) não preenchidos!");
        } else {

            axios.put(APIestagioUpdate + this.state.index, obj);
            this.refs.form.reset();
            this.componentDidUpdate();
        }
    }

    remover = (event, aluno) => {
        event.preventDefault();
        axios.delete(APIestagioDelete + aluno);

        this.refs.form.reset();
        this.componentDidUpdate();
    }

    editar = (event, aluno, i) => {
        event.preventDefault();

        let data = this.state.datas[i];
        this.refs.setor.value = data.setor_estagio;
        this.refs.semanais.value = data.horas_semanais_estagio;
        this.refs.totais.value = data.horas_totais_estagio;
        this.refs.diarias.value = data.horas_diarias_estagio;
        console.log(this.refs.empresa.value);

        this.refs.setor.focus();

        this.setState({
            index: aluno,
        });
        this.setState({

        });

    }

    dateFormat(date) {
        let format = date.replace(/T/, " ").split(" ");
        let d = format[0].split("-").reverse().join("-");
        return d;
    }

    render() {
        let datas = this.state.datas;
        let alunos = this.state.alunos;
        let empresas = this.state.empresas;
        let supervisores = this.state.supervisores;
        return (
            <Jumbotron className="container-lista">
                <Container className="box-nav">
                    <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                        <h1>Lista de Estagios</h1>
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
                                        <Form.Label><p className="p-form">Setor de Estágio</p></Form.Label>
                                        <Form.Control type="text" name="setor" ref="setor" placeholder="Setor de estágio" required="required" maxLength="100"></Form.Control>
                                    </Form.Group>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label><p className="p-form">Horas diárias </p></Form.Label>
                                            <Form.Control type="number" name="diarias" ref="diarias" placeholder="Horas feitas diariamente" required="required"></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label><p className="p-form">Horas semanais </p></Form.Label>
                                            <Form.Control type="number" name="semanais" ref="semanais" placeholder="Horas feitas semanalmente" required="required"></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label><p className="p-form">Horas totais </p></Form.Label>
                                            <Form.Control type="number" name="totais" ref="totais" placeholder="Horas totais" required="required"></Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label><p className="p-form">Data de inicio</p></Form.Label>
                                            <Form.Control type="Date" name="data_inicio" ref="data_inicio" required="required"></Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label><p className="p-form">Data de finalização</p></Form.Label>
                                            <Form.Control type="Date" name="data_final" ref="data_final" required="required"></Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label>Aluno</Form.Label>
                                            <Form.Control as="select" multiple>
                                                {alunos.map((aluno, i) =>
                                                    <option key={i} ref="nome_aluno" onClick={(e) => this.setState({ idaluno: aluno.idaluno })}>{aluno.nome_aluno}</option>
                                                )}
                                            </Form.Control>
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
                                    <Form.Row>
                                        <Col>
                                            <Form.Label>Supervisores</Form.Label>
                                            <Form.Control as="select" multiple>
                                                {supervisores.map((supervisor, i) =>
                                                    <option key={i} ref="nome_supervisor" onClick={(e) => this.setState({ idsupervisor: supervisor.idsupervisor })}>{supervisor.nome_supervisor}</option>
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
                    <Container>
                        <Form ref="form">
                            <Form.Row>
                                <Col>
                                    <Form.Label><p className="p-form">Nome da empresa </p></Form.Label>
                                    <Form.Control type="text" id="empresa" ref="empresa" placeholder="Nome da empresa" required="required"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Data de inicio do estágio</p></Form.Label>
                                    <Form.Control type="date" id="inicio" ref="inicio" placeholder="Data de inicio do estágio" required="required"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Data de conclusão do estágio</p></Form.Label>
                                    <Form.Control type="date" id="final" ref="final" placeholder="Data de conclusão do estágio" required="required"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><p className="p-form">Ordenar por</p></Form.Label>
                                    <Form.Control as="select" id="selectOrder" onChange={(e) => this.setState({ order: document.getElementById("selectOrder").value })}>
                                        <option value="nome_aluno">Aluno</option>
                                        <option value="nome_empresa">Empresa</option>
                                        <option value="data_inicio_estagio">Data início</option>
                                        {/* <option ref="itemEmpresa" value="nome_empresa" onChange={(e) => this.setState({ order: "nome_empresa"})}>Empresa</option> */}
                                        {/* <option ref="itemData" value="data_inicio_estagio" onClick={(e) => this.setState({ order: "data_inicio_estagio"})}>Data início</option> */}
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Container>
                    <Jumbotron className="jumbo">
                        <pre>
                            {datas.map((data, i) =>
                                <ListGroup key={i}>
                                    <ListGroup.Item className="card">
                                        <Accordion defaultActiveKey="1">
                                            <Card >
                                                <Card.Header className="card-head sombra" >
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                        <h5 className="h5-form">{data.nome_aluno}</h5>
                                                    </Accordion.Toggle>
                                                    <h5 className="h5-form">{data.nome_empresa}</h5>
                                                </Card.Header>

                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body >
                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Setor de estágio: ${data.setor_estagio}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Data de inicio: ${this.dateFormat(data.data_inicio_estagio)}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Data de final: ${this.dateFormat(data.data_final_estagio)}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Horas diárias: ${data.horas_diarias_estagio}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Horas semanais: ${data.horas_semanais_estagio}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Horas totais: ${data.horas_totais_estagio}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item className="box-card">
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Aluno: ${data.nome_aluno}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Empresa: ${data.nome_empresa}`}</p>
                                                                    </Col>

                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`Supervisor: ${data.nome_supervisor}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container className="text-center">
                                                            <ListGroup.Item>
                                                                <Button id="btnRemover" variant="btn btn-danger-list" onClick={(e) => this.remover(e, data.idestagio)}>Remover</ Button>
                                                                <Button variant="btn btn-list" onClick={(e) => this.editar(e, data.idestagio, i)}>Editar</ Button>
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