import React, { Component } from 'react';
import {iris_json, iris_json2} from './data/Data_IRIS.js';
import {testCNVTable} from './data/Data_CNV.js';
import 'font-awesome/css/font-awesome.min.css';

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
      	//this.createTaggle(element);
        this.createLineUp(element);
      }
    }
  }
 
 
  createTaggle (element) {
  	return new Promise(function (resolve, reject) {
		  //const JSONdataset = iris_json2;
		  const JSONdataset = testCNVTable;
		  console.log("JSONdataset",JSONdataset);
		  const LineUp = window.LineUpJS;
		  console.log("LineUp",LineUp);
		  const ColumnDescriptions = window.LineUpJS.deriveColumnDescriptions(JSONdataset);
		  const LineUpdata = window.LineUpJS.createLocalStorage(JSONdataset, ColumnDescriptions);
		  LineUpdata.deriveDefault();
		  console.log("LineUpdata",LineUpdata);
		  var instance = window.LineUpJS.createTaggle(LineUpdata, element);
		  console.log("LineUpinstance",instance);
		  instance.update();
		  resolve(instance);
		});
  }

  createLineUp (element) {
    return new Promise(function (resolve, reject) {
      //const JSONdataset = iris_json2;
      const JSONdataset = testCNVTable;
      console.log("JSONdataset",JSONdataset);
      const LineUp = window.LineUpJS;
      console.log("LineUp",LineUp);
      const ColumnDescriptions = window.LineUpJS.deriveColumnDescriptions(JSONdataset);
      const LineUpdata = window.LineUpJS.createLocalStorage(JSONdataset, ColumnDescriptions);
      LineUpdata.deriveDefault();
      console.log("LineUpdata",LineUpdata);
      var instance = window.LineUpJS.create(LineUpdata, element);
      console.log("LineUpinstance",instance);
      instance.update();
      resolve(instance);
    });
  }

    render () {
    return <div ref={this.launchLineUp()}></div>
  }
}


export default LineUpExample;
