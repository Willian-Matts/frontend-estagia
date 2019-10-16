import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron, Container, Navbar, Col, Form, } from 'react-bootstrap';
const APIestagioInserir = 'http://localhost:3001/inserirEstagio';
const APIalunoListar = 'http://localhost:3001/alunos';
const APIempresaListar = 'http://localhost:3001/empresas';
const APIsupervisorListar = 'http://localhost:3001/supervisores';

export default class CadastroEstagio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
            alunos: [],
            empresas: [],
            supervisores: []
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
        const { data: alunos } = await axios.get(APIalunoListar);
        const { data: empresas} = await axios.get(APIempresaListar);
        const { data: supervisores} = await axios.get(APIsupervisorListar);
        if (this._isMounted) {
            return this.setState({
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

            axios.post(APIestagioInserir, obj);

            this.refs.form.reset();
            this.refs.setor.focus();
        }
    }

    render() {
        let alunos = this.state.alunos;
        let empresas = this.state.empresas;
        let supervisores = this.state.supervisores;
        return (
            <Jumbotron className="container-lista">
                <Container className="box-nav">
                    <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                        <h1>Cadastro de Estágio</h1>
                    </Navbar>
                </Container>
                <Container className="box-lista shadow">
                    <Container>
                    <Form ref="form">
                                    <Form.Group>
                                        <Form.Label><p className="p-form">Setor de Estágio</p></Form.Label>
                                        <Form.Control type="text" name="setor" ref="setor" placeholder="Setor de estágio" required="required"></Form.Control>
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
                                                    <option key={i} ref="nome_aluno" onClick={(e) => this.setState({ idaluno: aluno.idaluno})}>{aluno.nome_aluno}</option>
                                                )}
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label>Empresas</Form.Label>
                                            <Form.Control as="select" multiple>
                                                {empresas.map((empresa, i) =>
                                                    <option key={i} ref="nome_empresa" onClick={(e) => this.setState({ idempresa: empresa.idempresa})}>{empresa.nome_empresa}</option>
                                                )}
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label>Supervisores</Form.Label>
                                            <Form.Control as="select" multiple>
                                                {supervisores.map((supervisor, i) =>
                                                    <option key={i} ref="nome_supervisor" onClick={(e) => this.setState({ idsupervisor: supervisor.idsupervisor})}>{supervisor.nome_supervisor}</option>
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