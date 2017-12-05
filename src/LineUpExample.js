import React, { Component } from 'react';
import {iris_json} from './Data_IRIS.js';


class LineUpExample extends Component {
  constructor (props) {
    super(props);


    this.launchLineUp = this.launchLineUp.bind(this);
    this.createLineUp = this.createLineUp.bind(this);
  }

  componentDidMount() {
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


    render () {
    return <div ref={this.launchLineUp()}></div>
  }
}


export default LineUpExample;
