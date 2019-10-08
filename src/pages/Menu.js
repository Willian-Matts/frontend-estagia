import React, { useState } from 'react';
import './css/Menu.css';
import logoBranca from '../imagens/logoNomeB.png';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Menu() {

    return (
        <Container className="box-menu">
            <Navbar bgh="ligth" expand="lg" className="barra-menu shadow">
                <img src={logoBranca} alt="Logo Estagía" />
                <Link className="button-link" to="/main/alunos">
                    <Button className="button-menu"><h4>Alunos</h4></Button>
                </Link>
                <Link className="button-link" to="/main/cadastro">
                    <Button className="button-menu"><h4>Cadastro</h4></Button>
                </Link>
            </Navbar>
        </Container>
    );
}