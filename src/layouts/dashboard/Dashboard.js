import React, { Component } from "react";
import GrainsContract from "../../../build/contracts/Grains.json";
import store from "../../store";

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
    this.state = {
      type: "",
      balance: 0,
      holding: 0
    };
  }
  componentWillMount() {
    const contract = require("truffle-contract");
    let web3 = store.getState().web3.web3Instance;
    let userName, type, holding, balance;
    // Double-check web3's status.
    if (typeof web3 !== "undefined") {
      const grains = contract(GrainsContract);
      grains.setProvider(web3.currentProvider);
      var grainsInstance;
      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error);
        }
        grains.deployed().then(instance => {
          grainsInstance = instance;
          console.log();
          grainsInstance.getPerson(web3.eth.accounts[0]).then(result => {
            console.log(result);
            userName = web3.toUtf8(result[0]);
            type = web3.toUtf8(result[1]);
            holding = result[2].c[0];
            balance = result[3].c[0];
            this.setState({ type, holding, balance });
          });
        });
      });
    }
  }

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <h2>
              <strong>Welcome {this.props.authData.name}!</strong>
            </h2>
            <ul>
              <li>Account Type : {this.state.type}</li>
              <li>Current Balance : {this.state.balance}</li>
              <li>Grains holding :{this.state.holding}</li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

export default Dashboard;
