import React, { Component} from 'react';
import './css/Aluno.css';
import axios from 'axios';
import { Row, Button, Jumbotron, Card, Accordion, Container, ListGroup, Navbar,  Col } from 'react-bootstrap';
const APIalunoListar = 'http://localhost:3001/alunos';

export default class Aluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
            datas: []
        }
    }

    async componentDidMount() {
        const { data: datas } = await axios.get(APIalunoListar);
        return this.setState({ datas });
    }

    dateFormat(date) {
        let format = date.replace(/T/, " ").split(" ");
        let d = format[0].split("-").reverse().join("-");
        d += " " + format[1];
        return d;
    }

    render() {
        let datas = this.state.datas;
        return (
            <Jumbotron className="container-lista">
                <Container className="box-lista shadow">
                    <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                        <h1>Lista de Alunos</h1>
                    </Navbar>
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
                                                </Card.Header>

                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body >
                                                        <Container>
                                                            <ListGroup.Item>
                                                                <Row>
                                                                    <Col xs={4} className="coluna">
                                                                        <p className="p-lista">{`CPF: ${data.CPF_aluno}`}</p>
                                                                    </Col>

                                                                    {/* <Col xs={2} className="coluna">
                                                                        <p className="p-lista">{`RG: ${data.RG_aluno}`}</p>
                                                                    </Col> */}

                                                                    <Col className="coluna">
                                                                        <p className="p-lista">{`Data de nascimento: ${this.dateFormat(data.data_nascimento_aluno)}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item>
                                                                <Row>
                                                                    <Col className="coluna">
                                                                        <p className="p-lista">{`Endereço: ${data.endereco_aluno}`}</p>
                                                                    </Col>
                                                                    {/* 
                                                                    <Col className="coluna">
                                                                        <p className="p-lista">{`Cidade: ${data.nome_cidade}`}</p>
                                                                    </Col> */}

                                                                    <Col className="coluna">
                                                                        <p className="p-lista">{`Bairro: ${data.bairro_aluno}`}</p>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        </Container>

                                                        <Container>
                                                            <ListGroup.Item>
                                                                <Row>
                                                                    <Col className="coluna">
                                                                        <p className="p-lista">{`E-mail: ${data.email_aluno}`}</p>
                                                                    </Col>

                                                                    <Col className="coluna">
                                                                        <p className="p-lista">{`Telefone: ${data.telefone_aluno}`}</p>
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