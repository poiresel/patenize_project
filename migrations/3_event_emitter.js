var PatentStatus = artifacts.require("PatentStatus");

module.exports = function(deployer) {
    console.log("Deploying to testnet.")
    deployer.deploy(PatentStatus, 1, 1, 1, [0x5bef0eb868123f34b54bc479e93e2d384e638b45]);
};
