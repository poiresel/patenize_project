var PatentStatus = artifacts.require("PatentStatus");

module.exports = function(deployer) {
    console.log("Deploying to testnet.")
    deployer.deploy(PatentStatus, 1, 1, 1, ["0x254cd6d58f835d5a9f91fb1b12c386337ebdde0f"]);
};
