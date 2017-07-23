var PatentStatus = artifacts.require("PatentStatus");
var PatentToken = artifacts.require("PatentToken");
var TestRPC = require("ethereumjs-testrpc");
var Web3 = require("web3");
web3 = new Web3();
web3.setProvider(TestRPC.provider());

//"make sure to run testrpc with the varialbes -s 1"
module.exports = function(deployer) {
    console.log("Deploying to testnet.")
    deployer.deploy(PatentStatus, 1, 1, 1, ["0xe87529a6123a74320e13a6dabf3606630683c029"]);
    deployer.deploy(PatentToken, "0xe87529a6123a74320e13a6dabf3606630683c029");
};
