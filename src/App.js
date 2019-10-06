import React, { Component } from 'react';
import Login from './pages/Login.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      act: 0,
      index: '',
      datas: []
    }
  }
  render() {
    return (
      <Login />
    );
  }
}

export default App;
