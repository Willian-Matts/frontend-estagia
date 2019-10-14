import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login.js';
import Main from './pages/Main.js';
import Aluno from './pages/Aluno.js';
import CadastroAluno from './pages/CadastroAluno.js';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/main" component={Main} />
            <Route path="/main/alunos" component={Aluno} />
            <Route path="/main/cadastroAluno" component={CadastroAluno} />
        </BrowserRouter>
    );
}