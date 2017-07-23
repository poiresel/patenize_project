import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
var apiBaseUrl = "http://localhost:4000/api/";

import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';



import axios from 'axios';

class Check extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		var currentScreen=[];
		this.setState({currentScreen})
	}

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar title="Welcome Patent A"/>
        </MuiThemeProvider>
        <h2>blahblah blah</h2>
      </div>
    );
  }
}