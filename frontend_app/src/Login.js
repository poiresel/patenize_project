import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Check from './Check';
var apiBaseUrl = "http://localhost:4000/api/";
import axios from 'axios';
class Login extends Component {
constructor(props){
  super(props);
  var localloginComponent= [];
  localloginComponent.push(
    <MuiThemeProvider>
      <div>
       <TextField
         hintText="Enter your Patent Id"
         floatingLabelText="Patent Id"
         onChange={(event,newValue) => this.setState({patentId:newValue})}
         />
       <br/>
         <TextField
           hintText="Enter your Patent Description"
           floatingLabelText="Patent Description"
           onChange={(event,newValue) => this.setState({patentDescr:newValue})}
           />
         <br/>
         <RaisedButton label="Apply Patent" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
     </div>
     </MuiThemeProvider>
  )
  this.state={
  patentId:'',
  patentDescr:'',
  loginComponent:localloginComponent,
  }
 }
componentWillMount() {
    var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your Patent Id"
             floatingLabelText="Patent Id"
             onChange={(event,newValue) => this.setState({patentId:newValue})}
             />
           <br/>
             <TextField
               hintText="Enter your Patent Description"
               floatingLabelText="Patent Description"
               onChange={(event,newValue) => this.setState({patentDescr:newValue})}
               />
             <br/>
             <RaisedButton label="Apply Patent" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({loginComponent:localloginComponent})
}
handleClick(event){
    var self = this;
    
    var payload={
      "patentId":this.state.patentId,
      "patentDescr":this.state.patentDescr
    }

    console.log(payload)

    axios.post(apiBaseUrl+'login', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.code == 200){
       console.log("Login successfull");
       var checkScreen=[<h2>Here </h2>];
       checkScreen.push(<Check appContext={self.props.appContext} />)
       self.props.appContext.setState({loginPage:[],checkScreen:checkScreen})
     }
     
   })
   .catch(function (error) {
     console.log(error);
   });
}
render() {
    return (
      <div>

        <h2>Input your patent information into the system</h2>
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your Patent Id"
             floatingLabelText="PatentId"
             onChange={(event,newValue) => this.setState({patentId:newValue})}
             />
           <br/>
             <TextField
               hintText="Enter your Patent Description"
               floatingLabelText="patentDescr"
               onChange={(event,newValue) => this.setState({patentDescr:newValue})}
               />
             <br/>
             <RaisedButton label="Apply Patent" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;