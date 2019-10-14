import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

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
            
        </BrowserRouter>
    );
}