import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login.js';
import Main from './pages/Main.js';
import Aluno from './pages/Aluno.js';
import Cadastro from './pages/Cadastro.js';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/main" component={Main} />
            <Route path="/main/alunos" component={Aluno} />
            <Route path="/main/cadastro" component={Cadastro} />
        </BrowserRouter>
    );
}