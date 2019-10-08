import React, { useState } from 'react';
import './css/Menu.css';
import logoBranca from '../imagens/logoNome.png';
import { Button, Jumbotron, Container, Form, Navbar } from 'react-bootstrap';
import { Link} from 'react-router-dom'
// import Aluno from './Aluno';

export default function Menu({ history }) {
    const [rota, setRota] = useState('');

    function handle(e) {
        e.preventDefault();

        history.push('/Main/Aluno');
    }

    return (
        <Container className="box-menu">
            <Navbar bgh="ligth" expand="lg" className="barra-menu shadow">
                <img src={logoBranca} alt="Logo Estagía" />
                <Link to="/main/aluno">
                    <li>Aluno</li>
                </Link>
                <Button className="button-menu">Alunos</Button>
                <Button className="button-menu">Cadastro</Button>

            </Navbar>
        </Container>
    );
}