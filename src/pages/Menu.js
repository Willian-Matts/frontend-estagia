import React from 'react';
import './css/Menu.css';
import logoBranca from '../imagens/logoNomeB.png';
import { Accordion, Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Menu() {

    return (
        <Container className="box-menu">
            <Navbar bgh="ligth" expand="lg" className="barra-menu shadow">
                <img id="logo1" src={logoBranca} alt="Logo Estagía" />

                <Accordion defaultActiveKey="1">
                    <Accordion.Toggle className="button-accordion" as={Button} variant="button" eventKey="0">
                        <h4>LISTAS</h4>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <Link to="/main/alunos">
                            <Button className="button-menu"><h4>Alunos</h4></Button>
                        </Link>
                    </Accordion.Collapse>
                </Accordion>

                <Accordion defaultActiveKey="1">
                    <Accordion.Toggle className="button-accordion" as={Button} variant="button" eventKey="0">
                        <h4>CADASTROS</h4>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">

                        <Link to="/main/cadastro">
                            <Button className="button-menu"><h4>Cadastro</h4></Button>
                        </Link>
                    </Accordion.Collapse>
                </Accordion>

            </Navbar>
        </Container>
    );
}