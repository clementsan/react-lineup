import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import PromiseExample from './PromiseExample';
import LineUpExample from './LineUpExample';


class App extends Component {

  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">LineUp Test</h1>
        </header>
        <div>
          <PromiseExample />
        </div>
        <div>
          <LineUpExample />
        </div>
      </div>
    );
  }
}


export default App;
