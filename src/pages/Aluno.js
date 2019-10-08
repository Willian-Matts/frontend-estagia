import React from 'react';
import './css/Aluno.css';
import { Jumbotron, Container, Navbar, } from 'react-bootstrap';

export default function Aluno() {
    return (
        <Jumbotron className="container-lista">
            <Container className="box-lista shadow">
                <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                    <h1>Lista de Alunos</h1>
                </Navbar>
            </Container>
        </Jumbotron>
    );
}