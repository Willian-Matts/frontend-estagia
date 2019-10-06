import React from 'react';
import './Login.css';
import logoNome from '../imagens/logoNome.png';
import { Row, Button, Jumbotron, Card, Accordion, Container, ListGroup, Form, Navbar, Nav, FormControl, Col, InputGroup } from 'react-bootstrap';

export default function Login() {
    return (
        <Jumbotron className="container-login">
            <Container className="box-login shadow">
                <Navbar bgh="ligth" expand="lg" className="barra-login shadow">
                    <img src={logoNome} alt="Estagía">
                    </img>
                </Navbar>
                <Form>
                    <Form.Group controlId="form-login">
                        <Form.Label className="label-login">E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Insira seu e-mail" />
                        <Form.Label className="label-login">Senha</Form.Label>
                        <Form.Control type="text" placeholder="Insira sua senha" />
                        <Button variant="btn btn-estagia">Login</ Button>
                    </Form.Group>
                </Form>
            </Container>
        </Jumbotron>
    );
}