import React, { Component } from 'react';
import {iris_json} from './Data_IRIS.js';

// let prom = new Promise(function (resolve, reject) {
//   const dataset = iris_json2;
//   console.log("dataset",dataset);
//   const LineUp = window.LineUpJS;
//   console.log("LineUp",LineUp);
//   const data = window.LineUpJS.createLocalStorage(dataset, window.LineUpJS.deriveColumnDescriptions(dataset));
//   data.deriveDefault();
//   console.log("data",this.data);
//   var instance = window.LineUpJS.createTaggle(data, parent);
//   instance.update();
//   resolve(instance)

// })

class LineUpExample extends Component {
  constructor (props) {
    super(props);

    this.state = {
      val:null
    };

    this.launchLineUp = this.launchLineUp.bind(this);
    this.createLineUp = this.createLineUp.bind(this);
  }

  componentDidMount() {
  	// this.launchLineUp();
  }


  launchLineUp () {
    return (element) => {
      if (element) {
      	this.createLineUp(element);
      }
    }
  }
 
  createLineUp (element) {
  	return new Promise(function (resolve, reject) {
		  const dataset = iris_json;
		  console.log("dataset",dataset);
		  const LineUp = window.LineUpJS;
		  console.log("LineUp",LineUp);
		  const test = window.LineUpJS.deriveColumnDescriptions(dataset).catch(error=>{console.log(error)});
		  const data = window.LineUpJS.createLocalStorage(dataset, test);
		  data.deriveDefault();
		  console.log("data",data);
		  var instance = window.LineUpJS.createTaggle(data, element);
		  console.log("instance",instance);
		  instance.update();
		  resolve(instance);
		});
  }

  // render () {
  // 	return
  //   <div className = "LineUp">
  //     {this.state.val}
  //   </div>
  // }

    render () {
    // if (!this.state.val) return null;
    return <div ref={this.launchLineUp()}></div>
  }
}


export default LineUpExample;
