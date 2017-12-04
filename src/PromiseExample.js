import React, { Component } from 'react';

let prom = new Promise(function (resolve, reject) {
 setTimeout(function () {
   resolve('a value')
 }, 1000)
})

class PromiseExample extends Component {
  constructor (props) {
    super(props);

    this.state = {
      val:null
    };

    this.launchPromise = this.launchPromise.bind(this);
  }

  componentDidMount() {
    this.launchPromise();
  }

  launchPromise() {
    prom.then((value) => {
      this.setState({val: value});
    });
  }

  render () {
    if (!this.state.val) return null;
    return <div>{this.state.val}</div>
  }
}

export default PromiseExample;
