var PatentToken = artifacts.require("./PatentToken.sol");
var Web3 = require("web3");

contract('PatentToken', function(accounts) {
  it("should put 1000 PatentToken in the first account", function() {
    return PatentToken.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  
});
