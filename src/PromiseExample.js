import React, { Component } from 'react';

let prom = new Promise(function (resolve, reject) {
 setTimeout(function () {
   resolve('Dataset: CNV Table')
 }, 100)
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
    return <h3>{this.state.val}</h3>
  }
}

export default PromiseExample;
