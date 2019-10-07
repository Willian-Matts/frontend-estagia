import React, { Component } from 'react';
import Routes from './routes';

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
      <Routes />
    );
  }
}

export default App;
