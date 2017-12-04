import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {iris_json} from './Data_IRIS.js';
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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          This is a test
        </p>
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
