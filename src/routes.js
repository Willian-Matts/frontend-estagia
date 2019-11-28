import React from 'react';
// import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from './pages/Login.js';
import Main from './pages/Main.js';
import Aluno from './pages/Aluno.js';
import Empresa from './pages/Empresa.js';
import Supervisor from './pages/Supervisor.js';
import Estagio from './pages/Estagio.js';
import CadastroAluno from './pages/CadastroAluno.js';
import CadastroEmpresa from './pages/CadastroEmpresa.js';
import CadastroSupervisor from './pages/CadastroSupervisor.js';
import CadastroEstagio from './pages/CadastroEstagio.js';
import gerarPDF from './pages/gerarPDF.js';

// import axios from 'axios';
// const APIsession = 'http://localhost:3001/login';
// const auth = axios.post(APIsession);
// const PrivateRoute = ({ component: Component, ...rest }, auth) => (
//     <Route
//         {...rest}
//         render={props =>
//             (auth) ? (
//                 <Component {...props} />
//             ) : (
//                     <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//                 )
//         }
//     />
// );


export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/main" component={Main} />

            <Route path="/main/alunos" component={Aluno} />
            <Route path="/main/empresas" component={Empresa} />
            <Route path="/main/supervisores" component={Supervisor} />
            <Route path="/main/estagios" component={Estagio} />

            <Route path="/main/cadastroAluno" component={CadastroAluno} />
            <Route path="/main/cadastroEmpresa" component={CadastroEmpresa} />
            <Route path="/main/cadastroSupervisor" component={CadastroSupervisor} />
            <Route path="/main/cadastroEstagio" component={CadastroEstagio} />
            <Route path="/main/gerarPDF" component={gerarPDF} />
            {/* <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/main" component={Main} />

                <Route path="/main/alunos" component={Aluno} />
                <Route path="/main/empresas" component={Empresa} />
                <Route path="/main/supervisores" component={Supervisor} />
                <Route path="/main/estagios" component={Estagio} />

                <Route path="/main/cadastroAluno" component={CadastroAluno} />
                <Route path="/main/cadastroEmpresa" component={CadastroEmpresa} />
                <Route path="/main/cadastroSupervisor" component={CadastroSupervisor} />
                <Route path="/main/cadastroEstagio" component={CadastroEstagio} />
                <PrivateRoute path="/teste" exact={true} component={() => <h1>teste</h1>} />
            </Switch> */}
        </BrowserRouter>
    );
}