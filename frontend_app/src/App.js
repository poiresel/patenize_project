import React, { Component } from 'react'
import PatentToken from '../build/contracts/PatentToken.json'
import PatentStatus from '../build/contracts/PatentStatus.json'
import PatentSubmission from '../build/contracts/PatentSubmission.json'
import injectTapEventPlugin from 'react-tap-event-plugin';
//import Login from './Login';
import Login from './Login';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import getWeb3 from './utils/getWeb3'

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginPage:[],
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    var loginPage = [];
    loginPage.push(<Login appContext={this}/>);

    this.setState({loginPage: loginPage})
    
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const patentSubmission = contract(PatentSubmission)
    const patentStatus = contract(PatentStatus)
    const patentToken = contract(PatentToken)
    patentToken.setProvider(this.state.web3.currentProvider)

    var patentTokenInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      patentToken.deployed().then((instance) => {
        patentTokenInstance = instance
        // Stores a given value, 5 by default.
        return patentTokenInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return patentTokenInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div className="App">
       
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Patenize Works!</a>
        </nav>
        
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <div>
              {this.state.loginPage}
              </div>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}



export default App
